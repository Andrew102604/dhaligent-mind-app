import express from "express";
import {createClient} from "@libsql/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "node:path";
import {fileURLToPath} from "node:url";

const SECRET=process.env.JWT_SECRET||"dev-secret-change-me";
if(process.env.NODE_ENV==="production"&&!process.env.JWT_SECRET){console.error("Set JWT_SECRET first.");process.exit(1)}
const db=createClient({url:process.env.TURSO_DATABASE_URL||"file:data.db",authToken:process.env.TURSO_AUTH_TOKEN});
await db.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT UNIQUE NOT NULL,name TEXT NOT NULL,hash TEXT NOT NULL,done INTEGER NOT NULL DEFAULT 0,created_at TEXT DEFAULT CURRENT_TIMESTAMP)");

try{await db.execute("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'student'")}catch{}
try{await db.execute("ALTER TABLE users ADD COLUMN stars TEXT NOT NULL DEFAULT ''")}catch{}
// Keep student progress compatible with the client-approved 10-lesson course.
await db.execute("UPDATE users SET done=10 WHERE done>10");
await db.execute(`CREATE TABLE IF NOT EXISTS teacher_quizzes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  question TEXT NOT NULL,
  options TEXT NOT NULL,
  answer INTEGER NOT NULL,
  created_by INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES users(id) ON DELETE CASCADE
)`);
const S10=v=>Array.from({length:10},(_,i)=>Math.max(0,Math.min(5,Math.floor(+(Array.isArray(v)?v[i]:String(v||"").split(",")[i]))||0)));
const AU=(process.env.ADMIN_USERNAME||"").toLowerCase();
if(AU&&process.env.ADMIN_PASSWORD){
  const h=await bcrypt.hash(process.env.ADMIN_PASSWORD,10),e=await db.execute({sql:"SELECT id FROM users WHERE username=?",args:[AU]});
  if(e.rows[0])await db.execute({sql:"UPDATE users SET role='admin',hash=? WHERE id=?",args:[h,e.rows[0].id]});
  else await db.execute({sql:"INSERT INTO users(username,name,hash,role) VALUES(?,?,?,'admin')",args:[AU,process.env.ADMIN_NAME||"Admin",h]});
  await db.execute({sql:"UPDATE users SET role='student' WHERE role='admin' AND username<>?",args:[AU]});
}
const SIGNUP=process.env.ALLOW_SIGNUP!=="false";
const app=express();app.use(express.json());
const tok=id=>jwt.sign({id},SECRET,{expiresIn:"30d"});
const pub=u=>({id:Number(u.id),name:u.name,username:u.username,done:Math.max(0,Math.min(10,Number(u.done)||0)),role:u.role,stars:S10(u.stars)});
const tries=new Map();
const limit=(req,res,next)=>{const k=req.ip,n=(tries.get(k)||0)+1;tries.set(k,n);setTimeout(()=>tries.delete(k),15*60*1000).unref();
  n>30?res.status(429).json({error:"Too many attempts. Please wait a few minutes."}):next()};
const auth=async(req,res,next)=>{try{
  const{id}=jwt.verify((req.headers.authorization||"").replace("Bearer ",""),SECRET);
  const r=await db.execute({sql:"SELECT * FROM users WHERE id=?",args:[id]});
  if(!r.rows[0])throw 0;req.user=r.rows[0];next()}catch{res.status(401).json({error:"Please log in again."})}};

app.post("/api/register",limit,async(req,res)=>{
  if(!SIGNUP)return res.status(403).json({error:"Sign-ups are closed. Please ask your teacher for an account."});
  const{name,username,password}=req.body||{};
  if(!name?.trim()||!/^[a-z0-9_.]{3,20}$/i.test(username||"")||(password||"").length<6)
    return res.status(400).json({error:"Enter your name, a username (3-20 letters or numbers) and a password of at least 6 characters."});
  try{const u=username.toLowerCase(),r=await db.execute({sql:"INSERT INTO users(username,name,hash) VALUES(?,?,?)",args:[u,name.trim(),await bcrypt.hash(password,10)]});
    res.json({token:tok(Number(r.lastInsertRowid)),user:{id:Number(r.lastInsertRowid),name:name.trim(),username:u,done:0,role:"student",stars:S10()}})}
  catch{res.status(409).json({error:"That username is already taken."})}});
app.post("/api/login",limit,async(req,res)=>{
  const{username,password}=req.body||{};
  const r=await db.execute({sql:"SELECT * FROM users WHERE username=?",args:[String(username||"").toLowerCase()]}),u=r.rows[0];
  if(!u||!(await bcrypt.compare(String(password||""),u.hash)))return res.status(401).json({error:"Wrong username or password."});
  res.json({token:tok(Number(u.id)),user:pub(u)})});
app.get("/api/me",auth,(req,res)=>res.json({user:pub(req.user)}));
app.put("/api/progress",auth,async(req,res)=>{
  const d=Math.max(0,Math.min(10,Math.floor(+req.body?.done)||0));
  const st=S10(req.user.stars),ns=S10(req.body?.stars).map((x,i)=>Math.max(x,st[i]));
  await db.execute({sql:"UPDATE users SET done=MAX(done,?),stars=? WHERE id=?",args:[d,ns.join(","),req.user.id]});
  res.json({done:Math.max(d,Number(req.user.done)),stars:ns})});

app.get("/api/config",(_,res)=>res.json({signup:SIGNUP}));
const adminOnly=(req,res,next)=>req.user.role==="admin"?next():res.status(403).json({error:"Admins only."});
const A=[auth,adminOnly];
const row=u=>({id:Number(u.id),username:u.username,name:u.name,role:u.role,done:Number(u.done),stars:S10(u.stars),created_at:u.created_at});
app.get("/api/admin/users",A,async(_,res)=>{
  const r=await db.execute("SELECT * FROM users ORDER BY role='admin' DESC,name COLLATE NOCASE");res.json({users:r.rows.map(row)})});
app.post("/api/admin/users",A,async(req,res)=>{
  const{name,username,password}=req.body||{};
  if(!name?.trim()||!/^[a-z0-9_.]{3,20}$/i.test(username||"")||(password||"").length<6)
    return res.status(400).json({error:"Enter a name, a username (3-20 letters or numbers) and a password of at least 6 characters."});
  try{await db.execute({sql:"INSERT INTO users(username,name,hash,role) VALUES(?,?,?,?)",args:[username.toLowerCase(),name.trim(),await bcrypt.hash(password,10),"student"]});res.json({ok:true})}
  catch{res.status(409).json({error:"That username is already taken."})}});
app.put("/api/admin/users/:id",A,async(req,res)=>{
  const id=+req.params.id,b=req.body||{},run=(sql,args)=>db.execute({sql,args});
  const t=(await run("SELECT id FROM users WHERE id=?",[id])).rows[0];if(!t)return res.status(404).json({error:"User not found."});
  if(b.password!==undefined){if(String(b.password).length<6)return res.status(400).json({error:"Password must be at least 6 characters."});await run("UPDATE users SET hash=? WHERE id=?",[await bcrypt.hash(String(b.password),10),id])}
  if(b.name!==undefined&&String(b.name).trim())await run("UPDATE users SET name=? WHERE id=?",[String(b.name).trim(),id]);
  if(b.done!==undefined){const nd=Math.max(0,Math.min(10,Math.floor(+b.done)||0));await run("UPDATE users SET done=? WHERE id=?",[nd,id]);if(nd===0)await run("UPDATE users SET stars='' WHERE id=?",[id])}
  res.json({ok:true})});
// Teacher dashboard: assign personalized quiz questions to individual students.
app.get("/api/teacher/quizzes",A,async(_,res)=>{
  const r=await db.execute(`SELECT q.*,u.name AS student_name,u.username AS student_username
    FROM teacher_quizzes q JOIN users u ON u.id=q.student_id ORDER BY q.created_at DESC,q.id DESC`);
  res.json({quizzes:r.rows.map(q=>({...q,id:Number(q.id),student_id:Number(q.student_id),answer:Number(q.answer),options:JSON.parse(q.options||"[]")}))});
});
app.post("/api/teacher/quizzes",A,async(req,res)=>{
  const b=req.body||{},studentId=Number(b.student_id),title=String(b.title||"").trim(),question=String(b.question||"").trim(),options=Array.isArray(b.options)?b.options.map(x=>String(x||"").trim()):[],answer=Number(b.answer);
  if(!studentId||!title||!question||options.length<2||options.some(x=>!x)||!Number.isInteger(answer)||answer<0||answer>=options.length)
    return res.status(400).json({error:"Provide a student, quiz title, question, answer choices, and the correct answer."});
  const student=(await db.execute({sql:"SELECT id FROM users WHERE id=? AND role='student'",args:[studentId]})).rows[0];
  if(!student)return res.status(404).json({error:"Student not found."});
  const r=await db.execute({sql:"INSERT INTO teacher_quizzes(student_id,title,question,options,answer,created_by) VALUES(?,?,?,?,?,?)",args:[studentId,title,question,JSON.stringify(options),answer,req.user.id]});
  res.json({ok:true,id:Number(r.lastInsertRowid)});
});
app.get("/api/student/quizzes",auth,async(req,res)=>{
  const r=await db.execute({sql:"SELECT id,title,question,options,created_at FROM teacher_quizzes WHERE student_id=? ORDER BY created_at DESC,id DESC",args:[req.user.id]});
  res.json({quizzes:r.rows.map(q=>({...q,id:Number(q.id),options:JSON.parse(q.options||"[]")}))});
});
app.post("/api/student/quizzes/:id/answer",auth,async(req,res)=>{
  const id=Number(req.params.id),choice=Number(req.body?.choice);
  const q=(await db.execute({sql:"SELECT id,answer FROM teacher_quizzes WHERE id=? AND student_id=?",args:[id,req.user.id]})).rows[0];
  if(!q)return res.status(404).json({error:"Personalized quiz not found."});
  res.json({correct:choice===Number(q.answer)});
});

app.delete("/api/admin/users/:id",A,async(req,res)=>{
  const id=+req.params.id;if(id===Number(req.user.id))return res.status(400).json({error:"You cannot delete your own account."});
  await db.execute({sql:"DELETE FROM users WHERE id=?",args:[id]});res.json({ok:true})});

const dist=path.join(path.dirname(fileURLToPath(import.meta.url)),"../dist");
app.use(express.static(dist));
app.use((_,res)=>res.sendFile(path.join(dist,"index.html")));
app.listen(process.env.PORT||3000,()=>console.log("DhaLiGent Mind running on port "+(process.env.PORT||3000)));

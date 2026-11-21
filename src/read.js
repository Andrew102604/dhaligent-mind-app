// Word matching for the "read aloud" feature (no browser APIs here, so it is easy to test).
// The browser's speech engine cannot understand Bisaya, so for Bisaya/Filipino text we are forgiving:
// words that sound alike match (o/u, e/i ...), small recognition errors are not counted as mistakes,
// and only words that are clearly skipped turn red.
export const norm=w=>String(w).toLowerCase().replace(/[^a-z0-9ñ']/g,"");
// "sounds like" form: Bisaya/Filipino spelling swaps o/u, e/i, etc.
export const phon=w=>norm(w).replace(/ñ/g,"ny").replace(/'/g,"").replace(/ph/g,"p").replace(/ng/g,"N")
  .replace(/[ou]/g,"u").replace(/[ei]/g,"i").replace(/c/g,"k").replace(/q/g,"k").replace(/v/g,"b").replace(/f/g,"p").replace(/z/g,"s")
  .replace(/j/g,"d").replace(/w/g,"u").replace(/y/g,"i").replace(/h/g,"").replace(/(.)\1+/g,"$1");
const lev=(a,b)=>{const m=a.length,n=b.length,d=Array.from({length:m+1},(_,i)=>[i,...Array(n).fill(0)]);
  for(let j=1;j<=n;j++)d[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return d[m][n]};
// strict = English; loose = Bisaya/Filipino (compares how the words sound)
export const sim=(a,b,loose)=>{const x=norm(a),y=norm(b);if(!x||!y)return false;if(x===y)return true;
  if(!loose){const m=Math.max(x.length,y.length),d=lev(x,y);return(m>=4&&d<=1)||(m>=7&&d<=2)}
  const p=phon(x),q=phon(y);if(p===q)return true;
  const m=Math.max(p.length,q.length),d=lev(p,q);return m>=3&&d<=Math.max(1,Math.floor(m*0.34))};
// st: 0 waiting, 1 correct, 2 missed (red), 3 repeated (yellow)
export function processWords(exp,st,idx,said,loose=false){
  st=[...st];
  for(const raw of said){
    const w=norm(raw);if(!w)continue;if(idx>=exp.length)break;
    if(sim(w,exp[idx],loose)){st[idx]=1;idx++}
    else if(idx>0&&st[idx-1]===1&&(loose?norm(exp[idx-1])===w:sim(w,exp[idx-1]))){st[idx-1]=3}
    else{
      let j=-1;for(let k=idx+1;k<=idx+2&&k<exp.length;k++)if(sim(w,exp[k],loose)){j=k;break}
      if(j>=0){
        // the engine often drops short words (sa, ug, ang, nga ...), so those are forgiven in loose mode
        for(let k=idx;k<j;k++)st[k]=(loose&&norm(exp[k]).length<=3)?1:2;
        st[j]=1;idx=j+1}
      else if(loose){st[idx]=1;idx++}   // heard something at this spot but the engine can't tell the word: give the benefit of the doubt
      else{st[idx]=2;idx++}
    }
  }
  return{st,idx};
}
// try every alternative the browser heard and keep the best reading
export function best(exp,st,idx,alts,loose=false){
  let b=null;
  for(const a of alts){const o=processWords(exp,st,idx,a,loose),ok=o.st.filter(x=>x===1).length,bad=o.st.filter(x=>x===2||x===3).length,sc=o.idx*10+ok-bad*2;
    if(!b||sc>b.sc)b={...o,sc}}
  return b||{st,idx};
}
export const mistakes=st=>st.filter(x=>x===2||x===3).length;
export const SR=()=>typeof window!=="undefined"?(window.SpeechRecognition||window.webkitSpeechRecognition||null):null;

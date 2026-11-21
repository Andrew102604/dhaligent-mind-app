import React, { useEffect, useMemo, useRef, useState } from 'react';
import Discussion from './Discussion.jsx';
import LessonGame from './LessonGame.jsx';
import LessonSim from './LessonSim.jsx';
import {PHASES, HEART_COUNT, RETRY_WAIT_SECONDS, MISTAKE_DEDUCTION} from './mechanics.js';
const normalize = (s) => String(s || '').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
function speechReview(targetText, spokenText) {
  const target=normalize(targetText).split(' ').filter(Boolean), spoken=normalize(spokenText).split(' ').filter(Boolean);
  const dp=Array.from({length:target.length+1},()=>Array(spoken.length+1).fill(0));
  for(let i=0;i<=target.length;i++)dp[i][0]=i; for(let j=0;j<=spoken.length;j++)dp[0][j]=j;
  for(let i=1;i<=target.length;i++)for(let j=1;j<=spoken.length;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(target[i-1]===spoken[j-1]?0:1));
  const status=Array(target.length).fill('missed'), extra=[]; let i=target.length,j=spoken.length,errors=0;
  while(i||j){if(i&&j&&target[i-1]===spoken[j-1]&&dp[i][j]===dp[i-1][j-1]){status[i-1]='heard';i--;j--;continue;}
    if(j&&dp[i][j]===dp[i][j-1]+1){extra.unshift(spoken[j-1]);errors++;j--;continue;}
    if(i&&j&&dp[i][j]===dp[i-1][j-1]+1){status[i-1]='missed';errors++;i--;j--;continue;}
    if(i){status[i-1]='missed';errors++;i--;continue;} if(j){extra.unshift(spoken[j-1]);errors++;j--;}}
  const seen={}; const repeated=new Set(); spoken.forEach(w=>{seen[w]=(seen[w]||0)+1;if(seen[w]>1)repeated.add(w)});
  const words=target.map((w,k)=>({word:w,status:repeated.has(w)&&status[k]==='heard'?'repeated':status[k]}));
  return {words,extra,errors};
}

export default function ClientLesson({ lesson, lessonNumber, phase, onDone }) {
  const [step,setStep] = useState(0);
  const [mistakes,setMistakes] = useState(0);
  const [hearts,setHearts] = useState(HEART_COUNT);
  const [wait,setWait] = useState(0);
  const [transcript,setTranscript] = useState('');
  const [readErrors,setReadErrors] = useState(0);
  const [listening,setListening] = useState(false);
  const [quizAnswers,setQuizAnswers] = useState({});
  const [quizIndex,setQuizIndex] = useState(0);
  const [checked,setChecked] = useState(false);
  const recognition = useRef(null);
  const quiz = lesson.quiz || [];
  const phaseData = [lesson.game, lesson.story?.length ? lesson.story : lesson.storyEnglish, lesson.discussion, lesson.simulation, lesson.quiz][phase] || [];
  const phaseMeta = [
    ['🎮', 'Game', 'Worth 10 points'],
    ['📖', 'Story', 'Worth 10 points'],
    ['💬', 'Discussion', 'Worth 5 points'],
    ['🧪', 'Simulation', 'Worth 10 points'],
    ['📝', 'Quiz', 'Worth 15 points']
  ][phase] || ['📚', 'Activity', ''];
  const storyLines = useMemo(() => lesson.story.filter(Boolean),[lesson]);
  const titleLine = lesson.storyTitle || lesson.title;
  const exampleText = (lesson.example || []).slice(1).join(' ');
  const currentText = phase===2 ? (lesson.discussion?.[step] || '') : phase===1 ? (lesson.storyEnglish?.[step] || storyLines[step] || '') : '';  
  const review = transcript && !transcript.startsWith('Speech recognition') && !transcript.startsWith('Microphone') && !transcript.startsWith('Could not') ? speechReview(currentText, transcript) : null;
  useEffect(()=>{setStep(0);setMistakes(0);setHearts(HEART_COUNT);setWait(0);setTranscript('');setReadErrors(0);setListening(false);setQuizAnswers({});setQuizIndex(0);setChecked(false);return()=>{try{recognition.current?.stop()}catch{}}},[lessonNumber,phase]);
  useEffect(()=>{if(!wait)return;const id=setTimeout(()=>setWait(s=>{if(s<=1){setHearts(HEART_COUNT);setStep(0);return 0}return s-1}),1000);return()=>clearTimeout(id)},[wait]);
  const wrongMove = () => { if(wait>0)return; setMistakes(v=>v+1); setHearts(h=>{const n=h-1;if(n<=0){setWait(RETRY_WAIT_SECONDS);setStep(0);return 0}return n}); };
  const finish = (raw=0, miss=mistakes) => onDone(miss,raw);
  const startMic = (targetText=currentText) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){setTranscript('Speech recognition is not supported in this browser. Use a browser with microphone speech recognition enabled to complete the read-aloud task.');return;}
    try {
      const r = new SR(); recognition.current=r; r.lang='en-US'; r.interimResults=false; r.continuous=false;
      setTranscript('');setListening(true);
      r.onresult=e=>{const text=e.results?.[0]?.[0]?.transcript||'';setTranscript(text);const result=speechReview(targetText,text);setReadErrors(result.errors);setMistakes(v=>v+result.errors);setListening(false);};
      r.onerror=()=>{setListening(false);setTranscript('Microphone recognition failed. Check permission, then try again or continue after reading aloud.');};r.onend=()=>setListening(false);r.start();
    } catch {setListening(false);setTranscript('Could not start the microphone. Check browser microphone permission and try again.');}
  };
  const nextReading = () => { const count=phase===2?(lesson.discussion||[]).length:storyLines.length; if(step<count-1){setStep(s=>s+1);setTranscript('');setReadErrors(0)}else finish(5); };
  const quizDone = quiz.length > 0 && quiz.every((_,i)=>quizAnswers[i] !== undefined);
  const quizScore = quiz.length ? quiz.reduce((n,q,i)=>n+(quizAnswers[i]===q.answer?1:0),0)/quiz.length*15 : 0;
  const currentQuiz = quiz[quizIndex];
  const correctCount = quiz.reduce((n,q,i)=>n+(quizAnswers[i]===q.answer?1:0),0);
  const sectionHeading = (emoji,heading,desc) => <div className="client-lesson-head"><span className="client-lesson-icon">{emoji}</span><div><p className="client-kicker">LESSON {lessonNumber} · {PHASES[phase].toUpperCase()}</p><h2>{heading}</h2>{desc&&<p className="client-muted">{desc}</p>}</div></div>;
  const taskList = phase===0 ? lesson.game : lesson.simulation;
  if (phase===3) return <LessonSim lessonNumber={lessonNumber} title={lesson.title} onDone={(miss)=>finish(0,miss)}/>;
  if (phase===0) return <LessonGame lessonNumber={lessonNumber} onDone={(miss)=>finish(0,miss)}/>;
  if (phase===2) return <Discussion lessonNumber={lessonNumber} title={lesson.title} onDone={finish}/>;
  if (!phaseData.length) return <section className="client-lesson">
    <div className="client-lesson-head"><span className="client-lesson-icon">{phaseMeta[0]}</span><div><p className="client-kicker">LESSON {lessonNumber} · {phaseMeta[1].toUpperCase()}</p><h2>{phaseMeta[1]}</h2><p className="client-muted">{phaseMeta[2]}</p></div></div>
    <div className="client-sim-stage"><div className="client-sim-plant" aria-hidden="true">🌱</div>
      {phase===0&&<><div className="client-heart-row" aria-label={`${HEART_COUNT} game hearts`}>{Array.from({length:HEART_COUNT},(_,i)=><span key={i} className="heart-on">♥</span>)}</div><p className="client-muted">Game rule: 5 hearts. A wrong move removes one heart. If all hearts or the allowed time/chances run out, the retry wait is 1 minute.</p></>}
      <h3>Content coming soon</h3><p>The learning materials for this activity have not been provided yet. This section is intentionally empty and will be populated when the approved lesson content is available.</p><p className="client-muted">No points will be awarded and this activity cannot be marked complete until its content is added.</p></div>
  </section>;

  return <section className="client-lesson">
    {phase===1 && (lesson.story?.length > 0) && <>
      {sectionHeading('📖',titleLine,'Read the story aloud one line at a time. Words not recognized are counted as reading mistakes (0.5 point each).')}
      <div className="client-story-progress">Story line {Math.min(step+1,storyLines.length)} of {storyLines.length}<div className="client-progress"><i style={{width:`${Math.min(100,(step+1)/storyLines.length*100)}%`}}/></div></div>
      {step<storyLines.length&&<div className="client-story-card"><p className="client-story-text">{storyLines[step]}</p>{lesson.storyEnglish?.[step]&&<p className="client-story-english">English reading: {currentText}</p>}<div className="client-word-feedback" aria-label="Word reading feedback">{normalize(currentText).split(' ').map((word,i)=>{const status=review?.words[i]?.status||'';return <span key={i} className={status==='heard'?'word-heard':status==='repeated'?'word-repeated':status==='missed'?'word-missed':''}>{word} </span>})}{review?.extra.map((word,i)=><span key={'extra'+i} className="word-repeated">{word} </span>)}</div>
        <div className="client-row"><button type="button" className="pri" onClick={startMic} disabled={listening}>{listening?'🎙 Listening…':'🎙 Read aloud'}</button>{transcript&&!transcript.startsWith('Speech recognition')&&!transcript.startsWith('Microphone')&&!transcript.startsWith('Could not')&&<button type="button" className="sec" onClick={nextReading}>{step===storyLines.length-1?'Finish Story':'Next line →'}</button>}</div>
        {transcript&&<p className="client-muted" role="status">Recognized: {transcript}{review&&<span> · {readErrors} reading mistake{readErrors===1?'':'s'} (−{(readErrors*MISTAKE_DEDUCTION).toFixed(1)} points)</span>}</p>}{(transcript.startsWith('Speech recognition')||transcript.startsWith('Microphone')||transcript.startsWith('Could not'))&&<button type="button" className="sec" onClick={startMic}>Try microphone again</button>}
      </div>}
    </>}
    {phase===3 && (lesson.simulation?.length > 0) && <>
      {sectionHeading('🧪',lesson.simulation[0]?.replace(/^Mission:\s*/i,'')||'Simulation','Follow the client-provided simulation steps in order.')}
      <div className="client-sim-stage"><div className="client-sim-plant" aria-hidden="true">🌱</div><div className="client-sim-count">STEP {Math.min(step+1,taskList.length-1)} / {Math.max(1,taskList.length-1)}</div><h3>{taskList[Math.min(step+1,taskList.length-1)]}</h3><p>Try the action, then mark it complete to continue the simulation.</p>
      {step<taskList.length-1?<button className="pri" onClick={()=>setStep(s=>s+1)}>I completed this step →</button>:<button className="pri" onClick={()=>finish(10)}>Finish Simulation ✓</button>}</div>
    </>}
    {phase===2 && (lesson.discussion?.length > 0) && <>
      {sectionHeading('💡','Discussion','Read each discussion slide aloud in English. Missed words are marked red, repeated words yellow, and each reading mistake deducts 0.5 points.')}
      <div className="client-story-progress">Discussion slide {Math.min(step+1,lesson.discussion.length)} of {lesson.discussion.length}<div className="client-progress"><i style={{width:`${Math.min(100,(step+1)/lesson.discussion.length*100)}%`}}/></div></div>
      <div className="client-reading-card client-discussion-slide"><span className="client-kicker">KEY IDEA {step+1}</span><p className="client-discussion-text">{currentText}</p><div className="client-word-feedback" aria-label="Word reading feedback">{normalize(currentText).split(' ').map((word,i)=>{const status=review?.words[i]?.status||'';return <span key={i} className={status==='heard'?'word-heard':status==='repeated'?'word-repeated':status==='missed'?'word-missed':''}>{word} </span>})}{review?.extra.map((word,i)=><span key={'extra'+i} className="word-repeated">{word} </span>)}</div>
      <div className="client-row"><button type="button" className="pri" onClick={()=>startMic(currentText)} disabled={listening}>{listening?'🎙 Listening…':'🎙 Read this slide aloud'}</button>{transcript&&!transcript.startsWith('Speech recognition')&&!transcript.startsWith('Microphone')&&!transcript.startsWith('Could not')&&<button type="button" className="sec" onClick={nextReading}>{step===lesson.discussion.length-1?'Finish Discussion':'Next slide →'}</button>}</div>
      {transcript&&<p className="client-muted" role="status">Recognized: {transcript}{review&&<span> · {readErrors} reading mistake{readErrors===1?'':'s'} (−{(readErrors*MISTAKE_DEDUCTION).toFixed(1)} points)</span>}</p>}{(transcript.startsWith('Speech recognition')||transcript.startsWith('Microphone')||transcript.startsWith('Could not'))&&<button type="button" className="sec" onClick={()=>startMic(currentText)}>Try microphone again</button>}</div>
    </>}
    {phase===4 && (lesson.quiz?.length > 0) && <>
      {sectionHeading('📝','Knowledge Check','Choose the best answer for each question. You can move between questions before submitting.')}
      <div className="quiz-shell">
        <div className="quiz-progress-head">
          <span className="client-quiz-meta">{checked ? 'Quiz results' : `Question ${quizIndex+1} of ${quiz.length}`}</span>
          <strong>{Object.keys(quizAnswers).length} / {quiz.length} answered</strong>
        </div>
        <div className="client-progress quiz-progress"><i style={{width:`${(Object.keys(quizAnswers).length/quiz.length)*100}%`}}/></div>
        {!checked ? <>
          <article className="quiz-question-card">
            <div className="quiz-question-number">QUESTION {quizIndex+1}</div>
            <h3>{currentQuiz.q}</h3>
            <div className="quiz-options">
              {currentQuiz.choices.map((choice,j)=><label key={j} className={`quiz-option ${quizAnswers[quizIndex]===j?'selected':''}`}>
                <input type="radio" name={`quiz-${lessonNumber}-${quizIndex}`} value={j}
                  checked={quizAnswers[quizIndex]===j}
                  onChange={()=>setQuizAnswers(a=>({...a,[quizIndex]:j}))}/>
                <span className="quiz-option-letter">{String.fromCharCode(65+j)}</span>
                <span className="quiz-option-text">{choice}</span>
              </label>)}
            </div>
          </article>
          <div className="quiz-navigation">
            <button type="button" className="sec" onClick={()=>setQuizIndex(i=>Math.max(0,i-1))} disabled={quizIndex===0}>← Previous</button>
            {quizIndex<quiz.length-1
              ? <button type="button" className="pri" onClick={()=>setQuizIndex(i=>Math.min(quiz.length-1,i+1))} disabled={quizAnswers[quizIndex]===undefined}>Next question →</button>
              : <button type="button" className="pri" onClick={()=>setChecked(true)} disabled={!quizDone}>Submit quiz</button>}
          </div>
          {!quizDone&&<p className="quiz-helper">Select an answer to continue. Your answers are kept if you go back to a previous question.</p>}
        </> : <>
          <div className="client-quiz-result quiz-final-result">
            <p className="client-kicker">QUIZ COMPLETED</p>
            <h2>{correctCount} / {quiz.length} correct</h2>
            <p className="quiz-score-line">{quizScore.toFixed(1)} / 15 points</p>
            <p>Review the correct answers below before submitting your lesson score.</p>
          </div>
          <div className="quiz-review-list">
            {quiz.map((q,i)=><article className="quiz-review-card" key={i}>
              <p className="quiz-review-label">QUESTION {i+1}</p>
              <h3>{q.q}</h3>
              <p className={quizAnswers[i]===q.answer?'quiz-review-correct':'quiz-review-wrong'}>
                {quizAnswers[i]===q.answer?'✓ Your answer is correct':'✕ Your answer: '+q.choices[quizAnswers[i]]}
              </p>
              {quizAnswers[i]!==q.answer&&<p className="quiz-correct-answer">Correct answer: <strong>{String.fromCharCode(65+q.answer)}. {q.choices[q.answer]}</strong></p>}
            </article>)}
          </div>
          <button className="pri quiz-submit-score" onClick={()=>finish(quizScore,0)}>Submit lesson score →</button>
        </>}
      </div>
    </>}
  </section>;
}

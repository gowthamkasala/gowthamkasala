'use client';
import { useState } from 'react';
import s from './SystemMap.module.css';
const stages=['User','Workflow','Product','Software','Infra','AI'];
const cues=['Start with the person.','Follow the work.','Give the problem a shape.','Make it work.','Make it run.','Explore what comes next.'];
export default function HeroTrace(){
  const [active,setActive]=useState(2);
  return <div className={s.trace} role="group" aria-label="Follow a problem through connected layers">
    <span className={s.traceAxis} aria-hidden="true"/>
    <ol>{stages.map((stage,i)=><li key={stage} data-reached={i<=active}><button type="button" onPointerEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)} aria-pressed={i===active}><span className={s.traceDot} aria-hidden="true"/><span className={s.meta}>{String(i+1).padStart(2,'0')}</span><strong>{stage}</strong><span className={s.traceCue}>{cues[i]}</span></button></li>)}</ol>
    <div className={s.traceCaption}>One problem.<br/>Whatever layer it takes.</div>
  </div>;
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { career } from '@/data/research';
import s from './SystemMap.module.css';
export default function CareerLayers(){
  const root=useRef<HTMLDivElement>(null);const [active,setActive]=useState(0);
  useEffect(()=>{if(!root.current||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(v=>Math.max(v,Number((entry.target as HTMLElement).dataset.layer)));},{rootMargin:'-15% 0px -35% 0px'});root.current.querySelectorAll('[data-layer]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
  return <div ref={root} className={s.careerGrid}><div className={s.register} role="group" aria-label="Accumulated capabilities">{career.map((stage,i)=><div key={stage} className={s.registerLayer} data-active={i<=active}><span>{stage}</span><span aria-hidden="true">{i<=active?'●':'○'}</span></div>)}<small>Earlier capabilities stay in the system.</small></div><ol className={s.careerStages}>{career.map((stage,i)=><li key={stage} data-layer={i}><button type="button" onClick={()=>setActive(v=>Math.max(v,i))} onFocus={()=>setActive(v=>Math.max(v,i))} aria-label={`Explore ${stage} and earlier capabilities`}><span className={s.meta}>LAYER {String(i+1).padStart(2,'0')}</span><h3>{stage}</h3><span className={s.strands} aria-hidden="true">{career.slice(0,i+1).map(name=><i key={name}/>)}</span><small>Still carries: {i===0?'the customer’s reality':career.slice(0,i).join(' · ')}</small></button></li>)}</ol></div>;
}

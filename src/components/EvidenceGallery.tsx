/* Actual artifacts only. No evidence entry means no visible placeholder. */
/* eslint-disable @next/next/no-img-element -- Optional user artifacts retain native image dimensions and captions. */
import {projectEvidence,safeEvidenceUrl} from '@/data/evidence';
import s from './SystemMap.module.css';
export default function EvidenceGallery({slug}:{slug:string}){
  const entries=(projectEvidence[slug]??[]).filter(e=>e.kind==='comparison'?safeEvidenceUrl(e.before.src)&&safeEvidenceUrl(e.after.src):safeEvidenceUrl(e.kind==='document'?e.href:e.src));
  if(!entries.length)return null;
  return <section className={s.evidence} aria-label="Project evidence"><h2>From the work</h2><div className={s.evidenceGrid}>{entries.map((e,i)=><figure key={i}>{e.kind==='document'?<a href={e.href}>{e.title} ↗</a>:e.kind==='comparison'?<><img loading="lazy" src={e.before.src} alt={e.before.alt}/><img loading="lazy" src={e.after.src} alt={e.after.alt}/></>:<img loading="lazy" src={e.src} alt={e.alt}/>}<figcaption>{e.caption}{'sanitized' in e&&e.sanitized?' · Sanitized artifact':''}</figcaption></figure>)}</div></section>;
}

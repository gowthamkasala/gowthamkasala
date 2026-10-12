import { site } from '@/data/site';
import HeroTrace from './HeroTrace';
import s from './SystemMap.module.css';
export default function Hero() {
  return <section className={`${s.hero} shell`} id="intro" aria-labelledby="intro-title">
    <div className={s.heroCopy}>
      <span className={s.meta}>GOWTHAM / PERSONAL SYSTEM MAP</span>
      <h1 id="intro-title">Follow the<br/>problem <em>deeper.</em></h1>
      <div className={s.identity}>Product Builder & AI Product Engineer</div>
      <p>I turn ambiguous problems into products, systems, and working software.</p>
      <div className={s.actions}><a className={s.primary} href="/#work">View selected work <span aria-hidden="true">↓</span></a>{site.resume && <a className={s.secondary} href={site.resume}>Résumé ↗</a>}</div>
      <div className={s.current}><span className={s.meta}>CURRENTLY</span><span>Member of Technical Staff @ Ve<br/><strong>Building Ve Browser</strong></span></div>
    </div><HeroTrace/>
  </section>;
}

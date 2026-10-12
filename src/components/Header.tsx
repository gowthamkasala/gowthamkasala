import Link from 'next/link';
import {site} from '@/data/site';
import s from './SystemMap.module.css';
export default function Header(){return <header className={s.header}><div className={`${s.headerInner} shell`}><Link href="/" className={s.brand} aria-label="Gowtham home">GOWTHAM<span aria-hidden="true"> +</span></Link><nav aria-label="Main navigation"><a href="/#work">Work</a><a href="/#lab">Lab</a><a href="/#about">About</a>{site.resume&&<a href={site.resume}>Résumé ↗</a>}<a href={site.email?`mailto:${site.email}`:'/#contact'} aria-label={site.email?'Let’s talk — email Gowtham':'Let’s talk — contact links'}>Let’s talk ↗</a></nav></div></header>;}

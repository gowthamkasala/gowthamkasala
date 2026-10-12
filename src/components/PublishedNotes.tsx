import {publishedNotes} from '@/data/notes';
import s from './SystemMap.module.css';
export default function PublishedNotes(){if(!publishedNotes.length)return null;return <section id="notes" className={`${s.work} shell`}><h2>Field notes</h2>{publishedNotes.map(note=><article key={note.href}><h3><a href={note.href}>{note.title}</a></h3><p>{note.summary}</p></article>)}</section>;}

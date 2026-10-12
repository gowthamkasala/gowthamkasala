import Link from 'next/link';
import {notFound} from 'next/navigation';
import {projects} from '@/data/projects';
import {pageMetadata} from '@/lib/metadata';
import {SalesCRM,AlbumOperations,AssetManagement,WorkflowProduct} from '@/components/cases/CaseDossier';
import EvidenceGallery from '@/components/EvidenceGallery';
import s from '@/components/SystemMap.module.css';
const dossiers={'sales-crm':SalesCRM,'wedding-album-operations':AlbumOperations,'asset-management':AssetManagement,'workflow-proposal-product':WorkflowProduct};
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects.find(p=>p.slug===slug);return project?pageMetadata(`${project.title} — Gowtham`,project.summary,`/work/${slug}`):{};}
export default async function WorkPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects.find(p=>p.slug===slug);if(!project)notFound();const Dossier=dossiers[slug as keyof typeof dossiers];if(!Dossier)notFound();const next=projects[(projects.indexOf(project)+1)%projects.length];return <article className={`${s.dossier} shell`}><a href="/#work" className="back-link mono">← All selected work</a><Dossier project={project}/><EvidenceGallery slug={slug}/><Link href={`/work/${next.slug}`} className="next-case"><span className="mono">NEXT CASE / {next.id}</span><strong>{next.title}</strong><span aria-hidden="true">↗</span></Link></article>;}

import Hero from '@/components/Hero';
import {SystemSection,WorkSection,TrajectorySection,LabSection,AboutSection,ContactSection} from '@/components/HomeSections';
import PublishedNotes from '@/components/PublishedNotes';
import { pageMetadata } from '@/lib/metadata';
export const metadata=pageMetadata();
export default function Home(){return <><Hero/><SystemSection/><WorkSection/><TrajectorySection/><LabSection/><PublishedNotes/><AboutSection/><ContactSection/></>;}

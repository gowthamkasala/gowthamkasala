import Hero from "@/components/Hero";
import {
  SystemSection,
  WorkSection,
  MethodSection,
  TrajectorySection,
  LabSection,
  NotesSection,
  PrinciplesSection,
  AboutSection,
  ContactSection,
} from "@/components/HomeSections";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata();
export default function Home() {
  return (
    <>
      <Hero />
      <SystemSection />
      <WorkSection />
      <MethodSection />
      <TrajectorySection />
      <LabSection />
      <NotesSection />
      <PrinciplesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

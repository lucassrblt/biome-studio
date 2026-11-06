import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Audience } from "@/components/audience";
import { Offers } from "@/components/offers";
import { Projects } from "@/components/projects";
import { Process } from "@/components/process";
import { Guarantees } from "@/components/guarantees";
import { About } from "@/components/about";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { homeFaq } from "@/lib/content";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Audience />
        <Offers />
        <Projects />
        <Process />
        <Guarantees />
        <About />
        <Pricing />
        <Faq items={homeFaq} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

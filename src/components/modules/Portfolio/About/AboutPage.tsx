import { highlightPoints, journeySteps, services, stats } from "./aboutData";
import { AboutHeroSection } from "./components/AboutHeroSection";
import { AboutJourneyCard } from "./components/AboutJourneyCard";
import { AboutServicesCard } from "./components/AboutServicesCard";
import { AboutSkillsCard } from "./components/AboutSkillsCard";
import { AboutStatsSection } from "./components/AboutStatsSection";

const AboutPage = () => {
  return (
    <div className="">
      <AboutHeroSection highlightPoints={highlightPoints} />

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <AboutJourneyCard steps={journeySteps} />
          <AboutServicesCard services={services} />
          <AboutSkillsCard />
        </div>
      </section>

      <AboutStatsSection stats={stats} />
    </div>
  );
};

export default AboutPage;

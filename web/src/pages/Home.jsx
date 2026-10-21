import Hero from "../components/sections/Hero.jsx";
import Intro from "../components/sections/Intro.jsx";
import Businesses from "../components/sections/Businesses.jsx";
import WayForward from "../components/sections/WayForward.jsx";
import Milestones from "../components/sections/Milestones.jsx";
import FeaturedProjects from "../components/sections/Projects.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import BrandWall from "../components/sections/BrandWall.jsx";
import GivingBack from "../components/sections/GivingBack.jsx";
import LatestNews from "../components/sections/News.jsx";
import Locations from "../components/sections/Locations.jsx";
import FinalCta from "../components/sections/FinalCta.jsx";

// Homepage in the order of the content brief (§7–§18). Projects,
// testimonials, Giving Back and news render only once real entries exist
// in content/site.js.
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Businesses />
      <WayForward />
      <Milestones />
      <FeaturedProjects />
      <Testimonials />
      <BrandWall />
      <GivingBack />
      <LatestNews />
      <Locations />
      <FinalCta />
    </>
  );
}

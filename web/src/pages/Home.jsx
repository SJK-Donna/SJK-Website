import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Hero from "../components/Hero.jsx";
import TeeOff from "../components/TeeOff.jsx";
import OurCompany from "../components/OurCompany.jsx";
import Fairway from "../components/Fairway.jsx";
import CourseEquipment from "../components/CourseEquipment.jsx";
import CourseCare from "../components/CourseCare.jsx";
import FindSolution from "../components/FindSolution.jsx";
import Brands from "../components/Brands.jsx";
import OurPartners from "../components/OurPartners.jsx";
import Quote from "../components/Quote.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TeeOff />
        <OurCompany />
        <Fairway />
        <CourseEquipment />
        <CourseCare />
        <FindSolution />
        <Brands />
        <OurPartners />
        <Quote />
      </main>
      <Footer />
    </>
  );
}

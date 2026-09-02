import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Hero from "../components/Hero.jsx";

// Home is being migrated section-by-section from the existing static
// site (see repo root index.html/style.css/script.js) into this React
// app. This first pass ports the Navbar, Hero (with the Three.js scene),
// and Footer; the remaining sections (Tee Off, Our Company, Fairway,
// Course Equipment, Course Care, Brands, Our Partners, Find Your
// Solution, Quote) land in follow-up PRs.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}

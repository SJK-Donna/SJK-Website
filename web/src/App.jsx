import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/home/Layout.jsx";
import Home from "./pages/Home.jsx";
import WhoWeAre from "./pages/WhoWeAre.jsx";
import BrandsPartners from "./pages/BrandsPartners.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/brands-partners" element={<BrandsPartners />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import CartExperience from "./pages/CartExperience.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d-experience" element={<CartExperience />} />
      </Routes>
    </BrowserRouter>
  );
}
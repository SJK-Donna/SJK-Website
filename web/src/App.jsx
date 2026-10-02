import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CartExperience from "./pages/CartExperience.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d-experience" element={<CartExperience />} />
      </Routes>
    </BrowserRouter>
  );
}

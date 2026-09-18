import React from "react";

export default function Header() {
  return (
    <>
      {/* Floating Navigation Header */}
      <nav id="siteNav" className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 py-4" aria-label="Primary">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" aria-label="SJK Guahan — Home">
            <img src="/images/sjk-logo-nav.png" alt="SJK Guahan" width="140" height="68" />
          </a>

          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li><a href="#hero" className="hover:text-blue-600">Home</a></li>
            <li><a href="#fairway" className="hover:text-blue-600">Golf Carts</a></li>
            <li><a href="#course-equipment" className="hover:text-blue-600">Course Equipment</a></li>
            <li><a href="#course-care" className="hover:text-blue-600">Services</a></li>
            <li><a href="#brands" className="hover:text-blue-600">Brands</a></li>
            <li><a href="#partners" className="hover:text-blue-600">Our Partners</a></li>
            <li><a href="#our-company" className="hover:text-blue-600">Our Company</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          </ul>

          <div className="flex items-center space-x-4">
            <a href="#quote" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Request a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Journey progress rail */}
      <aside id="journeyRail" className="hidden lg:block fixed right-6 top-1/3 z-40 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg" aria-hidden="true">
        <ol className="space-y-3 text-sm font-semibold text-gray-600">
          <li className="flex items-center space-x-2"><span className="text-blue-600">01</span><span>Tee</span></li>
          <li className="flex items-center space-x-2"><span className="text-blue-600">02</span><span>Fairway</span></li>
          <li className="flex items-center space-x-2"><span className="text-blue-600">03</span><span>Green</span></li>
          <li className="flex items-center space-x-2"><span className="text-blue-600">04</span><span>Course Care</span></li>
          <li className="flex items-center space-x-2"><span className="text-blue-600">05</span><span>Clubhouse</span></li>
        </ol>
      </aside>
    </>
  );
}
import FeatureSection from "./FeatureSection.jsx";

export default function CourseEquipment() {
  return (
    <FeatureSection
      id="course-equipment"
      eyebrow="03 — Course Equipment"
      title="Precision For Every Inch Of Turf."
      lead="Premium equipment engineered for exceptional cut quality, consistent results, and demanding job sites."
      cards={[
        {
          title: "Mowing",
          description: "Advanced turf care technology for tournament-ready results.",
          img: "/images/carousel/slide-3.jpg",
          alt: "Jacobsen fairway mower cutting a golf course",
          href: "#quote"
        },
        {
          title: "Construction",
          description: "Powerful, dependable machines built to conquer every job.",
          img: "/images/carousel/slide-4.jpg",
          alt: "Wacker Neuson mini excavator at a construction site",
          href: "#quote"
        }
      ]}
      chips={["Turf Care", "Debris & Materials Handling", "Utility Vehicles", "Auxiliary Equipment"]}
      featuredBrands={
        <>
          Featured brands: <a href="#brands" className="font-semibold text-forest underline underline-offset-2">Jacobsen</a> ·{" "}
          <a href="#brands" className="font-semibold text-forest underline underline-offset-2">Wacker Neuson</a>
        </>
      }
      ctaLabel="Explore Course Equipment"
      ctaHref="#quote"
    />
  );
}

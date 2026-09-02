import FeatureSection from "./FeatureSection.jsx";

export default function Fairway() {
  return (
    <FeatureSection
      id="fairway"
      dark
      eyebrow="02 — Fairway"
      title="Ride The Fairway."
      lead="Reliable transportation solutions built for golf courses, resorts, communities, and businesses."
      cards={[
        {
          title: "Golf Carts",
          description: "Premium passenger carts for courses, resorts, and communities.",
          img: "/images/carousel/slide-1.jpg",
          alt: "Row of golf carts parked on a misty golf course at dawn",
          href: "#quote"
        },
        {
          title: "Fleet Solutions",
          description: "Multi-unit fleets configured and supported for large properties.",
          img: "/images/carousel/slide-2.jpg",
          alt: "White golf cart parked beneath large trees",
          href: "#quote"
        }
      ]}
      chips={["Passenger Vehicles", "Utility Vehicles", "Mini Buses"]}
      ctaLabel="Explore Golf Carts"
      ctaHref="#quote"
    />
  );
}

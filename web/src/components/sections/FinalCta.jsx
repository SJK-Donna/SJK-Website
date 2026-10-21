import Reveal from "../ui/Reveal.jsx";
import PillLinks from "../home/PillLinks.jsx";

// Brief §18 — close every page with one simple invitation.
export default function FinalCta() {
  return (
    <section className="bg-control px-6 py-20 text-center lg:py-28">
      <Reveal className="mx-auto max-w-[760px]">
        <h2 className="font-sans text-[32px] font-semibold leading-[1.1] tracking-[-0.015em] text-white lg:text-[48px]">Let's Build the Right Solution.</h2>
        <p className="mx-auto mt-4 max-w-[58ch] text-[19px] leading-relaxed text-white/90 lg:text-[21px]">
          Whether you are managing a golf course, resort, property, landscape, mobility fleet or major outdoor operation, our team can help identify the right equipment and support strategy.
        </p>
        <PillLinks onDark primary={{ label: "Talk to Our Team", href: "/contact" }} secondary={{ label: "Contact Us", href: "/contact#form" }} className="mt-8" />
      </Reveal>
    </section>
  );
}

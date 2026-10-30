import { Eyebrow, Slant, NAVY } from "../ui/Brand.jsx";

// Opening of each inner page, in the home hero's language: a full-bleed
// photo behind a navy wash with a slow push-in, the amber flag, a large
// heavy title and a short lead, then a diagonal edge into the page.
// `next` is the background colour of the section that follows.
export default function PageHeader({ eyebrow, title, lead, img, alt = "", position, next = "#ffffff" }) {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-control text-white">
        {img && (
          <div className="absolute inset-0 -z-10">
            <img src={img} alt={alt} style={{ objectPosition: position }} className="ken-burns h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,28,44,.95)_0%,rgba(13,28,44,.8)_45%,rgba(13,28,44,.35)_100%)]" />
          </div>
        )}
        <div className="mx-auto max-w-[1320px] px-6 pb-16 pt-16 lg:pb-24 lg:pt-28">
          <div className="mb-8 flex items-start" aria-hidden="true">
            <span className="block h-12 w-[4px] bg-white lg:h-14" />
            <span className="flag flag-plant block h-9 w-9 lg:h-10 lg:w-10" />
          </div>
          {eyebrow && (
            <div className="rise" style={{ animationDelay: "0.3s" }}>
              <Eyebrow onDark>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1
            className="wide rise mt-5 max-w-[18ch] font-sans text-[40px] font-black leading-[0.98] tracking-[-0.03em] sm:text-[56px] lg:text-[76px]"
            style={{ animationDelay: "0.45s" }}
          >
            {title}
          </h1>
          {lead && (
            <p className="rise mt-7 max-w-[56ch] text-[18px] text-white/80 lg:text-[20px]" style={{ animationDelay: "0.6s" }}>
              {lead}
            </p>
          )}
        </div>
      </header>
      <Slant from={NAVY} to={next} />
    </>
  );
}

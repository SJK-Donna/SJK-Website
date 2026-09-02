import { useRef, useState } from "react";
import SectionHead from "./ui/SectionHead.jsx";
import Reveal from "./ui/Reveal.jsx";

const inputClasses =
  "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink shadow-pressed transition-shadow focus:border-forest focus:shadow-[inset_0_2px_6px_rgba(13,21,18,.15),0_0_0_3px_rgba(232,197,99,.35)] focus:outline-none";
const labelClasses = "mb-1.5 block font-display text-xs font-bold uppercase tracking-wide text-ink/70";

export default function Quote() {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Front-end only for now — no backend is wired up yet (matches the
    // existing site's behavior; nothing here fabricates a real submission).
    setSubmitted(true);
    form.reset();
  }

  return (
    <section id="quote" className="bg-warm-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[640px]">
        <SectionHead eyebrow="Talk To Our Team" title="Request A Quote." lead="Tell us what your course or job site needs — we'll follow up with the right equipment and solution." center />

        <Reveal className="rounded-3xl bg-white p-8 shadow-raised sm:p-10">
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="qName" className={labelClasses}>Name</label>
              <input type="text" id="qName" name="name" required autoComplete="name" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="qCompany" className={labelClasses}>Company / Course Name</label>
              <input type="text" id="qCompany" name="company" autoComplete="organization" className={inputClasses} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="qEmail" className={labelClasses}>Email</label>
              <input type="email" id="qEmail" name="email" required autoComplete="email" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="qPhone" className={labelClasses}>Phone</label>
              <input type="tel" id="qPhone" name="phone" autoComplete="tel" className={inputClasses} />
            </div>
          </div>
          <div>
            <label htmlFor="qInterest" className={labelClasses}>I&rsquo;m interested in</label>
            <select id="qInterest" name="interest" className={inputClasses}>
              <option>Golf Carts</option>
              <option>Course Equipment</option>
              <option>Services &amp; Support</option>
              <option>Brands &amp; Parts</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="qMessage" className={labelClasses}>Message (optional)</label>
            <textarea id="qMessage" name="message" rows={4} className={inputClasses} />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gold px-7 py-4 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-raised transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(13,21,18,.24)] active:translate-y-0 active:shadow-pressed"
          >
            Request A Quote
          </button>
          <p role="status" className={`text-center text-sm font-semibold text-forest transition-opacity ${submitted ? "opacity-100" : "opacity-0"}`}>
            Thanks — our team will reach out shortly.
          </p>
        </form>
        </Reveal>
      </div>
    </section>
  );
}

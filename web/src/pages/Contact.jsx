import { useRef, useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import Locations from "../components/sections/Locations.jsx";
import { CONTACT_INTERESTS } from "../content/site.js";

const input =
  "w-full rounded-xl border border-ink/20 bg-surface px-4 py-3 text-[16px] text-ink transition-shadow focus:border-control focus:shadow-[0_0_0_3px_rgba(75,89,56,.25)] focus:outline-none";
const label = "mb-1.5 block text-[14px] font-semibold text-ink";

// Brief §25 — keep the form simple; offices appear below it.
export default function Contact() {
  const formRef = useRef(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Front-end only: no backend or email service is connected yet, so
    // nothing is actually sent. Wire this to the CRM or a form service
    // before launch.
    setSent(true);
    form.reset();
  }

  return (
    <>
      <PageHeader eyebrow="Contact Us" title="Talk to Our Team" lead="Tell us about your course, resort, property or operation and we'll help identify the right equipment and support strategy." />

      <section id="form" className="bg-surface px-6 py-16 lg:py-20">
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="mx-auto max-w-[680px] space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cName" className={label}>Name</label>
              <input id="cName" name="name" required autoComplete="name" className={input} />
            </div>
            <div>
              <label htmlFor="cCompany" className={label}>Company</label>
              <input id="cCompany" name="company" autoComplete="organization" className={input} />
            </div>
            <div>
              <label htmlFor="cEmail" className={label}>Email</label>
              <input id="cEmail" name="email" type="email" required autoComplete="email" className={input} />
            </div>
            <div>
              <label htmlFor="cMobile" className={label}>Mobile Number</label>
              <input id="cMobile" name="mobile" type="tel" autoComplete="tel" className={input} />
            </div>
            <div>
              <label htmlFor="cLocation" className={label}>Location</label>
              <input id="cLocation" name="location" autoComplete="address-level2" placeholder="City / Province" className={input} />
            </div>
            <div>
              <label htmlFor="cInterest" className={label}>What Are You Interested In?</label>
              <select id="cInterest" name="interest" required defaultValue="" className={input}>
                <option value="" disabled>Select one</option>
                {CONTACT_INTERESTS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="cMessage" className={label}>Message</label>
            <textarea id="cMessage" name="message" rows={5} className={input} />
          </div>
          <button type="submit" className="w-full rounded-full bg-control px-7 py-3.5 text-[17px] text-white transition-colors hover:bg-forest-deep">
            Submit
          </button>
          <p role="status" className="text-center text-[15px] font-semibold text-control">
            {sent ? "Thank you — our team will reach out shortly." : ""}
          </p>
        </form>
      </section>

      <Locations />
    </>
  );
}

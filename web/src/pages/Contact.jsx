import { useRef, useState } from "react";
import PageHeader from "../components/home/PageHeader.jsx";
import Locations from "../components/sections/Locations.jsx";
import { Eyebrow } from "../components/ui/Brand.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { CONTACT_INTERESTS, LOCATIONS } from "../content/site.js";
import { sendLeadToZoho } from "../content/zohoLeads.js";
import LocationFields from "../components/home/LocationFields.jsx";

const input =
  "w-full border-0 border-b-2 border-ink/20 bg-nav px-4 py-3.5 font-sans text-[16px] text-ink transition-colors placeholder:text-ink/40 focus:border-info focus:bg-white focus:outline-none focus:ring-0";
const label = "eyebrow mb-2 block text-[11px] text-ink/70";

// Brief §25 — keep the form simple. A navy panel beside it gives the
// direct lines; the offices and map follow below.
export default function Contact() {
  const formRef = useRef(null);
  // "idle" | "sending" | "sent" | "error". Zoho's own redirect back here
  // (?sent=1) also counts as sent.
  const [status, setStatus] = useState(() => (new window.URLSearchParams(window.location.search).has("sent") ? "sent" : "idle"));
  // Bumped after a successful send to clear the Province/City fields.
  const [resetKey, setResetKey] = useState(0);
  const main = LOCATIONS[0];

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new window.FormData(form));
    // Saved to Zoho's City field as "City, Province".
    data.location = [data.city, data.province].map((v) => v.trim()).filter(Boolean).join(", ");
    // Hidden field people never see; bots that fill every field are
    // quietly ignored.
    if (data.website) {
      setStatus("sent");
      form.reset();
      setResetKey((k) => k + 1);
      return;
    }
    setStatus("sending");
    try {
      await sendLeadToZoho(data);
      setStatus("sent");
      form.reset();
      setResetKey((k) => k + 1);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Talk to Our Team"
        lead="Tell us about your course, resort, property or operation and we'll help identify the right equipment and support strategy."
        img="/images/carousel/slide-2.jpg"
        alt="White golf cart parked on a fairway under large trees"
      />

      <section id="form" className="bg-surface px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <Eyebrow>Send Us a Message</Eyebrow>
            <h2 className="wide mt-4 font-sans text-[26px] font-black leading-[1.05] text-ink lg:text-[34px]">How can we help?</h2>
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="cName" className={label}>Name</label>
                  <input id="cName" name="name" required maxLength={120} autoComplete="name" className={input} />
                </div>
                <div>
                  <label htmlFor="cCompany" className={label}>Company</label>
                  <input id="cCompany" name="company" maxLength={200} autoComplete="organization" className={input} />
                </div>
                <div>
                  <label htmlFor="cEmail" className={label}>Email</label>
                  <input id="cEmail" name="email" type="email" required maxLength={100} autoComplete="email" className={input} />
                </div>
                <div>
                  <label htmlFor="cMobile" className={label}>Mobile Number</label>
                  <input id="cMobile" name="mobile" type="tel" maxLength={30} autoComplete="tel" className={input} />
                </div>
                <LocationFields key={resetKey} inputClass={input} labelClass={label} />
                <div className="sm:col-span-2">
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
                <textarea id="cMessage" name="message" rows={5} maxLength={2000} className={input} />
              </div>
              {/* Spam trap: hidden from people and screen readers. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="cWebsite">Website</label>
                <input id="cWebsite" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="cut cut-sm wide bg-control px-8 py-4 font-sans text-[15px] font-bold text-white transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Submit"}
                </button>
                <p role="status" className={`font-sans text-[16px] font-semibold ${status === "error" ? "text-red-700" : "text-control"}`}>
                  {status === "sent" && "Thank you — our team will reach out shortly."}
                  {status === "error" && (
                    <>
                      Sorry, your message couldn't be sent. Please try again, or call us on{" "}
                      {main?.phones[0] ? <a href={`tel:${main.phones[0][1]}`} className="underline">{main.phones[0][0]}</a> : "our Manila office"}.
                    </>
                  )}
                </p>
              </div>
            </form>
          </Reveal>

          {main && (
            <Reveal delay={150} as="aside" className="cut cut-lg relative h-fit overflow-hidden bg-control p-8 text-white lg:col-span-4 lg:mt-2 lg:p-10">
              <span className="flag absolute -right-8 -top-8 h-32 w-32 !bg-forest-deep" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow flex items-center gap-3 text-[11px] text-white/80">
                  <span className="flag h-3 w-3" aria-hidden="true" />
                  Call Us Directly
                </p>
                <h3 className="wide mt-4 font-sans text-[21px] font-extrabold">{main.name}</h3>
                {main.role && <p className="text-[14px] text-white/60">{main.role}</p>}
                <ul className="mt-6 space-y-2">
                  {main.phones.map(([shown, dial]) => (
                    <li key={dial}>
                      <a href={`tel:${dial}`} className="wide font-sans text-[18px] font-bold text-info hover:text-white">{shown}</a>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-white/15 pt-6 text-[15px] text-white/70">
                  Branches in {LOCATIONS.map((l) => l.name).join(", ")}.{" "}
                  <a href="#locations" className="font-semibold text-white underline decoration-info decoration-2 underline-offset-4">See all offices</a>
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Locations />
    </>
  );
}

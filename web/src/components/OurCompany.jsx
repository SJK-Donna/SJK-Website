import Reveal from "./ui/Reveal.jsx";

const PRINCIPLES = [
  {
    num: "01",
    title: "Respect",
    body: "Respect is the foundation of our business. We treat everyone with dignity, fostering inclusivity, trust, and empathy. By valuing diverse perspectives, we build strong relationships that encourage collaboration, understanding, and mutual appreciation."
  },
  {
    num: "02",
    title: "Hospitality and Efficiency",
    body: "Hospitality lies at the heart of everything we do, providing exceptional service and creating positive experiences for our customers. Our commitment to efficiency ensures prompt and reliable solutions, respecting your time and resources."
  },
  {
    num: "03",
    title: "Communication",
    body: "We value clear and open communication. We actively listen, seeking to understand your unique needs. Through transparent and proactive communication, we ensure that you are well-informed and confident in every interaction with us."
  },
  {
    num: "04",
    title: "Accountability",
    body: "Accountability forms the backbone of our commitment to excellence. We take ownership, delivering on promises and exceeding expectations. We embrace responsibility and continuously improve to earn and maintain your trust."
  }
];

export default function OurCompany() {
  return (
    <section id="our-company" className="bg-warm-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="mb-3.5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-gold-deep">
              <span className="h-px w-6 bg-current opacity-70" />
              Our Company
            </span>
            <h2 className="mb-5 text-[clamp(28px,3.6vw,44px)] font-semibold leading-tight text-ink">Who We Are</h2>
            <p className="mb-4 max-w-[56ch] text-base leading-relaxed text-ink/70">
              SJK Guahan is a JV between two groups from the Philippines and Guam that started by bringing Club Car golf carts to the country. We then partnered with Textron&rsquo;s Jacobsen mower lineup to further support golf courses. To complete our outdoor offerings, we partnered with Wacker Neuson for reliable earth moving solutions.
            </p>
            <p className="max-w-[56ch] text-base leading-relaxed text-ink/70">
              Rediscover the joy of the great outdoors as our products breathe new life into your adventures, creating stronger bonds and timeless memories with friends and family.
            </p>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-3xl shadow-raised">
            <img
              src="/images/brands/golf-carts-ph.jpg"
              alt="Golf Carts PH branded Club Car golf carts on a misty golf course"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>

        <Reveal className="mt-24 grid items-center gap-10 rounded-3xl bg-forest-deep p-8 shadow-raised-dark sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-2xl">
            <img src="/images/brands/golf-cart-course.jpg" alt="Golf cart on a golf course at dawn" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <span className="mb-3.5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-gold">
              <span className="h-px w-6 bg-current opacity-70" />
              Our Mission
            </span>
            <p className="text-[clamp(18px,2vw,24px)] leading-relaxed text-white/90">
              SJK Guahan focuses on providing superior service through durable and reliable products. Our mission is to continue to find ways to enhance the enjoyment of being outdoors through products you can afford and trust.
            </p>
          </div>
        </Reveal>

        <div className="mt-24">
          <Reveal as="h3" className="mb-8 text-center text-2xl font-semibold text-ink">
            Business Principles
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                key={p.num}
                delay={i * 80}
                as="article"
                className="rounded-2xl bg-white p-7 shadow-raised transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(13,21,18,.16)]"
              >
                <span className="mb-3 block font-mono text-xs text-gold-deep">{p.num}</span>
                <h4 className="mb-3 font-display text-lg font-bold text-ink">{p.title}</h4>
                <p className="text-sm leading-relaxed text-ink/65">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

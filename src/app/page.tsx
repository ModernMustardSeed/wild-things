"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { VHSTimestamp } from "@/components/VHSTimestamp";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Marquee } from "@/components/Marquee";
import { GalleryCard } from "@/components/GalleryCard";

const PROJECTS = [
  {
    title: "Make Me Studio",
    subtitle: "AI creative studio — video, image & asset generation powered by Veo & Imagen",
    color: "bg-burgundy",
    tags: ["Next.js", "Gemini", "Stripe"],
    href: "https://source-zip.vercel.app",
  },
  {
    title: "Cross + Covenant",
    subtitle: "Headless e-commerce with WebGL particles, Shopify & print-on-demand",
    color: "bg-hunter",
    tags: ["Shopify", "WebGL", "Printify"],
    href: "https://cross-covenant.vercel.app",
  },
  {
    title: "Olive Shoot",
    subtitle: "Agentic OS for solopreneurs — tRPC, real-time, AI-native",
    color: "bg-navy",
    tags: ["Next.js 16", "tRPC", "Zustand"],
    href: "https://olive-shoot.vercel.app",
  },
  {
    title: "Modern Mustard Seed",
    subtitle: "AI product studio — WebGL MustardTree, voice agent CTA, whitepaper",
    color: "bg-rust",
    tags: ["React", "WebGL", "Vite"],
    href: "https://modernmustardseed.com",
  },
  {
    title: "Ignition",
    subtitle: "Multi-agent idea-to-income swarm — coordinated AI collaboration",
    color: "bg-hunter",
    tags: ["Multi-Agent", "Claude", "Gemini"],
    href: "https://ignition-sarah-7990s-projects.vercel.app",
  },
  {
    title: "Kingdom Lab",
    subtitle: "AI experimentation playground — prototypes & showcases",
    color: "bg-burgundy",
    tags: ["Next.js", "AI APIs", "Vercel"],
    href: "https://kingdom-lab.vercel.app",
  },
  {
    title: "Alive Notes",
    subtitle: "An OS for human intention — mobile-first, beautifully crafted",
    color: "bg-navy",
    tags: ["Expo", "React Native", "Zustand"],
    href: "https://alive-notes-landing.vercel.app",
  },
  {
    title: "Luxe Design",
    subtitle: "AI interior design & virtual staging for real estate pros",
    color: "bg-rust",
    tags: ["Replicate", "Stripe", "Supabase"],
    href: "https://luxedesign-five.vercel.app",
  },
  {
    title: "AdForge Studio",
    subtitle: "AI-powered ad creative generation & campaign design",
    color: "bg-hunter",
    tags: ["AI", "Creative", "Studio"],
    href: "https://adforge-studio.vercel.app",
  },
  {
    title: "The Claw Concierge",
    subtitle: "Premium setup service — three tiers from $697 to $15K+",
    color: "bg-burgundy",
    tags: ["Brand", "Service", "Community"],
    href: "https://theclawconcierge.com",
  },
  {
    title: "Upskill Academy",
    subtitle: "AI workforce development — 25 courses, WIOA-eligible",
    color: "bg-navy",
    tags: ["React", "Zustand", "Education"],
    href: "https://modern-mustard-seed-academy.vercel.app",
  },
  {
    title: "What Next",
    subtitle: "AI decision intelligence — scenario modeling & outcome prediction",
    color: "bg-rust",
    tags: ["AI", "Supabase", "TypeScript"],
    href: "https://what-next-ruddy.vercel.app",
  },
];

const STATS = [
  { value: "20+", label: "Products Shipped Solo" },
  { value: "2-6 Wks", label: "Idea to Launch" },
  { value: "0", label: "Handoffs Required" },
];

const MARQUEE_WORDS = [
  "FULLSTACK",
  "AI ARCHITECT",
  "PRODUCT TASTE",
  "UNTAMED",
  "SHIPPED",
  "NEXT.JS",
  "SUPABASE",
  "MULTI-AGENT",
  "CLAUDE",
  "SELF-TAUGHT",
  "FOUNDER",
  "MONTANA",
  "IDEA TO PRODUCT",
  "NAPKIN TO PRODUCTION",
  "SHIPS FAST",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <main className="relative">
      {/* ════════════════════════════════════════════
          NAV
          ════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 mix-blend-difference">
        <Link href="/" className="font-display text-sm font-bold tracking-wide text-cream">
          WILD <span className="italic">Things</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/gallery"
            className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-cream/70 hover:text-cream transition-colors duration-300"
          >
            Gallery
          </Link>
          <a
            href="mailto:sarah@modernmustardseed.com"
            className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-cream/70 hover:text-cream transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden particles">
        <motion.div
          style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/zoo-party-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-warm-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-black/30 via-transparent to-warm-black" />
        </motion.div>

        <motion.div
          style={{ y: titleY }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        >
          <div className="absolute top-8 left-8">
            <VHSTimestamp label="PLAY" />
          </div>
          <div className="absolute top-8 right-8">
            <span className="vhs-timestamp">SARAH SCARANO</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="vhs-timestamp mb-6 tracking-[0.5em]">
              FULLSTACK ENGINEER &middot; AI ARCHITECT &middot; PRODUCT BUILDER
            </p>
            <h1
              className="vhs-glitch font-display font-bold leading-[0.85] tracking-tight"
              data-text="WILD THINGS"
              style={{ fontSize: "clamp(4rem, 15vw, 14rem)" }}
            >
              WILD
              <br />
              <span className="italic font-normal text-gold">Things</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-cream/60 font-display text-2xl md:text-3xl max-w-2xl leading-snug"
          >
            You have the idea. <span className="italic text-gold">I make it real.</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-3 text-cream/30 font-display italic text-lg"
          >
            Idea to product. In weeks, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="vhs-timestamp">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20" />
      </section>

      {/* ════════════════════════════════════════════
          STATS BAR
          ════════════════════════════════════════════ */}
      <section className="border-y border-gold/10 py-10 md:py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 px-6">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} direction="none">
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-gold tracking-tight gold-glow">
                  {stat.value}
                </p>
                <p className="vhs-timestamp mt-2">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MARQUEE
          ════════════════════════════════════════════ */}
      <Marquee words={MARQUEE_WORDS} />

      {/* ════════════════════════════════════════════
          ABOUT — Who I Am
          ════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <p className="vhs-timestamp mb-4">THE BUILDER</p>
            <h2
              className="font-display font-bold leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Your idea
              <br />
              <span className="italic text-gold">deserves</span>
              <br />
              to exist.
            </h2>
            <div className="space-y-4 text-cream/50 text-lg leading-relaxed">
              <p>
                Most people have an idea they believe in. What they don&apos;t
                have is someone who can sit with them, see the product inside
                it, and then actually build the thing. I&apos;m that person.
              </p>
              <p>
                I don&apos;t need your spec. I don&apos;t need your wireframes.
                I need your idea — messy, half-formed, napkin-sketch, whatever.
                I&apos;ll help you refine it, design the architecture, build
                every layer of it, and deploy it to production. Frontend,
                backend, AI, payments, the works. One person, one vision, zero
                handoffs.
              </p>
              <p>
                Before I wrote my first line of code, I spent fifteen years
                selling luxury goods, leading teams, and closing $3M+ a year.
                That instinct — knowing what people want before they can
                articulate it — is now embedded in every product I build.
              </p>
              <p className="text-gold/60 italic">
                Self-taught. No CS degree. 20+ live products. Every skill
                earned by shipping.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative video-vignette rounded-sm overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-[4/5] object-cover"
              >
                <source src="/videos/builder.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-4 border border-gold/20 rounded-sm pointer-events-none" />
              <div className="absolute bottom-6 right-6">
                <VHSTimestamp />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          DIVIDER
          ════════════════════════════════════════════ */}
      <div className="gold-line mx-24" />

      {/* ════════════════════════════════════════════
          PHILOSOPHY
          ════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="vhs-timestamp text-center mb-4">HOW I WORK</p>
          <h2
            className="font-display font-bold text-center leading-[0.9] tracking-tight mb-20"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Four Ways <span className="italic text-gold">In</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              num: "I",
              title: "The Spark",
              tag: "STRATEGY & CLARITY",
              text: "You have a concept but need clarity. We do a deep-dive strategy session where I learn your vision, audience, and goals. You walk away with a product blueprint, wireframes, tech architecture, and a build roadmap. Your idea goes from foggy to focused — ready to build.",
              includes: ["Product strategy session", "Wireframes & user flow", "Tech architecture plan", "Build roadmap & timeline"],
            },
            {
              num: "II",
              title: "The Website",
              tag: "DESIGN, BUILD & HOST",
              text: "Need a beautiful, fast website that actually converts? I design and build it from scratch — not a template, not a drag-and-drop. Custom design, mobile-perfect, blazing fast, SEO-ready. Hosted and maintained so you never think about servers. Perfect for businesses, personal brands, and launches.",
              includes: ["Custom design & development", "Mobile-responsive & SEO-optimized", "Hosting, domain & SSL setup", "Ongoing maintenance available"],
            },
            {
              num: "III",
              title: "The Build",
              tag: "IDEA TO DEPLOYED PRODUCT",
              text: "This is where ideas become real. I take your concept — whether it's a SaaS app, a marketplace, an AI-powered tool, or a complex system — and build every layer of it. Frontend, backend, AI, payments, auth, the works. Deployed on your domain, ready for real users. Most builds ship in 2–6 weeks.",
              includes: ["Full-stack development", "AI & automation integration", "Payments, auth & databases", "Production deployment & launch"],
            },
            {
              num: "IV",
              title: "The Product Partner",
              tag: "FRACTIONAL CTO",
              text: "Your ongoing technical co-founder — without the equity conversation. I embed in your business for continuous engineering, product strategy, feature development, and scaling. Perfect for founders who need senior-level technical leadership on retainer to keep shipping and growing.",
              includes: ["Ongoing feature development", "Product strategy & roadmap", "Architecture & scaling", "Team guidance & code review"],
            },
          ].map((pillar, i) => (
            <ScrollReveal key={pillar.num} delay={i * 0.1}>
              <div className="group tier-card rounded-sm p-8 md:p-10 bg-warm-black">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-5xl font-bold text-gold/15 group-hover:text-gold/40 transition-colors duration-500">
                    {pillar.num}
                  </span>
                  <span className="vhs-timestamp">{pillar.tag}</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 tracking-wide group-hover:text-gold transition-colors duration-500">
                  {pillar.title}
                </h3>
                <p className="text-cream/40 leading-relaxed mb-6">{pillar.text}</p>
                <div className="border-t border-gold/10 pt-4">
                  <p className="vhs-timestamp mb-3">INCLUDES</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {pillar.includes.map((item) => (
                      <li key={item} className="text-cream/30 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="text-center text-cream/25 mt-10 font-display italic text-sm">
            Every project is different. Let&apos;s talk about yours — I&apos;ll put together a custom scope and quote.
          </p>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════
          MARQUEE #2
          ════════════════════════════════════════════ */}
      <Marquee
        words={[
          "REACT",
          "TYPESCRIPT",
          "TAILWIND",
          "SUPABASE",
          "PRISMA",
          "STRIPE",
          "WEBGL",
          "VOICE AI",
          "MCP",
          "CLAUDE CODE",
          "TRIGGER.DEV",
          "VERCEL",
          "IDEA TO PRODUCT",
          "NAPKIN TO PRODUCTION",
          "SHIPS FAST",
        ]}
      />

      {/* ════════════════════════════════════════════
          PORTFOLIO — The Collection
          ════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="vhs-timestamp mb-4">THE COLLECTION</p>
              <h2
                className="font-display font-bold leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Ideas I&apos;ve Brought to <span className="italic text-gold">Life</span>
              </h2>
            </div>
            <span className="hidden md:block vhs-timestamp">
              {PROJECTS.length} OF 20+ PRODUCTS
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {PROJECTS.map((item, i) => (
            <GalleryCard
              key={item.title}
              index={i}
              title={item.title}
              subtitle={item.subtitle}
              color={item.color}
              tags={item.tags}
              href={item.href}
              aspect="aspect-[3/4]"
            />
          ))}
        </div>

        <ScrollReveal>
          <p className="text-center text-cream/30 mt-12 text-sm font-display italic">
            Plus: CXC Design Studio, Voice Staff, Glacier Landing, Good Company,
            AI Deal Analyzer, PTG Deal Assistant, Wild Hope Ranch & Homes,
            Miracle Witness Network, UGC Studio, D&D Landscaping, Roar Coffee, and more.
          </p>
          <div className="flex justify-center mt-10">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 border border-gold/30 hover:border-gold/60 px-8 py-4 rounded-sm transition-all duration-500 hover:bg-gold/5"
            >
              <span className="font-display text-sm tracking-[0.2em] uppercase text-cream/60 group-hover:text-gold transition-colors">
                View the Full Archive
              </span>
              <span className="text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300">
                &rarr;
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════
          VIDEO INTERLUDE — Quote
          ════════════════════════════════════════════ */}
      <section className="relative h-[70vh] overflow-hidden my-8 letterbox">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/zoo-party-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-warm-black/70" />
        <div className="absolute inset-0 flex items-center justify-center z-10 particles">
          <ScrollReveal>
            <blockquote className="text-center px-8 max-w-3xl">
              <p
                className="font-display italic leading-snug text-cream/90 gold-glow"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
              >
                &ldquo;You have the idea. I make it real.
                <br />
                The proof is in the portfolio.&rdquo;
              </p>
              <footer className="vhs-timestamp mt-6">
                — Sarah Scarano
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
        <div className="absolute top-6 left-6 z-10">
          <VHSTimestamp label="REEL 02" />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHAT I BUILD
          ════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="vhs-timestamp text-center mb-4">SERVICES</p>
          <h2
            className="font-display font-bold text-center leading-[0.9] tracking-tight mb-20"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            What I Can <span className="italic text-gold">Build</span> For You
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-px bg-gold/10">
          {[
            {
              title: "Your SaaS Idea, Live",
              desc: "Production web apps with auth, payments, databases. From concept to deployed in weeks.",
            },
            {
              title: "AI That Actually Works",
              desc: "Multi-agent systems, voice AI, content generation, RAG. Not a chatbot wrapper — real AI infrastructure.",
            },
            {
              title: "Experiences That Stop the Scroll",
              desc: "WebGL, animations, scroll-driven storytelling. Products that feel premium because the details actually are.",
            },
            {
              title: "Your Online Store, End to End",
              desc: "Headless Shopify, print-on-demand, subscriptions, ambassador programs. Pixel to checkout.",
            },
            {
              title: "Your Brand, Designed",
              desc: "Visual identity, type systems, color worlds, motion language. The vibe, systematized.",
            },
            {
              title: "AI Agents That Run Your Business",
              desc: "Multi-agent orchestration, MCP, knowledge graphs. Departments in a box.",
            },
            {
              title: "A Website That Works as Hard as You Do",
              desc: "Custom-designed, blazing-fast websites built from scratch. Hosted, maintained, and SEO-ready. No templates.",
            },
            {
              title: "Mobile Apps, Native Feel",
              desc: "Cross-platform mobile apps with React Native & Expo. One codebase, iOS and Android, beautiful and performant.",
            },
            {
              title: "Automations That Save You Hours",
              desc: "Workflows, integrations, scheduled jobs, and smart pipelines. Connect your tools and let the machines do the busywork.",
            },
          ].map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="group service-card bg-warm-black p-10 hover:bg-charcoal transition-colors duration-500">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="vhs-timestamp">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-2xl font-bold mt-3 mb-2 tracking-wide group-hover:text-gold transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-cream/40">{service.desc}</p>
                  </div>
                  <span className="text-gold/20 group-hover:text-gold/60 group-hover:translate-x-1 transition-all duration-500 text-3xl font-display">
                    &rarr;
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EXPERIENCE TIMELINE
          ════════════════════════════════════════════ */}
      <div className="gold-line mx-24" />

      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="vhs-timestamp text-center mb-4">THE JOURNEY</p>
          <h2
            className="font-display font-bold text-center leading-[0.9] tracking-tight mb-20"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Before the <span className="italic text-gold">Code</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-0">
          {[
            {
              year: "2024 — NOW",
              role: "Founder & Lead Engineer",
              org: "Modern Mustard Seed",
              detail:
                "AI-powered product studio. 20+ production apps shipped solo. Full ownership — frontend to agentic infrastructure.",
              link: "https://modernmustardseed.com",
            },
            {
              year: "2024 — NOW",
              role: "VP of Sales",
              org: "Presidential Title Group",
              detail:
                "First AI-and-human collaborative title team in the country. Built AI Deal Assistant platform & sales infrastructure across 40+ states.",
            },
            {
              year: "2019 — 2024",
              role: "Founder & Creative Director",
              org: "Unify DeFi",
              detail:
                "Blockchain consulting, education, and mass adoption strategy. Built community programs from scratch.",
            },
            {
              year: "2019 — 2023",
              role: "Investor & Operator",
              org: "Hello Sunshine Properties",
              detail:
                "Transformed 26 historic Jacksonville homes into Airbnbs. 96% occupancy, 4.9 rating. Led team of 5. Thrived through COVID.",
            },
            {
              year: "2008 — 2017",
              role: "Designer & Sales Manager",
              org: "Paradise Grilling Systems",
              detail:
                "$3M+ annually for 9 consecutive years. Luxury outdoor kitchens ($5K–$50K). Managed team of 6 at shows nationwide.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.org} delay={i * 0.1}>
              <div className="group relative pl-8 pb-12 border-l border-gold/15 last:pb-0">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-2 h-2 -translate-x-[4.5px] rounded-full bg-gold/30 group-hover:bg-gold transition-colors duration-500" />
                <p className="vhs-timestamp mb-2">{item.year}</p>
                <h3 className="font-display text-xl font-bold tracking-wide group-hover:text-gold transition-colors duration-500">
                  {item.role}
                </h3>
                <p className="text-gold/50 font-display italic text-sm mt-0.5">
                  {item.org}
                  {item.link && (
                    <>
                      {" "}
                      &middot;{" "}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-gold transition-colors"
                      >
                        visit
                      </a>
                    </>
                  )}
                </p>
                <p className="text-cream/40 mt-2 leading-relaxed text-sm">
                  {item.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TECH ARSENAL
          ════════════════════════════════════════════ */}
      <div className="gold-line mx-24" />

      <section className="py-24 px-6 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="vhs-timestamp text-center mb-12">TECHNICAL ARSENAL</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              label: "Frontend",
              items: "React, Next.js 14/15/16, TypeScript, Tailwind, Framer Motion, Three.js, WebGL, Vite",
            },
            {
              label: "Backend",
              items: "Node.js, Supabase, Prisma, PostgreSQL, tRPC, Stripe, Edge Functions, Vercel, Railway",
            },
            {
              label: "AI & LLM",
              items: "Gemini, Claude, GPT-4, Veo, Imagen, Voice AI (Vapi, ElevenLabs, Deepgram), RAG Pipelines",
            },
            {
              label: "Agentic",
              items: "Multi-Agent Orchestration, Claude Code, MCP Protocol, Trigger.dev, Knowledge Graphs, n8n",
            },
          ].map((category, i) => (
            <ScrollReveal key={category.label} delay={i * 0.1}>
              <div>
                <h3 className="font-display text-sm font-bold text-gold tracking-[0.2em] uppercase mb-3">
                  {category.label}
                </h3>
                <p className="text-cream/40 text-sm leading-relaxed">
                  {category.items}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════ */}
      <div className="gold-line mx-24" />

      <section className="relative py-40 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 abstract-gradient opacity-50" />
        <div className="absolute inset-0 particles" />
        <ScrollReveal>
          <div className="relative z-10">
          <p className="vhs-timestamp mb-6 tracking-[0.5em]">
            LET&apos;S WORK TOGETHER
          </p>
          <h2
            className="font-display font-bold leading-[0.85] tracking-tight mb-8 gold-glow"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Let&apos;s Build
            <br />
            <span className="italic text-gold">Something Wild</span>
          </h2>
          <p className="text-cream/40 max-w-xl mx-auto text-lg mb-4">
            Got an idea you believe in? Tell me about it. I&apos;ll tell you
            what it takes to make it real — and then I&apos;ll build it. No
            agencies, no dev teams, no months of waiting. Just you, me, and a
            product that works.
          </p>
          <p className="text-cream/30 text-sm mb-12">
            Currently accepting 3-5 new builds per quarter &middot; Remote from
            Kalispell, Montana
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:sarah@modernmustardseed.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-12 py-5 border border-gold/40 text-gold font-display tracking-[0.3em] uppercase text-sm hover:bg-gold/10 transition-colors duration-500"
            >
              Book a Free Call
            </motion.a>
            <motion.a
              href="/gallery"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-12 py-5 border border-cream/10 text-cream/50 font-display tracking-[0.3em] uppercase text-sm hover:border-cream/30 hover:text-cream/80 transition-colors duration-500"
            >
              See the Work
            </motion.a>
          </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <footer className="border-t border-gold/10 py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-xl font-bold tracking-wide">
              WILD <span className="italic text-gold">Things</span>
            </span>
            <span className="text-cream/20">|</span>
            <VHSTimestamp />
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link
              href="/gallery"
              className="vhs-timestamp hover:text-gold transition-colors duration-300"
            >
              Gallery
            </Link>
            {[
              {
                label: "GitHub",
                href: "https://github.com/sarahscarano",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/sarahscarano",
              },
              {
                label: "X / Twitter",
                href: "https://x.com/sarahmscarano",
              },
              {
                label: "Studio",
                href: "https://modernmustardseed.com",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="vhs-timestamp hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="vhs-timestamp">
            Kalispell, Montana &middot; Remote
          </p>
        </div>
      </footer>
    </main>
  );
}

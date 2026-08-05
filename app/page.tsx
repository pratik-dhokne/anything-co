"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Search, MapPin, ShieldCheck, Star, ArrowRight, CheckCircle2, Clock, Wallet,
  Smartphone, Apple, PlayCircle, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, Reveal } from "@/components/section";
import { ServiceIcon } from "@/components/service-icon";
import { categories, featured } from "@/lib/services";
import { WHATSAPP_URL } from "@/components/site-layout";

const steps = [
  { icon: Search, title: "Tell us what you need", text: "Describe the job in one request — text, photo or voice." },
  { icon: ShieldCheck, title: "Get matched instantly", text: "We match verified partners near you within minutes." },
  { icon: Wallet, title: "Compare quotes", text: "Review transparent quotes, ratings and timelines side by side." },
  { icon: CheckCircle2, title: "Track & pay securely", text: "Live tracking, escrow-protected payments, rated on delivery." },
];

const why = [
  { icon: ShieldCheck, title: "Verified partners", text: "ID, skill and background checks before any partner goes live." },
  { icon: Wallet, title: "Transparent pricing", text: "Upfront quotes with no hidden charges or surprise add-ons." },
  { icon: Clock, title: "On-time promise", text: "Live ETA tracking with automatic rescheduling if we slip." },
  { icon: Star, title: "Rated by real customers", text: "Every job is reviewed. Low scores lose marketplace access." },
];

const testimonials = [
  { name: "Nitin Kingar", city: "Sai Nagar, Amravati", text: "Raised one request at 9pm and had a verified electrician at my door by 8am. Pricing matched the quote exactly.", rating: 5 },
  { name: "Anil Marathe", city: "Amravati", text: "Used Anything.co for our office move and post-event cleanup. Both crews were professional and insured.", rating: 5 },
  { name: "Pratik Dhokne", city: "Gopal Nagar, Amravati", text: "The quote comparison saved me almost 30% on AC servicing for six units.", rating: 4 },
];
const reels = [
  "https://www.instagram.com/reel/DbdhzHBvvWs/",
  "https://www.instagram.com/reel/DbYYx5qPglL/",
  "https://www.instagram.com/reel/DbSXtIXoAk6/",
  "https://www.instagram.com/reel/DbDyTlLvfwB/",
];
const partners = [
  { name: "BrightHome Care", tag: "Cleaning · 1.2k jobs", rating: 4.9 },
  { name: "VoltEdge Electricals", tag: "Electrician · 860 jobs", rating: 4.8 },
  { name: "PixelForge Studio", tag: "Web & Apps · 210 projects", rating: 5.0 },
  { name: "SafeMove Logistics", tag: "Packers · 640 moves", rating: 4.7 },
  { name: "AquaShine Auto", tag: "Car Wash · 2.4k washes", rating: 4.8 },
  { name: "GreenLeaf Pest", tag: "Pest Control · 430 jobs", rating: 4.9 },
];

const stats = [
  { value: "38+", label: "Service categories" },
  { value: "12,400+", label: "Verified partners" },
  { value: "1.8M", label: "Requests fulfilled" },
  { value: "4.8/5", label: "Average rating" },
];

const faqs = [
  ["How does Anything.co work?", "You raise one request describing what you need. We match verified partners near you, share transparent quotes, and you pick the one that fits. We mediate the job until it's completed and paid."],
  ["Are the partners verified?", "Yes. Every partner clears identity, skill and background verification before receiving requests, and keeps a live rating that determines their visibility."],
  ["How is pricing decided?", "Partners quote against your request using standard rate cards. You see the total upfront — materials, labour and taxes — with no hidden charges."],
  ["Is my payment protected?", "Payments are held securely and released to the partner after the job is marked complete. Disputes are mediated by our support team."],
  ["Which cities do you serve?", "We operate across 180+ cities with location-based matching, and add new pincodes weekly based on demand."],
  ["Can businesses partner with you?", "Absolutely. Individual professionals, agencies and registered businesses can apply through the Become a Partner page."],
];

export default function Page() {
  const [query, setQuery] = useState("");
  const suggestions = query
    ? categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];
    useEffect(() => {
  const win = window as any;

  const processEmbeds = () => {
    if (win.instgrm?.Embeds?.process) {
      win.instgrm.Embeds.process();
    }
  };

  const existingScript = document.querySelector(
    'script[src="https://www.instagram.com/embed.js"]'
  );

  if (existingScript) {
    processEmbeds();
  } else {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }

  // retry once more after DOM settles, in case blockquotes weren't ready
  const timer = setTimeout(processEmbeds, 500);
  return () => clearTimeout(timer);
}, [reels]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="rounded-full bg-brand-soft text-primary hover:bg-brand-soft">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Verified partners in Amravati City
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              One Request.
              <br />
              <span className="gradient-text">Countless Possibilities.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Anything.co is the trusted marketplace connecting you with verified businesses,
              professionals and technicians - with transparent pricing and quality you can rate.
            </p>

            <div className="mt-8 rounded-2xl surface-glass p-2 shadow-soft">
              <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,10rem)_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What do you need?"
                    aria-label="Search services"
                    className="h-12 rounded-xl border-0 bg-card pl-9"
                  />
                </div>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    defaultValue="Amravati"
                    aria-label="Location"
                    className="h-12 rounded-xl border-0 bg-card pl-9"
                  />
                </div>
                <Button asChild size="lg" className="h-12 rounded-xl">
                  <Link href="/services#request">Request services</Link>
                </Button>
              </div>
              {suggestions.length > 0 && (
                <ul className="mt-2 space-y-1 rounded-xl bg-card p-2">
                  {suggestions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href="/services"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                      >
                        <ServiceIcon name={s.icon} className="h-4 w-4 text-primary" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> Free quotes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> Secure payments
              </span>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
                Or request on WhatsApp →
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src="/hero.jpg"
              width={1280}
              height={1024}
              alt="Verified Anything.co service professionals ready for work"
              className="w-full rounded-3xl object-cover shadow-glow"
            />
            <div className="absolute -bottom-5 left-5 rounded-2xl surface-glass px-4 py-3 shadow-soft">
              <p className="text-xs text-muted-foreground">Live now</p>
              <p className="text-sm font-semibold"></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <Section
        eyebrow="Categories"
        title="Everything you need, in one marketplace"
        description="From a leaking tap to a full product build."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.slice(0, 10).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.02}>
              <Link
                href="/services"
                className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-4 hover-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-primary">
                  <ServiceIcon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-snug">{c.name}</span>
                {/* <span className="mt-auto text-xs text-muted-foreground">from ₹{c.from}</span> */}
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/services">
              View all categories <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Featured */}
      <Section eyebrow="Featured" title="Most requested this week">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Card className="h-full overflow-hidden border-0 bg-card shadow-soft hover-lift">
                <div className="h-24 gradient-brand" />
                <CardContent className="-mt-8 space-y-3 p-5">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border bg-card text-primary shadow-soft">
                    <ServiceIcon name={c.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-base font-semibold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.blurb}</p>
                  <div className="flex items-center justify-between pt-2 text-sm">
                    <span className="flex items-center gap-1 font-medium">
                      <Star className="h-4 w-4 fill-accent text-accent" /> {c.rating}
                    </span>
                    {/* <span className="font-semibold text-primary">from ₹{c.from}</span> */}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section eyebrow="How it works" title="Four steps from request to done">
        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="relative h-full rounded-2xl border bg-card p-6 shadow-soft">
                <span className="absolute right-5 top-4 text-4xl font-extrabold text-muted/60">
                  {i + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl gradient-brand text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section eyebrow="Why Anything.co" title="A mediator that actually stands behind the job">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl bg-brand-soft/60 p-6">
                <w.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section eyebrow="Testimonials" title="Trusted by customers Amravati">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <Card className="h-full border-0 shadow-soft">
                <CardContent className="space-y-4 p-6">
                  <Quote className="h-6 w-6 text-primary/40" />
                  <p className="text-sm leading-relaxed">{t.text}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Instagram Reels */}
<Section eyebrow="Follow us" title="See it in action on Instagram">
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {reels.map((url, i) => (
      <Reveal key={url} delay={i * 0.05}>
        <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ margin: 0, background: "transparent", width: "100%" }}
          />
        </div>
      </Reveal>
    ))}
  </div>
  <div className="mt-8 text-center">
    <Button asChild variant="outline" className="rounded-full">
      <a href="https://www.instagram.com/theanything.co" target="_blank" rel="noreferrer">
        Follow @theanything.co <ArrowRight className="ml-1 h-4 w-4" />
      </a>
    </Button>
  </div>
</Section>

      {/* Partner showcase */}
      {/* <Section eyebrow="Partner showcase" title="Meet a few of our top-rated partners">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 hover-lift">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full gradient-brand font-display text-lg font-bold text-primary-foreground">
                  {p.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate font-semibold">
                    {p.name}
                    <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{p.tag}</p>
                </div>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-sm font-semibold">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {p.rating}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section> */}

      {/* Stats */}
      {/* <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-6 rounded-3xl gradient-brand px-6 py-12 text-primary-foreground sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-extrabold">{s.value}</p>
                <p className="mt-1 text-sm opacity-85">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section> */}

      {/* App promo */}
      {/* <Section>
        <Reveal>
          <div className="grid items-center gap-10 rounded-3xl border bg-card p-8 shadow-soft lg:grid-cols-2 lg:p-12">
            <div>
              <Badge className="rounded-full bg-accent/15 text-accent-foreground hover:bg-accent/15">
                Mobile app
              </Badge>
              <h2 className="mt-4 text-3xl font-bold">Track every request from your pocket</h2>
              <p className="mt-3 text-muted-foreground">
                Live partner tracking, quote comparison, chat, invoices and instant rebooking — all
                in the Anything.co app.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full">
                  <Apple className="mr-2 h-4 w-4" /> App Store
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  <PlayCircle className="mr-2 h-4 w-4" /> Google Play
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="rounded-[2rem] border bg-background p-4 shadow-glow">
                <div className="flex items-center gap-2 border-b pb-3">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Request #AC-4821</p>
                  <Badge className="ml-auto bg-success text-success-foreground">On the way</Badge>
                </div>
                <div className="space-y-3 pt-4 text-sm">
                  {["Request raised", "3 quotes received", "Partner assigned", "Arriving in 12 min"].map(
                    (t, i) => (
                      <div key={t} className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${i < 3 ? "bg-success" : "bg-accent"}`}
                        />
                        <span className={i < 3 ? "text-muted-foreground" : "font-medium"}>{t}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section> */}

      {/* FAQ */}
      {/* <Section eyebrow="FAQ" title="Questions, answered" className="max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left font-medium">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section> */}
    </>
  );
}

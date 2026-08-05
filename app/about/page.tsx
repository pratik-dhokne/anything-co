"use client";
import Link from "next/link";
import { Handshake, Target, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Reveal } from "@/components/section";

const title = "About Anything.co — Trusted Service Marketplace";
const description =
  "Anything.co is the mediator between customers and verified service providers, built on trusted connections, transparent pricing and quality service.";

// export const Route = createFileRoute("/about")({
//   component: About,
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { property: "og:url", content: "/about" },
//     ],
//     links: [{ rel: "canonical", href: "/about" }],
//   }),
// });

const values = [
  { icon: Handshake, title: "Trust first", text: "Every partner is verified before a single request reaches them." },
  { icon: Target, title: "Transparent by default", text: "Upfront quotes, itemised invoices, no surprise charges." },
  { icon: Eye, title: "Accountable service", text: "We mediate the job end to end — not just the introduction." },
  { icon: Sparkles, title: "Quality obsessed", text: "Ratings drive visibility. Great work gets more work." },
];

const milestones = [
  ["2022", "Anything.co launches with 4 home-service categories in one city."],
  ["2023", "Verification program and escrow payments go live nationwide."],
  ["2024", "Marketplace expands to tech, events and expert services — 38 categories."],
  ["2026", "12,400+ verified partners serving 180+ cities."],
];

export default function About() {
  return (
    <>
      <section className="border-b bg-brand-soft/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">
            We're the trusted layer between you and every service provider
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            One Request. Countless Possibilities. Anything.co connects customers with verified
            businesses, professionals, technicians and freelancers — and stays involved until the
            job is done right.
          </p>
        </div>
      </section>

      <Section eyebrow="Our values" title="What we hold ourselves to">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border bg-card p-6 hover-lift">
                <v.icon className="h-6 w-6 text-primary" />
                <h2 className="mt-4 font-semibold">{v.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* <Section eyebrow="Journey" title="How we got here" className="max-w-3xl">
        <ol className="relative space-y-8 border-l pl-8">
          {milestones.map(([year, text], i) => (
            <Reveal key={year} delay={i * 0.06}>
              <li>
                <span className="absolute -left-2 grid h-4 w-4 place-items-center rounded-full gradient-brand" />
                <p className="font-display text-lg font-bold text-primary">{year}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section> */}

      {/* <Section className="max-w-4xl">
        <Reveal>
          <div className="rounded-3xl gradient-brand px-8 py-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold">Ready to raise your first request?</h2>
            <p className="mx-auto mt-3 max-w-xl opacity-90">
              Tell us what you need and get matched with verified partners in minutes.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
    

              <Button asChild size="lg" className="rounded-full">
                <Link href="/services">Browse services</Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
                <Link href="/partner">Become a partner</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section> */}
    </>
  );
}
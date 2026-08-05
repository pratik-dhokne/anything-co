
"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { BadgeCheck, Wallet, TrendingUp, Users, ShieldCheck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Section, Reveal } from "@/components/section";
import { categories } from "@/lib/services";

const title = "Become a Partner — Anything.co";
const description =
  "Join 12,400+ verified partners on Anything.co. Get qualified local leads, secure payouts and a verification badge that wins customer trust.";

// export const Route = createFileRoute("/partner")({
//   component: Partner,
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { property: "og:url", content: "/partner" },
//     ],
//     links: [{ rel: "canonical", href: "/partner" }],
//   }),
// });

const perks = [
  { icon: Users, title: "Qualified local leads", text: "Requests matched to your skills, pincode and availability." },
  { icon: Wallet, title: "Fast, secure payouts", text: "Weekly settlements with transparent commission." },
  { icon: BadgeCheck, title: "Verification badge", text: "Stand out with a verified profile customers trust." },
  { icon: TrendingUp, title: "Grow your ratings", text: "Reviews build ranking and unlock premium jobs." },
  { icon: ShieldCheck, title: "Dispute protection", text: "We mediate every disagreement fairly." },
  { icon: Headphones, title: "Partner support", text: "Dedicated team on call 7 days a week." },
];

const schema = z.object({
  business: z.string().trim().min(2, "Enter your business name").max(100),
  contact: z.string().trim().min(2, "Enter a contact name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  category: z.string().min(1, "Pick your primary category"),
  city: z.string().trim().min(2, "Enter your city").max(80),
  experience: z.string().trim().max(600).optional(),
});

export default function Partner() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { business: "", contact: "", email: "", phone: "", category: "", city: "", experience: "" },
  });

  return (
    <>
      <section className="border-b bg-brand-soft/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Grow your business with <span className="gradient-text">Anything.co</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We bring you verified customers, handle payments and mediate every job — you focus on
            doing great work.
          </p>
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4">
            {[
              ["₹48k", "Avg. monthly earnings"],
              ["72h", "Onboarding time"],
              ["0₹", "Joining fee"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-card p-4 shadow-soft">
                <p className="font-display text-2xl font-extrabold text-primary">{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Partner benefits" title="Why partners stay with us">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border bg-card p-6 hover-lift">
                <p.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Apply"
        title="Partner application"
        description="Fill this in and our onboarding team will verify your details within 72 hours."
        className="max-w-3xl"
      >
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((v) => {
                  toast.success("Application submitted", {
                    description: `Thanks ${v.contact}, our team will verify ${v.business} shortly.`,
                  });
                  form.reset();
                })}
                className="grid gap-4 sm:grid-cols-2"
              >
                {(
                  [
                    ["business", "Business / professional name", "BrightHome Care"],
                    ["contact", "Contact person", "Sneha Kulkarni"],
                    ["email", "Email", "team@brighthome.in"],
                    ["phone", "Phone", "+91 90000 00000"],
                    ["city", "City", "Pune"],
                  ] as const
                ).map(([name, label, ph]) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input placeholder={ph} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-72">
                          {categories.map((c) => (
                            <SelectItem key={c.slug} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Experience & coverage area</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Years of experience, team size, pincodes served." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="rounded-full sm:col-span-2">
                  Submit application
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Section } from "@/components/section";
import { WHATSAPP_URL } from "@/components/site-layout";

const title = "Contact Anything.co — Support & Sales";
const description =
  "Reach the Anything.co team for service help, partner onboarding or business enquiries. Email, phone or WhatsApp, 7 days a week.";

// export const Route = createFileRoute("/contact")({
//   component: Contact,
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { property: "og:url", content: "/contact" },
//     ],
//     links: [{ rel: "canonical", href: "/contact" }],
//   }),
// });

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(3, "Add a subject").max(120),
  message: z.string().trim().min(10, "Tell us more").max(1000),
});

export default function Contact() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  return (
    <>
      <section className="border-b bg-brand-soft/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Contact us</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Questions about a request, a partner or a partnership? We reply within one business day.
          </p>
        </div>
      </section>

      <Section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((v) => {
                  toast.success("Message sent", { description: `Thanks ${v.name}, we'll be in touch soon.` });
                  form.reset();
                })}
                className="grid gap-4 sm:grid-cols-2"
              >
                {(
                  [
                    ["name", "Your name", "Aarav Mehta"],
                    ["email", "Email", "you@example.com"],
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="Share the details..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="rounded-full sm:col-span-2">
                  Send message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "support.anything.co@gmail.com" },
            { icon: Phone, label: "Phone", value: "+91 8669045947" },
            { icon: MapPin, label: "Head office", value: "Sai Nagar, Amravati" },
          ].map((c) => (
            <div key={c.label} className="flex gap-3 rounded-2xl border bg-card p-5">
              <c.icon className="h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{c.label}</p>
                <p className="truncate text-sm text-muted-foreground">{c.value}</p>
              </div>
            </div>
          ))}
          <Button asChild size="lg" className="w-full rounded-full bg-success text-success-foreground hover:bg-success/90">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
            </a>
          </Button>
          <div className="overflow-hidden rounded-2xl border">
            <iframe
              title="Anything.co office location"
              src="https://www.google.com/maps?q=SaiNagar%2C%20Amravati&output=embed"
              loading="lazy"
              className="h-56 w-full border-0"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
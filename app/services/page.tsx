"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Search, MapPin, Star, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";


import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Section, Reveal } from "@/components/section";
import { ServiceIcon } from "@/components/service-icon";
import { categories, groups } from "@/lib/services";

const title = "All Services — Anything.co";
const description =
  "Browse 38 verified service categories: home repairs, cleaning, vehicles, software, events, delivery and expert professionals near you.";

// export const Route = createFileRoute("/services")({
//   component: Services,
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { property: "og:url", content: "/services" },
//     ],
//     links: [{ rel: "canonical", href: "/services" }],
//   }),
// });

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  category: z.string().min(1, "Pick a category"),
  location: z.string().trim().min(2, "Enter your location").max(80),
  details: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

function RequestForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", category: "", location: "", details: "" },
  });

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit((values) => {
        //   toast.success("Request received", {
        //     description: `We're matching verified ${values.category} partners near ${values.location}.`,
        //   });
        //   form.reset();
        // })}

        onSubmit={form.handleSubmit(async (values) => {
          try {
            await addDoc(collection(db, "service_requests"), {
              name: values.name,
              phone: values.phone,
              category: values.category,
              location: values.location,
              details: values.details,
              status: "Pending",
              createdAt: serverTimestamp(),
            });

            toast.success("Request received", {
              description: "Your request has been submitted successfully.",
            });

            form.reset();
          } catch (error) {
            console.error(error);

            toast.error("Something went wrong");
          }
        })}
        className="grid gap-4 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Aarav Mehta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+91 90000 00000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Sai Nagar, Amravati" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>What do you need?</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Describe the job, preferred time and any details." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="rounded-full sm:col-span-2">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default function Services() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("All");
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    const filtered = categories.filter(
      (c) =>
        (group === "All" || c.group === group) &&
        (c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.blurb.toLowerCase().includes(q.toLowerCase())),
    );
    return [...filtered].sort((a, b) =>
      sort === "rating" ? b.rating - a.rating : sort === "price" ? a.from - b.from : b.partners - a.partners,
    );
  }, [q, group, sort]);

  return (
    <>
      <section className="border-b bg-brand-soft/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Services</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            38 categories. Verified partners. Transparent, upfront quotes with location-based
            matching.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)_minmax(0,12rem)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search services"
                placeholder="Search services"
                className="h-12 rounded-xl bg-card pl-9"
              />
            </div>
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger className="h-12 rounded-xl bg-card" aria-label="Filter by group">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All groups</SelectItem>
                {groups.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-12 rounded-xl bg-card" aria-label="Sort">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
                <SelectItem value="price">Lowest price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Section>
        <p className="mb-6 text-sm text-muted-foreground">{list.length} services available</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i, 8) * 0.03}>
              <Card className="h-full border-0 shadow-soft hover-lift">
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary">
                      <ServiceIcon name={c.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">{c.name}</h2>
                      <p className="text-xs text-muted-foreground">{c.group}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto shrink-0 gap-1">
                      {/* <Star className="h-3 w-3 fill-accent text-accent" /> {c.rating} */}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.blurb}</p>
                  <div className="mt-auto flex items-center justify-between border-t pt-3 text-sm">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {/* <ShieldCheck className="h-3.5 w-3.5 text-success" /> {c.partners} partners */}
                    </span>
                    {/* <span className="font-semibold text-primary">from ₹{c.from}</span> */}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No services match that search.</p>
        )}
      </Section>

      <Section
        id="request"
        eyebrow="Service request"
        title="Raise one request, get matched"
        description="Tell us what you need"
        className="max-w-3xl"
      >
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Location-based matching across Amravati City
            </p>
            <RequestForm />
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
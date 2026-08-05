"use client";

import Link from "next/link";
import { BadgeCheck, Briefcase, Star, Wallet } from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardShell, StatCards } from "@/components/dashboard-shell";

const title = "Partner Dashboard — Anything.co";
const description = "Manage incoming leads, quotes, earnings and your verification status.";

// export const Route = createFileRoute("/dashboard/partner")({
//   component: PartnerDashboard,
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { property: "og:url", content: "/dashboard/partner" },
//       { name: "robots", content: "noindex" },
//     ],
//     links: [{ rel: "canonical", href: "/dashboard/partner" }],
//   }),
// });

const earnings = [
  { m: "Feb", v: 38000 }, { m: "Mar", v: 42500 }, { m: "Apr", v: 39800 },
  { m: "May", v: 51200 }, { m: "Jun", v: 47600 }, { m: "Jul", v: 58400 },
];

const leads = [
  ["#RQ-9012", "AC Repair", "Indiranagar", "Today 4:30 PM", "₹1,299"],
  ["#RQ-9008", "AC Installation", "HSR Layout", "Tomorrow 11:00 AM", "₹2,800"],
  ["#RQ-8994", "Fridge Repair", "Koramangala", "Tomorrow 3:00 PM", "₹950"],
];

export default function PartnerDashboard() {
  return (
    <DashboardShell
      role="Partner"
      title="CoolAir Experts"
      subtitle="Verified partner · AC & Appliance Repair · Bengaluru"
    >
      <StatCards
        items={[
          { icon: Briefcase, label: "Jobs this month", value: "46", hint: "+12% vs last month" },
          { icon: Wallet, label: "Earnings", value: "₹58,400" },
          { icon: Star, label: "Rating", value: "4.9" },
          { icon: BadgeCheck, label: "Verification", value: "Active" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Earnings trend</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earnings}>
                <defs>
                  <linearGradient id="pEarn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} fill="url(#pEarn)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Verification & badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              ["Identity verified", true],
              ["Skill certification", true],
              ["Background check", true],
              ["GST documents", false],
            ].map(([label, done]) => (
              <div key={label as string} className="flex items-center justify-between rounded-xl border p-3">
                <span>{label}</span>
                <Badge className={done ? "bg-success text-success-foreground" : "bg-accent text-accent-foreground"}>
                  {done ? "Verified" : "Pending"}
                </Badge>
              </div>
            ))}
            <Button className="w-full rounded-full">Upload documents</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Incoming leads</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead className="text-right">Quote</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map(([id, s, area, slot, price]) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{id}</TableCell>
                  <TableCell>{s}</TableCell>
                  <TableCell>{area}</TableCell>
                  <TableCell>{slot}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
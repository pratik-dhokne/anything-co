import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function DashboardShell({
  role,
  title,
  subtitle,
  children,
}: {
  role: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <Badge variant="secondary" className="mb-2">
            {role}
          </Badge>
          <h1 className="truncate text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </header>
      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}

export function StatCards({
  items,
}: {
  items: Array<{ icon: LucideIcon; label: string; value: string; hint?: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <Card key={s.label} className="border-0 shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="truncate text-xs font-medium uppercase tracking-wide">{s.label}</span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold">{s.value}</p>
            {s.hint && <p className="mt-1 text-xs text-success">{s.hint}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
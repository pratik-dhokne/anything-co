"use client";
import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, MessageCircle, Infinity as InfinityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  // { to: "/partner", label: "Become a Partner" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const dashboards = [
  // { to: "/dashboard/customer", label: "Customer" },
  // { to: "/dashboard/partner", label: "Partner" },
  { to: "/login", label: "Admin" },
];

export const WHATSAPP_URL = "https://wa.me/8669045947?text=Hi%20Anything.co%2C%20I%20need%20a%20service";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("anything-theme");
    const isDark = stored ? stored === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("anything-theme", next ? "dark" : "light");
      }}
    >
      {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-display", className)}>
      <Image
        src="/logo.jpeg"
        alt="Anything.co logo"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-glow"
      />
      <span className="text-lg font-extrabold tracking-tight">
        Anything<span className="text-primary">.co</span>
      </span>
    </Link>
  );
}

function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled ? "surface-glass shadow-soft" : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-brand-soft hover:text-primary",
                  path === item.to && "bg-brand-soft text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Admin Login</Link>
          </Button>
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <Link href="/services#request">Request a service</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <div className="mt-8 flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <Link key={item.to} href={item.to} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted">
                    {item.label}
                  </Link>
                ))}
                <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Dashboards
                </p>
                {dashboards.map((item) => (
                  <Link key={item.to} href={item.to} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted">
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 rounded-full">
                  <Link href="/login">Log in / Sign up</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              One Request. Countless Possibilities. The trusted mediator between customers and
              verified service providers across India.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {nav.map((i) => (
                <li key={i.to}>
                  <Link href={i.to} className="hover:text-primary">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Dashboards</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {dashboards.map((i) => (
                <li key={i.to}>
                  <Link href={i.to} className="hover:text-primary">
                    {i.label} dashboard
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Get in touch</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>support.anythingco@gmail.com</li>
              <li>instagram.com/theanything.co</li>
              <li>+91 8669045947</li>
              <li>Mon–Sun, 7am–11pm</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Anything.co. All rights reserved.</p>
          <p>Verified partners</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noreferrer"
  className="inline-flex w-full items-center justify-center rounded-full bg-green-600 px-6 py-3 text-white hover:bg-green-700"
>
  <MessageCircle className="mr-2 h-4 w-4" />
  Chat on WhatsApp
</a>
    </div>
  );
}

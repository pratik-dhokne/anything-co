import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  id,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20", className)}>
      {(eyebrow || title) && (
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          {eyebrow && (
            <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {eyebrow}
            </span>
          )}
          {title && <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>}
          {description && <p className="mt-3 text-muted-foreground">{description}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
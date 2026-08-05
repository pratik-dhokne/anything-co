"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Logo } from "@/components/site-layout";
import { useRouter } from "next/navigation";

const title = "Log in or Sign up — Anything.co";
const description =
  "Access your Anything.co account to raise requests, compare quotes, track partners and manage payments.";

// export const Route = createFileRoute("/login")({
//   component: LoginPage,
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { property: "og:url", content: "/login" },
//       { name: "robots", content: "noindex" },
//     ],
//     links: [{ rel: "canonical", href: "/login" }],
//   }),
// });

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(72),
});

const signupSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
});

export default function Login() {
  const router = useRouter();
  const login = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const signup = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", phone: "", email: "", password: "" },
  });

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <Logo />
      <h1 className="mt-6 text-center text-3xl font-bold">Welcome back, Admin</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        One account for requests, quotes, tracking and payments.
      </p>

      <Card className="mt-8 w-full border-0 shadow-soft">
        <CardContent className="p-6">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="pt-6">
              <Form {...login}>
                <form
                  onSubmit={login.handleSubmit((values) => {
                    if (
                      values.email === "admin@gmail.com" &&
                      values.password === "admin123"
                    ) {
                      toast.success("Welcome Admin!");
                      router.push("/dashboard/admin");
                    } else {
                      toast.error("Invalid Admin Email or Password");
                    }
                  })}
                  className="space-y-4"
                >
                  {(
                    [
                      ["email", "Email", "you@example.com", "email"],
                      ["password", "Password", "••••••••", "password"],
                    ] as const
                  ).map(([name, label, ph, type]) => (
                    <FormField
                      key={name}
                      control={login.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input type={type} placeholder={ph} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button type="submit" className="w-full rounded-full" size="lg">
                    Log in
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* <TabsContent value="signup" className="pt-6">
              <Form {...signup}>
                <form
                  onSubmit={signup.handleSubmit(() => {
                    toast.success("Account created");
                    router.push("/dashboard/customer");
                  })}
                  className="space-y-4"
                >
                  {(
                    [
                      ["name", "Full name", "Aarav Mehta", "text"],
                      ["phone", "Phone", "+91 90000 00000", "tel"],
                      ["email", "Email", "you@example.com", "email"],
                      ["password", "Password", "At least 8 characters", "password"],
                    ] as const
                  ).map(([name, label, ph, type]) => (
                    <FormField
                      key={name}
                      control={signup.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input type={type} placeholder={ph} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button type="submit" className="w-full rounded-full" size="lg">
                    Create account
                  </Button>
                </form>
              </Form>
            </TabsContent> */}
          </Tabs>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> Protected by verified-partner
            policies and secure payments
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
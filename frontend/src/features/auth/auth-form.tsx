"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api";
import { loginSchema, registerSchema } from "@/lib/validation";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "@/stores/toast-store";

type Mode = "login" | "register";
type FormValues = { name: string; email: string; password: string; confirmPassword: string };

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const schema = mode === "login" ? loginSchema : registerSchema;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) as Resolver<FormValues>, defaultValues: { name: "", email: "", password: "", confirmPassword: "" } });
  const isLogin = mode === "login";

  async function onSubmit(values: FormValues) {
    try {
      const session = isLogin
        ? await authService.login(values)
        : await authService.register(values);
      setSession(session);
      toast.success(isLogin ? "Welcome back." : "Your account is ready.");
      router.replace("/dashboard");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    {!isLogin && <Field label="Full name" error={errors.name?.message}><Input autoComplete="name" placeholder="Alex Morgan" {...register("name")} /></Field>}
    <Field label="Email address" error={errors.email?.message}><Input type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} /></Field>
    <Field label="Password" error={errors.password?.message}><Input type="password" autoComplete={isLogin ? "current-password" : "new-password"} placeholder="At least 8 characters" {...register("password")} /></Field>
    {!isLogin && <Field label="Confirm password" error={errors.confirmPassword?.message}><Input type="password" autoComplete="new-password" placeholder="Repeat your password" {...register("confirmPassword")} /></Field>}
    <Button className="w-full" type="submit" loading={isSubmitting}>{isLogin ? "Sign in" : "Create account"}</Button>
    <p className="text-center text-sm text-muted-foreground">{isLogin ? "New here?" : "Already have an account?"} <Link className="font-semibold text-primary hover:underline" href={isLogin ? "/register" : "/login"}>{isLogin ? "Create an account" : "Sign in"}</Link></p>
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="block space-y-1.5"><span className="text-sm font-medium">{label}</span>{children}{error && <span role="alert" className="block text-xs text-danger">{error}</span>}</label>;
}

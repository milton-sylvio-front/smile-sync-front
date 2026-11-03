"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button/Button";
import type { LoginContent } from "@/modules/login/types/login";

type LoginFormProps = {
  content: LoginContent;
};

type FieldErrors = {
  email?: string;
  password?: string;
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10.5" width="14" height="9" rx="2" />
      <path strokeLinecap="round" d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const fieldClassName =
  "h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/15";

export function LoginForm({ content }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = "Informe o endereço de e-mail.";
    } else if (!isEmail(trimmedEmail)) {
      nextErrors.email = "Informe um e-mail válido.";
    }

    if (!password) {
      nextErrors.password = "Informe a senha.";
    }

    setErrors(nextErrors);
  }

  return (
    <form className="flex flex-col" noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          {content.email.label}
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <MailIcon />
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={content.email.placeholder}
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-erro" : undefined}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
          />
        </div>
        {errors.email ? (
          <p id="email-erro" className="mt-1.5 text-sm text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label htmlFor="senha" className="text-sm font-medium text-ink">
            {content.password.label}
          </label>
          <Link
            href={content.forgotPassword.href}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            {content.forgotPassword.label}
          </Link>
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <LockIcon />
          </span>
          <input
            id="senha"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={content.password.placeholder}
            value={password}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "senha-erro" : undefined}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClassName}
          />
        </div>
        {errors.password ? (
          <p id="senha-erro" className="mt-1.5 text-sm text-red-700">
            {errors.password}
          </p>
        ) : null}
      </div>

      <label className="mt-4 flex w-fit items-center gap-2 text-sm text-ink/80">
        <input
          type="checkbox"
          name="remember"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 accent-primary"
        />
        {content.rememberLabel}
      </label>

      <Button type="submit" size="lg" fullWidth className="mt-5">
        {content.submitLabel}
      </Button>
    </form>
  );
}

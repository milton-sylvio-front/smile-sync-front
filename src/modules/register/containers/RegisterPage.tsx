import Link from "next/link";
import { Logotype } from "@/components/logotype/Logotype";
import { RegisterForm } from "@/modules/register/components/RegisterForm";
import type { RegisterContent } from "@/modules/register/types/register";

type RegisterPageProps = {
  content: RegisterContent;
};

export function RegisterPage({ content }: RegisterPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4 py-12">
      <div className="flex w-full max-w-[520px] flex-col items-center">
        <Logotype name={content.brandName} />
        <h1 className="mt-8 text-center text-[1.7rem] font-bold tracking-tight text-ink">
          {content.title}
        </h1>
        <p className="mt-2 text-balance text-center text-sm text-slate-500">
          {content.subtitle}
        </p>

        <section className="mt-8 w-full rounded-2xl border border-slate-200/80 bg-white px-6 py-7 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] sm:px-8">
          <RegisterForm content={content} />
          <p className="mt-5 text-center text-sm text-slate-500">
            {content.loginPrompt}{" "}
            <Link
              href={content.login.href}
              className="whitespace-nowrap font-semibold text-primary hover:underline"
            >
              {content.login.label}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

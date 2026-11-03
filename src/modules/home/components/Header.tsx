"use client";

import { useState } from "react";
import Link from "next/link";
import { Logotype } from "@/components/logotype/Logotype";
import type { NavLink } from "@/types/home";

type HeaderProps = {
  brandName: string;
  navigation: NavLink[];
  login: NavLink;
  trial: NavLink;
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

function NavLinks({
  navigation,
  login,
  trial,
  onNavigate,
}: {
  navigation: NavLink[];
  login: NavLink;
  trial: NavLink;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navigation.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={onNavigate}
          className="text-sm font-medium text-ink/80 transition-colors hover:text-primary"
        >
          {item.label}
        </a>
      ))}
      <Link
        href={login.href}
        onClick={onNavigate}
        className="text-sm font-semibold text-ink transition-colors hover:text-primary"
      >
        {login.label}
      </Link>
      <a
        href={trial.href}
        onClick={onNavigate}
        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        {trial.label}
      </a>
    </>
  );
}

export function Header({ brandName, navigation, login, trial }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logotype name={brandName} />
        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          <NavLinks navigation={navigation} login={login} trial={trial} />
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <MenuIcon open={open} />
        </button>
      </div>
      {open ? (
        <nav
          id="menu-movel"
          aria-label="Menu móvel"
          className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 lg:hidden"
        >
          <NavLinks
            navigation={navigation}
            login={login}
            trial={trial}
            onNavigate={() => setOpen(false)}
          />
        </nav>
      ) : null}
    </header>
  );
}

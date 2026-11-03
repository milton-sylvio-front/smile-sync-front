"use client";

import Link from "next/link";
import { Button } from "@/components/button/Button";

export type EmptyDataContent = {
  title: string;
  description: string;
  clearFiltersLabel: string;
  addRecord: {
    label: string;
    href: string;
  };
  tip: string;
};

type EmptyDataProps = {
  content: EmptyDataContent;
  onClearFilters?: () => void;
};

function EmptyDataMark() {
  return (
    <div className="relative mx-auto h-36 w-36" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[#eef2f5]" />
      <svg
        viewBox="0 0 72 58"
        className="absolute left-1/2 top-1/2 h-[4.25rem] w-[4.25rem] -translate-x-[58%] -translate-y-[52%]"
      >
        <path
          fill="#d5dee6"
          d="M8 16.2A7 7 0 0 1 15 9.2h13.2c1.3 0 2.6.6 3.4 1.5l2.3 2.7c.5.5 1.1.8 1.8.8H57a7 7 0 0 1 7 7v22.6a7 7 0 0 1-7 7H15a7 7 0 0 1-7-7V16.2Z"
        />
        <path
          fill="#c3cfd8"
          d="M8 24.4A6 6 0 0 1 14 18.4h44a6 6 0 0 1 6 6v19.4a7 7 0 0 1-7 7H15a7 7 0 0 1-7-7V24.4Z"
        />
      </svg>
      <span className="absolute bottom-[1.35rem] right-[1.15rem] flex h-8 w-8 items-center justify-center rounded-full bg-secondary shadow-[0_4px_10px_-4px_rgba(6,52,59,0.45)]">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
        >
          <circle cx="10.5" cy="10.5" r="5.25" />
          <path strokeLinecap="round" d="m14.6 14.6 3.6 3.6" />
        </svg>
      </span>
    </div>
  );
}

export function EmptyData({ content, onClearFilters }: EmptyDataProps) {
  return (
    <section className="flex flex-col items-center px-6 py-16 text-center">
      <EmptyDataMark />
      <h2 className="mt-8 text-lg font-bold tracking-tight text-primary">
        {content.title}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-[#8b97a3]">
        {content.description}
      </p>
      <Button
        fullWidth
        onClick={onClearFilters}
        className="mt-8 max-w-[17.5rem]"
      >
        {content.clearFiltersLabel}
      </Button>
      <Link
        href={content.addRecord.href}
        className="mt-5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {content.addRecord.label}
      </Link>
      <p className="mt-10 flex max-w-lg items-center gap-2 text-[11px] leading-4 text-[#9aa6ae]">
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 shrink-0 rounded-[2px] bg-secondary"
        />
        {content.tip}
      </p>
    </section>
  );
}

"use client";

type PreviousPageButtonProps = {
  label: string;
};

export function PreviousPageButton({ label }: PreviousPageButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex w-full items-center justify-center rounded-xl border-2 border-primary bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {label}
    </button>
  );
}

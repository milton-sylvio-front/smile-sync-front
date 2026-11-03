"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/button/Button";
import type { LegalDocument } from "@/modules/register/types/register";

type LegalModalProps = {
  document: LegalDocument;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function LegalModal({ document, onClose }: LegalModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="documento-titulo"
        className="relative flex max-h-[min(40rem,calc(100vh-2rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.55)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 id="documento-titulo" className="text-lg font-bold tracking-tight text-ink">
              {document.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">Atualizado em {document.updatedAt}</p>
          </div>
          <Button
            ref={closeRef}
            variant="ghost"
            size="icon"
            aria-label="Fechar"
            onClick={onClose}
            className="!h-9 !w-9 shrink-0 !text-slate-500 hover:!bg-slate-100 hover:!text-ink"
          >
            <CloseIcon />
          </Button>
        </header>
        <div className="overflow-y-auto px-6 py-5">
          {document.sections.map((section) => (
            <section key={section.heading} className="mt-5 first:mt-0">
              <h3 className="text-sm font-semibold text-ink">{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-sm leading-6 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

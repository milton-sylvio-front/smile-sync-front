import { Logotype } from "@/components/logotype/Logotype";
import type { HomeContent, SocialLink } from "@/modules/home/types/home";

type FooterProps = {
  brandName: string;
  description: string;
  footer: HomeContent["footer"];
};

function SocialIcon({ id }: { id: SocialLink["id"] }) {
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M14.2 8.5V6.8c0-.7.5-1 1.1-1h1.5V3h-2.2C11.8 3 11 4.6 11 6.6v1.9H9v2.8h2V21h3.2v-9.7h2.2l.3-2.8h-2.5Z" />
      </svg>
    );
  }

  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M6.5 9.5H4V20h2.5V9.5ZM5.2 4A1.5 1.5 0 1 0 5.2 7a1.5 1.5 0 0 0 0-3ZM10 9.5h2.4v1.4h.1c.3-.6 1.2-1.6 2.8-1.6 3 0 3.6 2 3.6 4.5V20H16.4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H10V9.5Z" />
    </svg>
  );
}

export function Footer({ brandName, description, footer }: FooterProps) {
  return (
    <footer className="bg-footer text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logotype name={brandName} tone="inverse" />
          <p className="mt-4 max-w-xs text-sm leading-6">{description}</p>
        </div>
        {footer.columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors hover:text-secondary">
                    {link.label}
                  </a>
                </li>
              ))}
              {column.title === "Contato" ? (
                <li>
                  <a href={footer.phone.href} className="text-sm transition-colors hover:text-secondary">
                    {footer.phone.label}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs">{footer.copyright}</p>
          <ul className="flex gap-3">
            {footer.social.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-secondary hover:text-secondary"
                >
                  <SocialIcon id={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

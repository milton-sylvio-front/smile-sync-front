import type { FeatureIconName } from "@/types/home";

type FeatureIconProps = {
  name: FeatureIconName;
};

const paths: Record<FeatureIconName, string> = {
  whatsapp:
    "M12 4.2a7.3 7.3 0 0 0-6.3 10.9L4.8 19.6l4.6-1.2A7.3 7.3 0 1 0 12 4.2Zm3.6 9.6c-.2.5-.9.9-1.2.9-.3 0-.7.1-1.2-.1-.3-.1-.6-.3-1.1-.5-1.7-.8-2.8-2.5-2.9-2.6-.1-.2-.7-.9-.7-1.7s.4-1.2.6-1.4c.1-.1.3-.3.5-.3h.3c.1 0 .3 0 .4.3.1.4.5 1.1.5 1.2 0 .1 0 .3-.1.4l-.3.4c-.1.1-.2.2-.1.4.1.3.6.9 1.2 1.5.7.6 1.3.8 1.5.9.2.1.4 0 .5-.1l.6-.7c.1-.2.3-.1.5-.1l1.2.6c.2.1.4.2.4.4.1.3 0 .7-.2 1Z",
  records:
    "M7 3.5h7.2L18.5 8v12.2a1.3 1.3 0 0 1-1.3 1.3H7A1.3 1.3 0 0 1 5.7 20.2V4.8A1.3 1.3 0 0 1 7 3.5Zm6.6 1.2v3.6h3.5M8.2 12.2h7.6M8.2 15.4h7.6M8.2 18.4h4.6",
  reactivation:
    "M12 4.2a7.8 7.8 0 1 1-6.7 3.8M5 4.5v4h4M12 8.2v4.2l2.8 1.6",
  finance:
    "M5 16.5 9.2 12l3 2.6L19 8.2M14.5 8.2H19V12.5",
  security:
    "M12 3.4 18.5 6v5.2c0 4-2.7 7.2-6.5 8.4-3.8-1.2-6.5-4.4-6.5-8.4V6L12 3.4Z M12 8.2v4.2",
  support:
    "M5.2 13.2a6.8 6.8 0 0 1 13.6 0M6.2 13.2v2.4a1.6 1.6 0 0 0 1.6 1.6h.8v-5.6h-.8a1.6 1.6 0 0 0-1.6 1.6Zm11.6 0v2.4a1.6 1.6 0 0 1-1.6 1.6h-.8v-5.6h.8a1.6 1.6 0 0 1 1.6 1.6ZM10 18.8h2.4a1.4 1.4 0 0 0 1.4-1.4v-.2",
};

export function FeatureIcon({ name }: FeatureIconProps) {
  const filled = name === "whatsapp";

  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/70 text-primary">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={filled ? undefined : 1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={paths[name]} />
      </svg>
    </span>
  );
}

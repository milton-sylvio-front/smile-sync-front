export type NavLink = {
  label: string;
  href: string;
};

export type FeatureIconName =
  | "whatsapp"
  | "records"
  | "reactivation"
  | "finance"
  | "security"
  | "support";

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: FeatureIconName;
};

export type Stat = {
  value: string;
  label: string;
};

export type ClinicAvatar = {
  name: string;
  initials: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
};

export type DashboardSegment = {
  label: string;
  value: number;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type SocialLink = {
  id: "facebook" | "instagram" | "linkedin";
  label: string;
  href: string;
};

export type HomeContent = {
  brand: {
    name: string;
    description: string;
  };
  navigation: NavLink[];
  login: NavLink;
  trial: NavLink;
  hero: {
    title: string;
    description: string;
    primaryAction: NavLink;
    secondaryAction: NavLink;
    trustLabel: string;
    clinics: ClinicAvatar[];
  };
  dashboard: {
    title: string;
    badge: string;
    metrics: DashboardMetric[];
    bars: number[];
    segments: DashboardSegment[];
  };
  features: {
    id: string;
    title: string;
    subtitle: string;
    items: Feature[];
  };
  solutions: {
    id: string;
    stats: Stat[];
  };
  pricing: {
    id: string;
    trialId: string;
    title: string;
    description: string;
    primaryAction: NavLink;
    secondaryAction: NavLink;
    note: string;
  };
  footer: {
    columns: FooterColumn[];
    phone: NavLink;
    social: SocialLink[];
    copyright: string;
  };
};

export type LoginLink = {
  label: string;
  href: string;
};

export type LoginContent = {
  brandName: string;
  title: string;
  subtitle: string;
  email: {
    label: string;
    placeholder: string;
  };
  password: {
    label: string;
    placeholder: string;
  };
  forgotPassword: LoginLink;
  rememberLabel: string;
  submitLabel: string;
  registerPrompt: string;
  register: LoginLink;
  copyright: string;
  securityNote: string;
};

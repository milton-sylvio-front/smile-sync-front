import type { LoginContent } from "@/modules/login/types/login";

export const loginContent: LoginContent = {
  brandName: "SmileSync",
  title: "Bem-vindo de volta",
  subtitle: "Insira suas credenciais para acessar sua clínica",
  email: {
    label: "Endereço de E-mail",
    placeholder: "doutor.silva@exemplo.com",
  },
  password: {
    label: "Senha",
    placeholder: "••••••••",
  },
  forgotPassword: {
    label: "Esqueceu a senha?",
    href: "/recuperar-senha",
  },
  rememberLabel: "Lembrar de mim",
  submitLabel: "Entrar",
  registerPrompt: "Ainda não tem uma conta?",
  register: {
    label: "Criar uma conta",
    href: "/cadastre-se",
  },
  copyright: "© 2024 SmileSync Dental Solutions.",
  securityNote: "Acesso seguro gerenciado por criptografia de 256 bits.",
};

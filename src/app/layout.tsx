import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmileSync | Gestão odontológica com inteligência",
  description:
    "Sistema de gestão para clínicas odontológicas. Automatize agendamentos, digitalize prontuários e reative pacientes com IA.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-ink">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

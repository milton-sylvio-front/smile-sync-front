import type { Metadata } from "next";
import { RegisterPage } from "@/modules/register/containers/RegisterPage";
import { registerContent } from "@/mocks/register";

export const metadata: Metadata = {
  title: "Cadastre-se | SmileSync",
  description: "Crie sua conta clínica e junte-se aos profissionais da odontologia no SmileSync.",
};

export default function Register() {
  return <RegisterPage content={registerContent} />;
}

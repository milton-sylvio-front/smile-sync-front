import { fireEvent, render, screen } from "@testing-library/react";
import { RegisterPage } from "@/modules/register/containers/RegisterPage";
import { registerContent } from "@/mocks/register";

function renderRegister() {
  return render(<RegisterPage content={registerContent} />);
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(registerContent.fullName.label), {
    target: { value: "Dra. Joana Silva" },
  });
  fireEvent.change(screen.getByLabelText(registerContent.birthDate.label), {
    target: { value: "12/04/1990" },
  });
  fireEvent.change(screen.getByLabelText(registerContent.document.label), {
    target: { value: "12345678901" },
  });
  fireEvent.change(screen.getByLabelText(registerContent.phone.label), {
    target: { value: "5511900000000" },
  });
  fireEvent.change(screen.getByLabelText(registerContent.email.label), {
    target: { value: "joana@clinica.com" },
  });
  fireEvent.change(screen.getByLabelText(registerContent.password.label), {
    target: { value: "senha-forte" },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("RegisterPage", () => {
  it("mostra o cadastro da conta clínica com os textos do mock", () => {
    renderRegister();

    expect(screen.getByRole("heading", { name: registerContent.title })).toBeInTheDocument();
    expect(screen.getByText(registerContent.subtitle)).toBeInTheDocument();
    expect(screen.getByLabelText(registerContent.fullName.label)).toHaveAttribute(
      "placeholder",
      registerContent.fullName.placeholder,
    );
    expect(screen.getByLabelText(registerContent.document.label)).toHaveAttribute(
      "placeholder",
      registerContent.document.placeholder,
    );
    expect(screen.getByLabelText(registerContent.password.label)).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.queryByText("Foto de Perfil")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: registerContent.terms.label })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: registerContent.privacy.label })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: registerContent.login.label })).toHaveAttribute(
      "href",
      registerContent.login.href,
    );
    expect(screen.getByRole("button", { name: registerContent.submitLabel })).toBeInTheDocument();
  });

  it("pede os dados obrigatórios antes de criar a conta", () => {
    renderRegister();

    fireEvent.click(screen.getByRole("button", { name: registerContent.submitLabel }));

    expect(screen.getByText("Informe o nome completo.")).toBeInTheDocument();
    expect(screen.getByText("Informe a data de nascimento.")).toBeInTheDocument();
    expect(screen.getByText("Informe o CPF ou CNPJ.")).toBeInTheDocument();
    expect(screen.getByText("Informe o celular.")).toBeInTheDocument();
    expect(screen.getByText("Informe o endereço de e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Crie uma senha.")).toBeInTheDocument();
    expect(screen.getByText("Aceite os termos para criar a conta.")).toBeInTheDocument();
  });

  it("aceita o cadastro quando os dados e os termos estão válidos", () => {
    renderRegister();
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: registerContent.submitLabel }));

    expect(screen.getByLabelText(registerContent.birthDate.label)).toHaveValue("12/04/1990");
    expect(screen.getByLabelText(registerContent.document.label)).toHaveValue("123.456.789-01");
    expect(screen.getByLabelText(registerContent.phone.label)).toHaveValue("+55 (11) 90000-0000");
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.queryByText("Informe o nome completo.")).not.toBeInTheDocument();
    expect(screen.queryByText("Aceite os termos para criar a conta.")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: registerContent.title })).toBeInTheDocument();
  });

  it("abre os termos e a política em modais separados", () => {
    renderRegister();

    fireEvent.click(screen.getByRole("button", { name: registerContent.terms.label }));

    expect(screen.getByRole("dialog", { name: registerContent.terms.title })).toBeInTheDocument();
    expect(screen.getByText(registerContent.terms.sections[0].heading)).toBeInTheDocument();
    expect(screen.queryByText(registerContent.privacy.sections[0].heading)).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: registerContent.privacy.label }));

    expect(screen.getByRole("dialog", { name: registerContent.privacy.title })).toBeInTheDocument();
    expect(screen.getByText(registerContent.privacy.sections[0].heading)).toBeInTheDocument();
    expect(screen.queryByText(registerContent.terms.sections[0].heading)).not.toBeInTheDocument();
  });
});

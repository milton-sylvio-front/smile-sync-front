import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RegisterPage } from "@/modules/register/containers/RegisterPage";
import { registerContent } from "@/mocks/register";

function renderRegister() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RegisterPage content={registerContent} />
    </QueryClientProvider>,
  );
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(registerContent.clinicName.label), {
    target: { value: "Clínica Sorriso" },
  });
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
    target: { value: "Senha-forte-12!" },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

function mockSuccessfulRegistration() {
  return jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({
      accessToken: "access-token",
      user: {
        id: "user-id",
        clinicId: "clinic-id",
        name: "Dra. Joana Silva",
        email: "joana@clinica.com",
        role: "OWNER",
      },
    }),
  } as Response);
}

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

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
    expect(screen.getByRole("button", { name: "Regras da senha" })).toHaveAttribute(
      "aria-expanded",
      "false",
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
    expect(screen.getByText("Informe o nome da clínica.")).toBeInTheDocument();
    expect(screen.getByText("Informe a data de nascimento.")).toBeInTheDocument();
    expect(screen.getByText("Informe o CPF ou CNPJ.")).toBeInTheDocument();
    expect(screen.getByText("Informe o celular.")).toBeInTheDocument();
    expect(screen.getByText("Informe o endereço de e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Crie uma senha.")).toBeInTheDocument();
    expect(screen.getByText("Aceite os termos para criar a conta.")).toBeInTheDocument();
  });

  it("cria a conta com os dados do endpoint público quando os dados e os termos estão válidos", async () => {
    const fetchMock = mockSuccessfulRegistration();
    renderRegister();
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: registerContent.submitLabel }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:3333/api/auth/register",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clinicName: "Clínica Sorriso",
            name: "Dra. Joana Silva",
            email: "joana@clinica.com",
            password: "Senha-forte-12!",
          }),
        }),
      );
    });

    expect(screen.getByLabelText(registerContent.birthDate.label)).toHaveValue("12/04/1990");
    expect(screen.getByLabelText(registerContent.document.label)).toHaveValue("123.456.789-01");
    expect(screen.getByLabelText(registerContent.phone.label)).toHaveValue("+55 (11) 90000-0000");
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.queryByText("Informe o nome completo.")).not.toBeInTheDocument();
    expect(screen.queryByText("Aceite os termos para criar a conta.")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: registerContent.title })).toBeInTheDocument();
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Conta criada com sucesso. Você já pode fazer login.",
    );
  });

  it("aceita uma senha válida com exatamente 8 caracteres", async () => {
    const fetchMock = mockSuccessfulRegistration();
    renderRegister();
    fillValidForm();
    fireEvent.change(screen.getByLabelText(registerContent.password.label), {
      target: { value: "Aa1!bcde" },
    });

    fireEvent.click(screen.getByRole("button", { name: registerContent.submitLabel }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:3333/api/auth/register",
        expect.objectContaining({
          body: expect.stringContaining('"password":"Aa1!bcde"'),
        }),
      );
    });
  });

  it("mostra a mensagem de erro retornada pela API", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ error: "E-mail já cadastrado." }),
    } as Response);
    renderRegister();
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: registerContent.submitLabel }));

    expect(await screen.findByRole("alert")).toHaveTextContent("E-mail já cadastrado.");
  });

  it.each([
    ["curta", "Ab1!xyz"],
    ["letra maiúscula", "senha123!"],
    ["número", "SenhaForte!"],
    ["caractere especial", "SenhaForte12"],
  ])("exige senha com %s", (_rule, password) => {
    renderRegister();
    fillValidForm();
    fireEvent.change(screen.getByLabelText(registerContent.password.label), {
      target: { value: password },
    });

    fireEvent.click(screen.getByRole("button", { name: registerContent.submitLabel }));

    expect(
      screen.getByText(
        "Use pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.",
      ),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("permite mostrar e ocultar a senha", () => {
    renderRegister();
    const passwordInput = screen.getByLabelText(registerContent.password.label);

    fireEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar senha" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("mostra as regras da senha ao ativar o ícone de informação", () => {
    renderRegister();
    const rulesButton = screen.getByRole("button", { name: "Regras da senha" });

    fireEvent.click(rulesButton);

    expect(rulesButton).toHaveAttribute("aria-expanded", "true");
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent("A senha deve conter");
    expect(tooltip).toHaveTextContent("No mínimo 8 caracteres");
    expect(tooltip).toHaveTextContent("Pelo menos 1 letra maiúscula");
    expect(tooltip).toHaveTextContent("Pelo menos 1 número");
    expect(tooltip).toHaveTextContent("Pelo menos 1 caractere especial");
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

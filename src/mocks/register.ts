import type { RegisterContent } from "@/modules/register/types/register";

export const registerContent: RegisterContent = {
  brandName: "SmileSync",
  title: "Crie sua conta clínica",
  subtitle: "Junte-se a milhares de profissionais da odontologia hoje mesmo",
  fullName: {
    label: "Nome Completo",
    placeholder: "Dra. Joana Silva",
  },
  birthDate: {
    label: "Data de Nascimento",
    placeholder: "dd/mm/aaaa",
  },
  document: {
    label: "CPF / CNPJ",
    placeholder: "000.000.000-00",
  },
  phone: {
    label: "Celular (WhatsApp)",
    placeholder: "+55 (11) 90000-0000",
  },
  email: {
    label: "E-mail Profissional",
    placeholder: "joana@clinica.com",
  },
  password: {
    label: "Senha",
    placeholder: "Crie uma senha forte",
  },
  termsLabel: "Eu concordo com os",
  terms: {
    label: "Termos de Serviço",
    title: "Termos de Serviço",
    updatedAt: "3 de novembro de 2026",
    sections: [
      {
        heading: "1. Aceitação",
        paragraphs: [
          "Estes Termos de Serviço regulam o uso da plataforma SmileSync, da SmileSync Dental Solutions, por clínicas e profissionais da odontologia.",
          "Ao criar uma conta, você confirma que leu estes termos e a Política de Privacidade e que tem poderes para contratar em nome da clínica.",
        ],
      },
      {
        heading: "2. O serviço",
        paragraphs: [
          "O SmileSync é um sistema de gestão para clínicas odontológicas. Ele ajuda a organizar agenda, prontuários, comunicação com pacientes, rotinas financeiras e recursos de apoio com inteligência artificial.",
          "O software não substitui o julgamento clínico, o prontuário oficial exigido pelo conselho de classe nem o dever de sigilo do profissional.",
        ],
      },
      {
        heading: "3. Conta da clínica",
        paragraphs: [
          "A conta é pessoal da clínica contratante. Você deve informar dados verdadeiros e manter e-mail, celular e senha atualizados.",
          "A senha é de uso restrito. A clínica responde pelos acessos feitos com suas credenciais e deve avisar a SmileSync se suspeitar de uso indevido.",
        ],
      },
      {
        heading: "4. Uso permitido",
        paragraphs: [
          "A clínica pode usar o SmileSync para a gestão do próprio consultório e para o atendimento dos seus pacientes.",
          "É vedado usar a plataforma para fins ilícitos, compartilhar acesso com terceiros não autorizados, tentar invadir o sistema ou inserir conteúdo que viole direitos de pacientes e de outras pessoas.",
        ],
      },
      {
        heading: "5. Dados dos pacientes",
        paragraphs: [
          "Os prontuários e demais dados de pacientes inseridos na plataforma pertencem à clínica. A clínica é a controladora desses dados e deve obter as autorizações exigidas pela legislação, inclusive a LGPD.",
          "A SmileSync trata esses dados como operadora, apenas para prestar o serviço contratado, manter a segurança da plataforma e cumprir obrigação legal.",
        ],
      },
      {
        heading: "6. Planos e teste",
        paragraphs: [
          "Funcionalidades, limites e preços são os divulgados no momento da contratação. Um período de teste, quando oferecido, pode ser encerrado ao término do prazo informado, sem cobrança se nenhum plano pago for confirmado.",
          "A falta de pagamento de um plano pago pode suspender o acesso até a regularização, sem apagar imediatamente os dados da clínica.",
        ],
      },
      {
        heading: "7. Propriedade intelectual",
        paragraphs: [
          "A marca SmileSync, a interface, o código e os materiais da plataforma pertencem à SmileSync Dental Solutions. A contratação concede uma licença limitada, não exclusiva e intransferível de uso durante a vigência da conta.",
        ],
      },
      {
        heading: "8. Disponibilidade e responsabilidade",
        paragraphs: [
          "Buscamos manter o serviço disponível e seguro, mas interrupções podem ocorrer por manutenção, falha de rede ou evento fora do nosso controle.",
          "Na medida permitida pela lei, a SmileSync não responde por decisões clínicas, por danos indiretos nem por prejuízos decorrentes de senha compartilhada, dados inseridos de forma incorreta ou uso fora destas regras.",
        ],
      },
      {
        heading: "9. Encerramento e contato",
        paragraphs: [
          "A clínica pode encerrar a conta a qualquer momento. A SmileSync pode suspender ou encerrar o acesso em caso de violação destes termos ou de risco à segurança dos dados.",
          "Dúvidas sobre estes termos podem ser enviadas para contato@smilesync.com.br.",
        ],
      },
    ],
  },
  termsConjunction: "e a",
  privacy: {
    label: "Política de Privacidade",
    title: "Política de Privacidade",
    updatedAt: "3 de novembro de 2026",
    sections: [
      {
        heading: "1. Quem somos",
        paragraphs: [
          "A SmileSync Dental Solutions é a responsável por esta política e pelo tratamento dos dados pessoais coletados na criação e no uso da conta da plataforma SmileSync.",
          "Quando a clínica registra dados dos próprios pacientes, a clínica é a controladora e a SmileSync atua como operadora, tratando essas informações para prestar o serviço contratado.",
        ],
      },
      {
        heading: "2. Dados que coletamos",
        paragraphs: [
          "No cadastro, coletamos nome, data de nascimento, CPF ou CNPJ, celular de WhatsApp, e-mail profissional e senha. A senha é armazenada de forma protegida e não fica visível para a nossa equipe.",
          "Durante o uso, também podemos registrar dados técnicos de acesso, como data, endereço IP e registros necessários para segurança, suporte e melhoria do serviço.",
        ],
      },
      {
        heading: "3. Para que usamos os dados",
        paragraphs: [
          "Usamos os dados da conta para criar e autenticar o acesso, enviar comunicações sobre o serviço, prestar suporte e cumprir obrigações legais.",
          "Dados de pacientes inseridos pela clínica são usados somente para disponibilizar as funções contratadas, como agenda, prontuário, lembretes e relatórios, e para manter a segurança da plataforma.",
        ],
      },
      {
        heading: "4. Bases legais",
        paragraphs: [
          "O tratamento se apoia na execução do contrato, no legítimo interesse de proteger a plataforma e, quando exigido, no consentimento ou em obrigação legal.",
          "Dados de saúde de pacientes são tratados para a tutela da saúde, por procedimentos realizados por profissionais da área, e mediante as garantias da LGPD.",
        ],
      },
      {
        heading: "5. Compartilhamento e retenção",
        paragraphs: [
          "Não vendemos dados pessoais. Podemos compartilhá-los com provedores que hospedam o sistema ou enviam mensagens, sempre sob contrato e apenas para operar o SmileSync, ou quando uma autoridade exigir por lei.",
          "Mantemos os dados da conta enquanto ela existir e pelo prazo necessário para obrigações legais, defesa de direitos e segurança. Após o encerramento, os dados são eliminados ou anonimizados quando já não forem necessários.",
        ],
      },
      {
        heading: "6. Segurança e direitos",
        paragraphs: [
          "Adotamos criptografia, controle de acesso e cópias de segurança para proteger as informações. Nenhum sistema é livre de risco, e a clínica também deve proteger as senhas da equipe.",
          "Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade, eliminação e informação sobre compartilhamentos, além de revogar um consentimento quando ele for a base do tratamento.",
          "Pedidos e dúvidas sobre privacidade podem ser enviados para privacidade@smilesync.com.br. Esta política pode ser atualizada, e a data no topo indica a versão vigente.",
        ],
      },
    ],
  },
  submitLabel: "Criar Conta",
  loginPrompt: "Já tem uma conta?",
  login: {
    label: "Faça login agora",
    href: "/entrar",
  },
};

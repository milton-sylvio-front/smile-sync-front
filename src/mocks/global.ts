export type GlobalContent = {
  copyright: string
  securityNote: string
}

export const globalContent: GlobalContent = {
  copyright: `${new Date().getFullYear()} ® SmileSync Dental Solutions. Todos os direitos reservados.`,
  securityNote: 'Acesso seguro gerenciado por criptografia de 256 bits.',
}

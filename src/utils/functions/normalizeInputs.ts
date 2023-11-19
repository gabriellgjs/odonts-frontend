export const normalizeCPF = (cpf: string | undefined) => {
  if (!cpf) return ''

  return cpf
    .replace(/[\D]/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(\d{2})/, '$1')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

export const normalizePISPASEP = (pispasep: string | undefined) => {
  if (!pispasep) return ''

  const regex = /(\d{3}.)(\d{3}.d{3})(-d{2})/
  return pispasep
    .replace(/[\D]/g, '')
    .replace(regex, '$1.$2')
    .replace(/(\d{5})(\d)/, '$1.$2')
    .replace(/(\d{2}) /, '$1.$2_$3')
}

export const normalizePhoneNumber = (telephoneNumber: string | undefined) => {
  if (!telephoneNumber) return ''

  return telephoneNumber
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}

export const normalizeDate = (date: string | undefined) => {
  if (!date) return ''

  return date
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
}

export const normalizeCEP = (date: string | undefined) => {
  if (!date) return ''

  return date.replace(/[\D]/g, '').replace(/(\d{5})(\d)/, '$1-$2')
}

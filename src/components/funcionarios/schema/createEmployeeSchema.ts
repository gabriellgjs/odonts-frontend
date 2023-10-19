import regexDate from '@/utils/regex/regexDate'
import RegexName from '@/utils/regex/regexName'
import regexTelephone from '@/utils/regex/regexTelephone'
import * as z from 'zod'

export const CreateEmployeeSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .trim()
    .min(1, 'Nome é obrigatório')
    .regex(RegexName, 'Nome só pode conter letras'),
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .trim()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  birthDate: z
    .string({
      required_error: 'Data de nascimento é obrigatória',
    })
    .min(1, 'Data de nascimento é obrigatória')
    .regex(regexDate, 'Data inválida'),
  rg: z
    .string({
      required_error: 'RG é obrigatório',
    })
    .trim()
    .min(1, 'RG é obrigatório')
    .max(12, 'RG não pode ter mais de 12 caracteres'),
  cpf: z
    .string({
      required_error: 'CPF é obrigatório',
    })
    .trim()
    .min(1, 'CPF é obrigatório')
    .max(14, 'CPF não pode ter mais de 14 caracteres'),
  gender: z.string({
    required_error: 'Gênero é obrigatório',
  }),
  roleId: z.string({
    required_error: 'Cargo é obrigatório',
  }),
  hireDate: z
    .string({
      required_error: 'Data de admissão é obrigatória',
    })
    .min(1, 'Data de Admissão é obrigatória')
    .regex(regexDate, 'Data inválida'),
  street: z.string({
    required_error: 'Rua é obrigatório',
  }),
  number: z.string({
    required_error: 'Número é obrigatório',
  }),
  district: z.string({
    required_error: 'Bairro é obrigatório',
  }),
  city: z.string({
    required_error: 'Cidade é obrigatório',
  }),
  postalCode: z
    .string({
      required_error: 'CEP é obrigatório',
    })
    .min(1, 'CEP é obrigatório')
    .max(9, 'CEP deve ter 8 caracteres'),
  state: z.string({
    required_error: 'Estado é obrigatório',
  }),
  telephoneNumber: z
    .string({
      required_error: 'Telefone é obrigatório',
    })
    .regex(regexTelephone, 'Telefone inválido'),
  maritalStatus: z.string({
    required_error: 'Estado civil é obrigatório',
  }),
})

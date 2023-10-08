import RegexName from '@/utils/regex/regexName'
import RegexRG from '@/utils/regex/regexRg'
import regexTelephone from '@/utils/regex/regexTelephone'
import * as z from 'zod'

export const CreateEmployeeSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .regex(RegexName, 'Nome só pode ter letras e acentuações'),
  // birth_date: z.string({
  //   required_error: 'Data de aniversario é obrigatória',
  // }),
  // rg: z
  //   .string({
  //     required_error: 'RG é obrigatório',
  //   })
  //   .max(15, 'RG não pode ter mais de 15 caracteres')
  //   .regex(RegexRG, 'RG só pode conter números ou letras'),
  // cpf: z.string({
  //   required_error: 'CPF é obrigatório',
  // }),
  // gender: z.string({
  //   required_error: 'Gênero é obrigatório',
  // }),
  // street: z.string({
  //   required_error: 'Rua é obrigatório',
  // }),
  // number: z.string({
  //   required_error: 'Número é obrigatório',
  // }),
  // district: z.string({
  //   required_error: 'Bairro é obrigatório',
  // }),
  // city: z.string({
  //   required_error: 'Cidade é obrigatório',
  // }),
  // postalCode: z
  //   .string({
  //     required_error: 'CEP é obrigatório',
  //   })
  //   .min(8, 'CEP deve ter 8 caracteres')
  //   .max(8, 'CEP deve ter 8 caracteres'),
  // state: z.string({
  //   required_error: 'Estado é obrigatório',
  // }),
  // telephoneNumber: z
  //   .string({
  //     required_error: 'Celular é obrigatório',
  //   })
  //   .regex(regexTelephone, 'Telefone inválido'),
  // marital_status: z.string({
  //   required_error: 'Estado civil é obrigatório',
  // }),
})

export type createEmployeeFormData = z.infer<typeof CreateEmployeeSchema>

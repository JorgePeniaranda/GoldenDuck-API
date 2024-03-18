import { ValidationDictionary } from '@/messages/validations'
import { IntSchema } from '@/valueObjects/number/Int/Int.schema'
import { type ZodNumber } from 'zod'

export const CVVSchema = (name: string): ZodNumber => {
  return IntSchema(name)
    .min(100, {
      message: ValidationDictionary.global.invalidMin(name, 100)
    })
    .max(999, {
      message: ValidationDictionary.global.invalidMax(name, 999)
    })
}

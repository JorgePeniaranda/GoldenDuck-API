import { ValidationDictionary } from '@/messages/validations'
import { type ZodBigInt, z } from 'zod'

export const NegativeBigIntSchema = (name: string): ZodBigInt => {
  return z
    .bigint({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .nonpositive({ message: ValidationDictionary.global.nonPositive(name) })
}

import { ValidationDictionary } from '@/messages/validations'
import { ValidBigIntSchema } from '@/valueObjects/number/BigInt/BigInt.schema'
import { type ZodType } from 'zod'

export const DNISchema = (name: string): ZodType => {
  return ValidBigIntSchema(name)
    .min(10000000n, { message: ValidationDictionary.global.invalidMin(name, 10000000n) })
    .max(99999999n, { message: ValidationDictionary.global.invalidMax(name, 99999999n) })
}

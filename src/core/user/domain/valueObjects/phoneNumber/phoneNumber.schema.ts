import { ValidationDictionary } from '@/messages/validations'
import { ValidBigIntSchema } from '@/valueObjects/number/BigInt/BigInt.schema'
import { type ZodType } from 'zod'

export const PhoneNumberSchema = (name: string): ZodType => {
  return ValidBigIntSchema(name)
    .min(1000000000n, { message: ValidationDictionary.global.invalidMin(name, 1000000000n) })
    .max(9999999999n, { message: ValidationDictionary.global.invalidMin(name, 9999999999n) })
}

import { ValidationDictionary } from '@/messages/validations'
import { ValidBigIntSchema } from '@/valueObjects/number/BigInt/BigInt.schema'
import { type ZodBigInt } from 'zod'

export const CardNumberSchema = (name: string): ZodBigInt => {
  return ValidBigIntSchema(name)
    .min(1000000000000000n, {
      message: ValidationDictionary.global.invalidMin(name, 1000000000000000n)
    })
    .max(9999999999999999n, {
      message: ValidationDictionary.global.invalidMax(name, 9999999999999999n)
    })
}

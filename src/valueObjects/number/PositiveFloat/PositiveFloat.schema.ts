import { ValidationDictionary } from '@/messages/validations'
import { type ZodNumber } from 'zod'
import { FloatSchema } from '../Float/Float.schema'

export const PositiveFloatSchema = (name: string): ZodNumber => {
  return FloatSchema(name).nonnegative({
    message: ValidationDictionary.global.nonNegative(name)
  })
}

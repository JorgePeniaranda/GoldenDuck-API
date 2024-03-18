import { ValidationDictionary } from '@/messages/validations'
import { type ZodNumber } from 'zod'
import { FloatSchema } from '../Float/Float.schema'

export const NegativeFloatSchema = (name: string): ZodNumber => {
  return FloatSchema(name).nonpositive({
    message: ValidationDictionary.global.nonPositive(name)
  })
}

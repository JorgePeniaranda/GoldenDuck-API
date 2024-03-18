import { ValidationDictionary } from '@/messages/validations'
import { type ZodType } from 'zod'
import { ValidDateSchema } from '../ValidDate/ValidDate.schema'

export const PastDateSchema = (name: string): ZodType => {
  return ValidDateSchema(name).refine(
    (date) => {
      return date <= new Date()
    },
    {
      message: ValidationDictionary.global.pastDate(name)
    }
  )
}

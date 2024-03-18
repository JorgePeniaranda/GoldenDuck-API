import { ValidationDictionary } from '@/messages/validations'
import { PastDateSchema } from '@/valueObjects/date/PastDate/PastDate.schema'
import { type ZodType } from 'zod'

export const BirthDateSchema = (name: string): ZodType => {
  return PastDateSchema(name).refine(
    (date) => {
      const now = new Date()
      const minAge = 18
      const minDate = new Date(
        now.getFullYear() - minAge,
        now.getMonth(),
        now.getDate()
      )
      return date <= minDate
    },
    { message: ValidationDictionary.birthDate.invalidAge }
  )
}

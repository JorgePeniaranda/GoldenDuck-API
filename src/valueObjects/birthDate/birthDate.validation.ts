import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const BirthDateValidation = z.coerce
  .date({
    required_error: ValidationDictionary.birthDate.required,
    invalid_type_error: ValidationDictionary.birthDate.invalidType
  })
  .refine(
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

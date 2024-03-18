import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedValidDate = z.coerce.date({
  required_error: ValidationDictionary.futureDate.required,
  invalid_type_error: ValidationDictionary.futureDate.invalidType
})

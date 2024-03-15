import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedID = z.coerce
  .number({
    required_error: ValidationDictionary.id.required,
    invalid_type_error: ValidationDictionary.id.invalidType
  })
  .nonnegative({
    message: ValidationDictionary.id.nonNegative
  })

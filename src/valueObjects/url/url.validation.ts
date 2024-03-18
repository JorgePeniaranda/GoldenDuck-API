import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedURL = z
  .string({
    required_error: ValidationDictionary.url.required,
    invalid_type_error: ValidationDictionary.url.invalidType
  })
  .url({
    message: ValidationDictionary.url.invalidType
  })
  .min(1, {
    message: ValidationDictionary.url.required
  })

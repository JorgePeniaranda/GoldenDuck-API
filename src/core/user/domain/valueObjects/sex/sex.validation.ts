import { ValidationDictionary } from '../../../../../messages/validations'
import { z } from 'zod'

export const SexValidation = z.enum(['MALE', 'FEMALE'], {
  required_error: ValidationDictionary.sex.required,
  invalid_type_error: ValidationDictionary.sex.invalidType
})

import { ValidationDictionary } from '../../../../../messages/validations'
import { z } from 'zod'

export const DNIValidation = z.coerce
  .number({
    required_error: ValidationDictionary.dni.required,
    invalid_type_error: ValidationDictionary.dni.invalidType
  })
  .min(1, { message: ValidationDictionary.dni.required })
  .min(10000000, { message: ValidationDictionary.dni.length })
  .max(99999999, { message: ValidationDictionary.dni.length })

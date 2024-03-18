import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const DNIValidation = z
  .bigint({
    required_error: ValidationDictionary.dni.required,
    invalid_type_error: ValidationDictionary.dni.invalidType
  })
  .min(1n, { message: ValidationDictionary.dni.required })
  .min(10000000n, { message: ValidationDictionary.dni.length })
  .max(99999999n, { message: ValidationDictionary.dni.length })

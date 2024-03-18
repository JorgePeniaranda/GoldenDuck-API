import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedURL = z
  .number({
    required_error: ValidationDictionary.float.required,
    invalid_type_error: ValidationDictionary.float.invalidType
  })
  .nonnegative({ message: ValidationDictionary.float.nonnegative })
  .finite({ message: ValidationDictionary.float.finite })

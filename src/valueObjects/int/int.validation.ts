import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedINT = z
  .number({
    required_error: ValidationDictionary.number.required,
    invalid_type_error: ValidationDictionary.number.invalidType
  })
  .nonnegative({ message: ValidationDictionary.number.nonnegative })
  .int({ message: ValidationDictionary.number.integer })
  .finite({ message: ValidationDictionary.number.finite })

import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedValidBigInt = z
  .bigint({
    required_error: ValidationDictionary.number.required,
    invalid_type_error: ValidationDictionary.number.invalidType
  })
  .nonnegative({ message: ValidationDictionary.number.nonnegative })

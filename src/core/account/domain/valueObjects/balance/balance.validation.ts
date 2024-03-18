import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const balanceValidation = z
  .number({
    required_error: ValidationDictionary.balance.required,
    invalid_type_error: ValidationDictionary.balance.invalidType
  })
  .nonnegative({
    message: ValidationDictionary.balance.negative
  })

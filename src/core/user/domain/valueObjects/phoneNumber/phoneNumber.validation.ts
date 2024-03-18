import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const PhoneNumberValidation = z
  .bigint({
    required_error: ValidationDictionary.phoneNumber.required,
    invalid_type_error: ValidationDictionary.phoneNumber.invalidType
  })
  .min(1n, { message: ValidationDictionary.phoneNumber.required })
  .min(1000000000n, {
    message: ValidationDictionary.phoneNumber.length
  })
  .max(9999999999n, {
    message: ValidationDictionary.phoneNumber.length
  })

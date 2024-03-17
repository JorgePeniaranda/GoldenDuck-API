import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const PhoneNumberValidation = z.coerce
  .number({
    required_error: ValidationDictionary.phoneNumber.required,
    invalid_type_error: ValidationDictionary.phoneNumber.invalidType
  })
  .min(1, { message: ValidationDictionary.phoneNumber.required })
  .min(1000000000, {
    message: ValidationDictionary.phoneNumber.length
  })
  .max(9999999999, {
    message: ValidationDictionary.phoneNumber.length
  })

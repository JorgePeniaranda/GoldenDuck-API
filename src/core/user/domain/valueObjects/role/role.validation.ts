import ValidationDictionary from '../../../../../messages/validations'
import { z } from 'zod'

export const RoleValidation = z.enum(['ADMIN', 'SUPPORT', 'USER'], {
  required_error: ValidationDictionary.role.required,
  invalid_type_error: ValidationDictionary.role.invalidType
})

import { type ID } from '@/valueObjects/id/id.value'
import { type Role } from '@/valueObjects/role/role.value'

export interface TokenEntity {
  id: ID
  key: string
  role: Role
  body: object
  type: TokenType
  tokenExpiration?: TokenExpiration
}

export enum TokenType {
  API,
  EMAIL,
}

export enum TokenExpiration {
  LONG = '5d',
  TEMPORARY = '15m',
  SHORT = '5m',
}

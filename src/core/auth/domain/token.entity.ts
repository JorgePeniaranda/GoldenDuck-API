import { type PrimitiveRole } from '@/valueObjects/enum/Role/Role.primitive'
import { type Role } from '@/valueObjects/enum/Role/Role.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

export interface TokenEntity {
  id: ID
  key: string
  role: Role
  body: object
  type: TokenType
  tokenExpiration?: TokenExpiration
}

export interface TokenPrimitiveEntity {
  id: PrimitiveID['id']
  key: string
  role: PrimitiveRole['role']
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

import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type PrimitiveRole } from '@/valueObjects/role/role.primitive'
import { type Role } from '@/valueObjects/role/role.value'

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

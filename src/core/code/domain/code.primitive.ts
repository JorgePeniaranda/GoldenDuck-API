import { type Code } from '@prisma/client'

export interface CodePrimitive {
  readonly id: Code['id']
  readonly idUser: Code['idUser']
  readonly code: Code['code']
  readonly type: (typeof CodeType)[keyof typeof CodeType]
  readonly expiredAt: Code['expiredAt']
  updatedAt: Code['updatedAt']
  readonly createdAt: Code['createdAt']
  expired: Code['expired']
}

export const CodeType = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE'
} as const

export interface CodePayloadPrimitive {
  readonly code: CodePrimitive['id']
}

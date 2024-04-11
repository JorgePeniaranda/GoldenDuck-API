import { ApiProperty } from '@nestjs/swagger'
import { type AccountPrimitive } from '../domain/account.primitive'

export class AccountResponse implements AccountPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    id: AccountPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idUser: AccountPrimitive['idUser']

  /* ---------- BALANCE ---------- */
  balance: AccountPrimitive['balance']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    updatedAt: AccountPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    createdAt: AccountPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
    deleted: boolean

  constructor (account: AccountPrimitive) {
    this.id = account.id
    this.idUser = account.idUser
    this.balance = account.balance
    this.updatedAt = account.updatedAt
    this.createdAt = account.createdAt
    this.deleted = account.deleted
  }
}

import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'
import { type PayloadPrimitive } from '../domain/primitive/payload.primitive'
import { UserRoles } from '@/core/user/domain/user.primitive'

export class JWTResponse {
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsString()
  @Expose()
  readonly id: PayloadPrimitive['id']

  @ApiProperty({
    example: UserRoles.USER,
    enum: UserRoles,
    type: String
  })
  @IsString()
  @Expose()
  readonly role: PayloadPrimitive['role']
}

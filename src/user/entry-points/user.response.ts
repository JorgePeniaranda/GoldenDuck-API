import { ApiProperty } from '@nestjs/swagger'
import { type UserPrimitive } from '../domain/user.primitive'

export class UserResponse {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  readonly id: UserPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 'John',
    type: String
  })
    name: UserPrimitive['name']

  /* ---------- LAST NAME ---------- */
  @ApiProperty({
    example: 'Doe',
    type: String
  })
    lastName: UserPrimitive['lastName']

  /* ---------- DNI ---------- */
  @ApiProperty({
    example: 12345678,
    type: BigInt
  })
  readonly dni: UserPrimitive['dni']

  /* ---------- EMAIL ---------- */
  @ApiProperty({
    example: 'test@email.com',
    type: String
  })
    email: UserPrimitive['email']

  /* ---------- PHONE NUMBER ---------- */
  @ApiProperty({
    example: 1234567890,
    type: BigInt
  })
    phoneNumber: UserPrimitive['phoneNumber']

  /* ---------- PASSWORD ---------- */
  @ApiProperty({
    example: '¿¡TEST123test!?',
    type: String
  })
  @ApiProperty()
    password: UserPrimitive['password']

  /* ---------- ADDRESS ---------- */
  @ApiProperty({
    example: 'Test Street 123',
    type: String
  })
    address: UserPrimitive['address']

  /* ---------- BIRTH DATE ---------- */
  @ApiProperty({
    example: new Date('2000-01-01'),
    type: Date
  })
  readonly birthDate: UserPrimitive['birthDate']

  /* ---------- SEX ---------- */
  @ApiProperty({
    example: 'MALE',
    type: Date
  })
  readonly sex: UserPrimitive['sex']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  readonly updatedAt: UserPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  readonly createdAt: UserPrimitive['createdAt']

  /* ---------- ACTIVED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
    actived: UserPrimitive['actived']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: false,
    type: Boolean
  })
    deleted: UserPrimitive['deleted']

  /* ---------- ROLE ---------- */
  @ApiProperty({
    example: 'USER',
    type: String
  })
    role: UserPrimitive['role']

  constructor (user: UserPrimitive) {
    this.id = user.id
    this.name = user.name
    this.lastName = user.lastName
    this.dni = user.dni
    this.email = user.email
    this.phoneNumber = user.phoneNumber
    this.password = user.password
    this.address = user.address
    this.birthDate = user.birthDate
    this.sex = user.sex
    this.updatedAt = user.updatedAt
    this.createdAt = user.createdAt
    this.actived = user.actived
    this.deleted = user.deleted
    this.role = user.role
  }
}

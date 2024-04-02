import { ApiProperty } from '@nestjs/swagger'
import { IsAlpha, IsAlphanumeric, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, IsStrongPassword, Max, MaxDate, Min } from 'class-validator'
import { type UserPrimitive } from './user.primitive'

export class UserDTO implements UserPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: UserPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 'John',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
    name: UserPrimitive['name']

  /* ---------- LAST NAME ---------- */
  @ApiProperty({
    example: 'Doe',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
    lastName: UserPrimitive['lastName']

  /* ---------- DNI ---------- */
  @ApiProperty({
    example: 12345678,
    type: BigInt
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(10000000)
  @Max(99999999)
    dni: UserPrimitive['dni']

  /* ---------- EMAIL ---------- */
  @ApiProperty({
    example: 'test@email.com',
    type: String
  })
  @IsString()
  @IsEmail()
    email: UserPrimitive['email']

  /* ---------- PHONE NUMBER ---------- */
  @ApiProperty({
    example: 1234567890,
    type: BigInt
  })
  @IsNumber()
  @Min(1000000000)
  @Max(9999999999)
    phoneNumber: UserPrimitive['phoneNumber']

  /* ---------- PASSWORD ---------- */
  @ApiProperty({
    example: '@oZ5d%^*wU92',
    type: String
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
    password: UserPrimitive['password']

  /* ---------- SALT ---------- */
  @IsString()
    salt: string

  /* ---------- ADDRESS ---------- */
  @ApiProperty({
    example: 'Test Street 123',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
    address: UserPrimitive['address']

  /* ---------- BIRTH DATE ---------- */
  @ApiProperty({
    example: new Date('2000-01-01'),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18))) // 18 years old
    birthDate: UserPrimitive['birthDate']

  /* ---------- SEX ---------- */
  @ApiProperty({
    example: 'MALE',
    type: Date
  })
  @IsString()
    sex: UserPrimitive['sex']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    updatedAt: UserPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: UserPrimitive['createdAt']

  /* ---------- ACTIVED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    actived: UserPrimitive['actived']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: false,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    deleted: UserPrimitive['deleted']

  /* ---------- ROLE ---------- */
  @ApiProperty({
    example: 'USER',
    type: String
  })
  @IsString()
    role: UserPrimitive['role']

  constructor (user: UserPrimitive) {
    this.id = user.id
    this.name = user.name
    this.lastName = user.lastName
    this.dni = user.dni
    this.email = user.email
    this.phoneNumber = user.phoneNumber
    this.password = user.password
    this.salt = user.salt
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

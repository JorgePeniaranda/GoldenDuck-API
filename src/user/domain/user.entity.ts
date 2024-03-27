import { ApiProperty } from '@nestjs/swagger'
import bcrypt from 'bcryptjs'
import { IsAlpha, IsAlphanumeric, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Max, MaxDate, Min } from 'class-validator'
import { type UserPrimitive } from './user.primitive'

export class User {
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber()
  readonly id: UserPrimitive['id']

  @ApiProperty({
    example: 'John',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
    name: UserPrimitive['name']

  @ApiProperty({
    example: 'Doe',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
    lastName: UserPrimitive['lastName']

  @ApiProperty({
    example: 12345678,
    type: BigInt
  })
  @IsNumber()
  @Min(10000000)
  @Max(99999999)
  readonly dni: UserPrimitive['dni']

  @ApiProperty({
    example: 'test@email.com',
    type: String
  })
  @IsString()
  @IsEmail()
    email: UserPrimitive['email']

  @ApiProperty({
    example: 1234567890,
    type: BigInt
  })
  @IsNumber()
  @Min(1000000000)
  @Max(9999999999)
    phoneNumber: UserPrimitive['phoneNumber']

  @ApiProperty({
    example: '¿¡TEST123test!?',
    type: String
  })
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
    password: UserPrimitive['password']

  @IsString()
  private salt: UserPrimitive['salt']

  @ApiProperty({
    example: 'Test Street 123',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
    address: UserPrimitive['address']

  @ApiProperty({
    example: new Date('2000-01-01'),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18))) // 18 years old
  readonly birthDate: UserPrimitive['birthDate']

  @ApiProperty({
    example: 'MALE',
    type: Date
  })
  @IsString()
  readonly sex: UserPrimitive['sex']

  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  readonly updatedAt: UserPrimitive['updatedAt']

  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  readonly createdAt: UserPrimitive['createdAt']

  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    actived: UserPrimitive['actived']

  @ApiProperty({
    example: false,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    deleted: UserPrimitive['deleted']

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

  get Password (): UserPrimitive['password'] {
    return this.password
  }

  set Password (password: UserPrimitive['password']) {
    const generatedSalt = bcrypt.genSaltSync(10)

    this.salt = generatedSalt
    this.password = bcrypt.hashSync(password, generatedSalt)
  }

  public toJSON (): UserPrimitive {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      dni: this.dni,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      salt: this.salt,
      address: this.address,
      birthDate: this.birthDate,
      sex: this.sex,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      actived: this.actived,
      deleted: this.deleted,
      role: this.role
    }
  }
}

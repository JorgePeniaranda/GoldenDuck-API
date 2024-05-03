import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsAlpha,
  IsAlphanumeric,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
  IsUrl,
  Max,
  MaxDate,
  MaxLength,
  Min
} from 'class-validator'
import { UserRoles, UserSex, type UserPrimitive } from './user.primitive'

@InputType()
export class UserDTO implements UserPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => ID)
    id: UserPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 'John',
    type: String
  })
  @IsAlpha()
  @MaxLength(255)
  @Field(() => String)
    name: UserPrimitive['name']

  /* ---------- LAST NAME ---------- */
  @ApiProperty({
    example: 'Doe',
    type: String
  })
  @IsAlpha()
  @MaxLength(255)
  @Field(() => String)
    lastName: UserPrimitive['lastName']

  /* ---------- DNI ---------- */
  @ApiProperty({
    example: 12345678,
    type: BigInt
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(10000000)
  @Max(99999999)
  @Field(() => String)
    dni: UserPrimitive['dni']

  /* ---------- EMAIL ---------- */
  @ApiProperty({
    example: 'test@email.com',
    type: String
  })
  @IsEmail()
  @MaxLength(320)
  @Field(() => String)
    email: UserPrimitive['email']

  /* ---------- PHONE NUMBER ---------- */
  @ApiProperty({
    example: 1234567890,
    type: BigInt
  })
  @IsNumber()
  @Min(1000000000)
  @Max(9999999999)
  @Field(() => String)
    phoneNumber: UserPrimitive['phoneNumber']

  /* ---------- PASSWORD ---------- */
  @ApiHideProperty()
  @MaxLength(72)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  @Field(() => String)
    password: UserPrimitive['password']

  /* ---------- SALT ---------- */
  @IsString()
  @MaxLength(32)
    salt: string

  /* ---------- ADDRESS ---------- */
  @ApiProperty({
    example: 'Test Street 123',
    type: String
  })
  @IsAlphanumeric()
  @MaxLength(255)
  @Field(() => String)
    address: UserPrimitive['address']

  /* ---------- BIRTH DATE ---------- */
  @ApiProperty({
    example: new Date('2000-01-01'),
    type: Date
  })
  @IsDateString({})
  // @MaxDate(moment().subtract(18, 'years').toDate())
  @Field(() => Date)
    birthDate: UserPrimitive['birthDate']

  /* ---------- SEX ---------- */
  @ApiProperty({
    example: 'MALE',
    type: String
  })
  @IsString()
  @IsEnum(UserSex)
  @Field(() => String)
    sex: UserPrimitive['sex']

  /* ---------- IMAGE URL ---------- */
  @ApiPropertyOptional({
    example: 'https://clipart-library.com/data_images/6103.png',
    type: String
  })
  @IsUrl()
  @IsOptional()
  @Field(() => String)
  @MaxLength(255)
    imgUrl?: UserPrimitive['imgUrl']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    updatedAt: UserPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    createdAt: UserPrimitive['createdAt']

  /* ---------- ACTIVED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    actived: UserPrimitive['actived']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: false,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    deleted: UserPrimitive['deleted']

  /* ---------- ROLE ---------- */
  @ApiProperty({
    enum: UserRoles,
    example: 'USER'
  })
  @IsString()
  @IsEnum(UserRoles)
  @Field(() => String)
    role: UserPrimitive['role']
}

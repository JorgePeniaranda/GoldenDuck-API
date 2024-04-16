import { faker } from '@faker-js/faker'
import { $Enums, type PrismaClient, type User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaUser implements PrismaWithoutID<User> {
  readonly name: User['name']
  readonly lastName: User['lastName']
  readonly dni: User['dni']
  readonly email: User['email']
  readonly phoneNumber: User['phoneNumber']
  readonly password: User['password']
  readonly salt: User['salt']
  readonly address: User['address']
  readonly birthDate: User['birthDate']
  readonly sex: User['sex']
  readonly imgUrl: User['imgUrl']
  readonly updatedAt: User['updatedAt']
  readonly createdAt: User['createdAt']
  readonly actived: User['actived']
  readonly deleted: User['deleted']
  readonly role: User['role']

  constructor(user: PrismaWithoutID<User>) {
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
    this.imgUrl = user.imgUrl
    this.updatedAt = user.updatedAt
    this.createdAt = user.createdAt
    this.actived = user.actived
    this.deleted = user.deleted
    this.role = user.role
  }

  public static generate(): PrismaUser {
    const createdAt = faker.date.past()
    const actived = faker.datatype.boolean({ probability: PrismaParams.USER_ACTIVE_PROBABILITY })
    const deleted = faker.datatype.boolean({ probability: PrismaParams.USER_DELETED_PROBABILITY })
    const updatedAt = faker.date.between({
      from: createdAt,
      to: new Date()
    })
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(
      PrismaParams.USER_DEFAULT_PASSWORD ?? faker.internet.password(),
      salt
    )

    return new PrismaUser({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dni: faker.number.bigInt({
        min: PrismaParams.USER_DNI_MIN,
        max: PrismaParams.USER_DNI_MAX
      }),
      email: faker.internet.email(),
      phoneNumber: faker.number.bigInt({
        min: PrismaParams.USER_PHONE_MIN,
        max: PrismaParams.USER_PHONE_MAX
      }),
      password,
      salt,
      address: faker.location.streetAddress(),
      birthDate: faker.date.birthdate(),
      sex: faker.helpers.enumValue($Enums.sex),
      imgUrl: faker.image.avatar(),
      updatedAt,
      createdAt,
      actived,
      deleted,
      role: faker.helpers.enumValue($Enums.role)
    })
  }

  public static async insert({
    prisma,
    amount
  }: {
    prisma: PrismaClient
    amount: number
  }): Promise<User[]> {
    const users = [] as User[]
    for (let i = 0; i < amount; i++) {
      users.push(
        await prisma.user.create({
          data: PrismaUser.generate()
        })
      )
    }

    return users
  }
}

import { ID } from '@/valueObjects/number/ID/ID.value'
import { type UserPrimitiveEntity, type UserEntity } from './user.entity'
import { Name } from './valueObjects/name/name.value'
import { LastName } from './valueObjects/lastName/LastName.value'
import { DNI } from './valueObjects/dni/Dni.value'
import { Email } from '@/valueObjects/string/email/email.value'
import { PhoneNumber } from './valueObjects/phoneNumber/phoneNumber.value'
import { Password } from '@/valueObjects/string/password/password.value'
import { Address } from './valueObjects/address/Address.value'
import { BirthDate } from './valueObjects/birthDate/BirthDate.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { Role } from '@/valueObjects/enum/Role/Role.value'
import { Sex } from '@/valueObjects/enum/Sex/Sex.value'

export class User implements UserEntity {
  public readonly id: UserEntity['id']
  public name: UserEntity['name']
  public lastName: UserEntity['lastName']
  public dni: UserEntity['dni']
  public email: UserEntity['email']
  public phoneNumber: UserEntity['phoneNumber']
  public password: UserEntity['password']
  public address: UserEntity['address']
  public birthDate: UserEntity['birthDate']
  public sex: UserEntity['sex']
  public updatedAt: UserEntity['updatedAt']
  public readonly createdAt: UserEntity['createdAt']
  public deleted: UserEntity['deleted']
  public role: UserEntity['role']

  constructor (user: UserEntity) {
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
    this.deleted = user.deleted
    this.role = user.role
  }

  public static create (user: UserPrimitiveEntity): User {
    const createdUser = new User({
      id: new ID(user.id),
      name: new Name(user.name),
      lastName: new LastName(user.lastName),
      dni: new DNI(user.dni),
      email: new Email(user.email),
      phoneNumber: new PhoneNumber(user.phoneNumber),
      password: new Password(user.password),
      address: new Address(user.address),
      birthDate: new BirthDate(user.birthDate),
      sex: new Sex(user.sex),
      updatedAt: new PastDate(user.updatedAt),
      createdAt: new PastDate(user.createdAt),
      deleted: user.deleted,
      role: new Role(user.role)
    })

    return createdUser
  }

  public toJSON (): UserPrimitiveEntity {
    return {
      id: this.id.value,
      name: this.name.value,
      lastName: this.lastName.value,
      dni: this.dni.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      password: this.password.value,
      address: this.address.value,
      birthDate: this.birthDate.value,
      sex: this.sex.value,
      updatedAt: this.updatedAt.value,
      createdAt: this.createdAt.value,
      deleted: this.deleted,
      role: this.role.value
    }
  }
}

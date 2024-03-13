import { ValidDate } from '.././../../valueObjects/date/validDate.value'
import { type UserPrimitiveEntity, type UserEntity } from './user.entity'
import { UserAddress } from './valueObjects/address/address.value'
import { UserBirthDate } from './valueObjects/birthDate/birthDate.value'
import { UserDNI } from './valueObjects/dni/dni.value'
import { UserEmail } from './valueObjects/email/email.value'
import { UserLastName } from './valueObjects/lastName/lastName.value'
import { UserName } from './valueObjects/name/name.value'
import { UserPassword } from './valueObjects/password/password.value'
import { UserPhoneNumber } from './valueObjects/phoneNumber/phoneNumber.value'
import { UserRole } from './valueObjects/role/role.value'
import { UserSex } from './valueObjects/sex/sex.value'
import { ID } from '.././../../valueObjects/id/id.value'

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
  public createdAt: UserEntity['createdAt']
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
      name: new UserName(user.name),
      lastName: new UserLastName(user.lastName),
      dni: new UserDNI(user.dni),
      email: new UserEmail(user.email),
      phoneNumber: new UserPhoneNumber(user.phoneNumber),
      password: new UserPassword(user.password),
      address: new UserAddress(user.address),
      birthDate: new UserBirthDate(user.birthDate),
      sex: new UserSex(user.sex),
      updatedAt: new ValidDate(user.updatedAt),
      createdAt: new ValidDate(user.createdAt),
      deleted: user.deleted,
      role: new UserRole(user.role)
    })

    return createdUser
  }

  public toJSON (): UserPrimitiveEntity {
    return {
      id: this.id.value(),
      name: this.name.value(),
      lastName: this.lastName.value(),
      dni: this.dni.value(),
      email: this.email.value(),
      phoneNumber: this.phoneNumber.value(),
      password: this.password.value(),
      address: this.address.value(),
      birthDate: this.birthDate.value(),
      sex: this.sex.value(),
      updatedAt: this.updatedAt.value(),
      createdAt: this.createdAt.value(),
      deleted: this.deleted,
      role: this.role.value()
    }
  }
}

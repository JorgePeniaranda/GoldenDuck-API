import { ID } from '@/valueObjects/number/ID/ID.value'
import { type UserPrimitiveEntity, type UserEntity } from './user.entity'
import { DNI } from './valueObjects/dni/Dni.value'
import { Email } from '@/valueObjects/string/email/email.value'
import { PhoneNumber } from './valueObjects/phoneNumber/phoneNumber.value'
import { Password } from '@/valueObjects/string/password/password.value'
import { BirthDate } from './valueObjects/birthDate/BirthDate.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { Role } from '@/valueObjects/enum/Role/Role.value'
import { Sex } from '@/valueObjects/enum/Sex/Sex.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'
import { AlphaNumeric } from '@/valueObjects/string/alphaNumeric/alphaNumeric.value'

const ObjectName = 'User'

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
      id: new ID(user.id, `${ObjectName} -> ID`),
      name: new Alphabetic(user.name, `${ObjectName} -> Name`),
      lastName: new Alphabetic(user.lastName, `${ObjectName} -> LastName`),
      dni: new DNI(user.dni, `${ObjectName} -> DNI`),
      email: new Email(user.email, `${ObjectName} -> Email`),
      phoneNumber: new PhoneNumber(user.phoneNumber, `${ObjectName} -> PhoneNumber`),
      password: new Password(user.password, `${ObjectName} -> Password`),
      address: new AlphaNumeric(user.address, `${ObjectName} -> Address`),
      birthDate: new BirthDate(user.birthDate, `${ObjectName} -> BirthDate`),
      sex: new Sex(user.sex, `${ObjectName} -> Sex`),
      updatedAt: new PastDate(user.updatedAt, `${ObjectName} -> UpdatedAt`),
      createdAt: new PastDate(user.createdAt, `${ObjectName} -> CreatedAt`),
      deleted: new ValidBoolean(user.deleted, `${ObjectName} -> Deleted`),
      role: new Role(user.role, `${ObjectName} -> Role`)
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
      deleted: this.deleted.value,
      role: this.role.value
    }
  }
}

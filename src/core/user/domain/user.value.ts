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
import { ValidString } from '@/valueObjects/string/string/String.value'

const ObjectName = 'User'

export class User implements UserEntity {
  public readonly id: UserEntity['id']
  public name: UserEntity['name']
  public lastName: UserEntity['lastName']
  public dni: UserEntity['dni']
  public email: UserEntity['email']
  public phoneNumber: UserEntity['phoneNumber']
  public password: UserEntity['password']
  public salt: UserEntity['salt']
  public address: UserEntity['address']
  public birthDate: UserEntity['birthDate']
  public sex: UserEntity['sex']
  public updatedAt: UserEntity['updatedAt']
  public readonly createdAt: UserEntity['createdAt']
  public actived: UserEntity['actived']
  public deleted: UserEntity['deleted']
  public role: UserEntity['role']

  constructor (user: UserPrimitiveEntity) {
    this.id = new ID(user.id, `${ObjectName} -> ID`)
    this.name = new Alphabetic(user.name, `${ObjectName} -> Name`)
    this.lastName = new Alphabetic(user.lastName, `${ObjectName} -> LastName`)
    this.dni = new DNI(user.dni, `${ObjectName} -> DNI`)
    this.email = new Email(user.email, `${ObjectName} -> Email`)
    this.phoneNumber = new PhoneNumber(
      user.phoneNumber,
      `${ObjectName} -> PhoneNumber`
    )
    this.password = new Password(user.password, `${ObjectName} -> Password`)
    this.salt = new ValidString(user.salt, `${ObjectName} -> Salt`)
    this.address = new AlphaNumeric(user.address, `${ObjectName} -> Address`)
    this.birthDate = new BirthDate(user.birthDate, `${ObjectName} -> BirthDate`)
    this.sex = new Sex(user.sex, `${ObjectName} -> Sex`)
    this.updatedAt = new PastDate(user.updatedAt, `${ObjectName} -> UpdatedAt`)
    this.createdAt = new PastDate(user.createdAt, `${ObjectName} -> CreatedAt`)
    this.actived = new ValidBoolean(user.actived, `${ObjectName} -> Actived`)
    this.deleted = new ValidBoolean(user.deleted, `${ObjectName} -> Deleted`)
    this.role = new Role(user.role, `${ObjectName} -> Role`)
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
      salt: this.salt.value,
      address: this.address.value,
      birthDate: this.birthDate.value,
      sex: this.sex.value,
      updatedAt: this.updatedAt.value,
      createdAt: this.createdAt.value,
      actived: this.actived.value,
      deleted: this.deleted.value,
      role: this.role.value
    }
  }
}

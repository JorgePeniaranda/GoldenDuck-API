import { type UserEntity } from './user.entity'

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
}

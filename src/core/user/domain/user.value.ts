import type UserEntity from './user.entity'

export default class User implements UserEntity {
  public id: number
  public name: string
  public lastName: string
  public dni: bigint
  public email: string
  public phoneNumber: bigint
  public password: string
  public address: string
  public birthDate: Date
  public sex: 'MALE' | 'FEMALE'
  public updatedAt: Date
  public createdAt: Date
  public deleted: boolean
  public role: 'ADMIN' | 'SUPPORT' | 'USER'

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

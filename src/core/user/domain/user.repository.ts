import { type UserEntity } from './user.entity'
import { type User } from './user.value'

export interface UserRepository {
  createUser: ({
    name,
    lastName,
    dni,
    email,
    phoneNumber,
    password,
    address,
    birthDate,
    sex
  }: {
    name: UserEntity['name']
    lastName: UserEntity['lastName']
    dni: UserEntity['dni']
    email: UserEntity['email']
    phoneNumber: UserEntity['phoneNumber']
    password: UserEntity['password']
    address: UserEntity['address']
    birthDate: UserEntity['birthDate']
    sex: UserEntity['sex']
  }) => Promise<User>
  updateUser: ({
    id,
    email,
    phoneNumber,
    password
  }: {
    id: UserEntity['id']
    email: UserEntity['email']
    phoneNumber: UserEntity['phoneNumber']
    password: UserEntity['password']
  }) => Promise<User>
  deleteUser: (id: UserEntity['id']) => Promise<void>
  findUser: ({
    id,
    dni,
    email,
    phoneNumber
  }: {
    id?: UserEntity['id']
    dni?: UserEntity['dni']
    email?: UserEntity['email']
    phoneNumber?: UserEntity['phoneNumber']
  }) => Promise<User | null>
}

import { type UserEntity } from './error.entity'
import { type User } from './error.value'

export interface UserRepository {
  createUser: (user: User) => Promise<User>
  updateUser: (user: User) => Promise<User>
  deleteUser: (user: User) => Promise<void>
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

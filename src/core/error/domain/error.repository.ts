import { type ErrorEntity } from './error.entity'
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
    id?: ErrorEntity['id']
    dni?: ErrorEntity['dni']
    email?: ErrorEntity['email']
    phoneNumber?: ErrorEntity['phoneNumber']
  }) => Promise<User | null>
}

import { type UserEntity } from './user.entity'
import { type User } from './user.value'

export interface UserRepository {
  saveUser: (user: User) => Promise<User>
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

import { type UserEntity } from './user.entity'

export interface UserRepository {
  saveUser: (user: UserEntity) => Promise<UserEntity>
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
  }) => Promise<UserEntity | null>
}

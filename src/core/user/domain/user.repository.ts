import type UserEntity from './user.entity'

export default interface UserRepository {
  saveUser: (user: UserEntity) => Promise<UserEntity>
  findUser: ({ id, email, phoneNumber }: { id?: number, email?: string, phoneNumber?: number }) => Promise<UserEntity | null>
}

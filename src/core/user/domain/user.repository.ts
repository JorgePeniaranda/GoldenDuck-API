import type UserEntity from './user.entity'

export default interface UserRepository {
  saveUser: (user: UserEntity) => Promise<UserEntity>
  findUserByID: (userID: number) => Promise<number> | null
  findUserByEmail: (userID: number) => Promise<number> | null
  findUserByDNI: (userDNI: number) => Promise<number> | null
  findUserByPhone: (userPhone: number) => Promise<number> | null
}

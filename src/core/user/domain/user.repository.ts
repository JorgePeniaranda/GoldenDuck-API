import { type FindUserDTO } from './dto/find-user.dto'
import { type User } from './user.entity'
import { type UserPrimitive } from './user.primitive'

export interface UserRepository {
  createUser: (user: User) => Promise<User>
  findOne: (params: FindUserDTO) => Promise<User | null>
  findByID: (id: UserPrimitive['id']) => Promise<User | null>
  updateUser: (user: User) => Promise<User>
  deleteUser: (user: User) => Promise<void>
}

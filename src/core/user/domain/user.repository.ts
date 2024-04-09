import { type CreateUserDTO } from './dto/create-user.dto'
import { type FindUserDTO } from './dto/find-user.dto'
import { type User } from './user.entity'
import { type UserPrimitive } from './user.primitive'

export interface UserRepository {
  createUser: (user: CreateUserDTO) => Promise<User>
  findUser: (params: FindUserDTO) => Promise<User | null>
  findUserByID: (id: UserPrimitive['id']) => Promise<User | null>
  updateUser: (user: User) => Promise<User>
  deleteUser: (user: User) => Promise<void>
}

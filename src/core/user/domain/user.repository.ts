import { type MPFindUserDTO } from './dto/find-user.dto'
import { type User } from './user.entity'
import { type UserPrimitive } from './user.primitive'

export interface UserRepository {
  create: (data: User) => Promise<User>
  findOne: (params: MPFindUserDTO) => Promise<User | null>
  findByID: ({ id }: { id: UserPrimitive['id'] }) => Promise<User | null>
  update: (data: User) => Promise<User>
  delete: (data: User) => Promise<void>
}

import { type CreateUserDTO } from './dto/create-user.dto'
import { type DeleteUserDTO } from './dto/delete-user.dto'
import { type FindUserDTO } from './dto/find-user.dto'
import { type IDUserDTO } from './dto/id-user.dto'
import { type UpdateUserDTO } from './dto/update-user.dto'
import { type User } from './user.entity'

export interface UserRepository {
  createUser: (user: CreateUserDTO) => Promise<User>
  findUser: (params: FindUserDTO) => Promise<User | null>
  findUserByID: ({
    id
  }: IDUserDTO) => Promise<User | null>
  updateUser: (id: IDUserDTO, user: UpdateUserDTO) => Promise<User>
  deleteUser: (id: IDUserDTO, data: DeleteUserDTO) => Promise<void>
}

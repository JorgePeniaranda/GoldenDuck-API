import { UserErrorsMessages } from '@/messages/error/user'
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { type CreateUserDTO } from '../dto/create-user.dto'
import { type DeleteUserDTO } from '../dto/delete-user.dto'
import { type FindUserDTO } from '../dto/find-user.dto'
import { type UpdateUserDTO } from '../dto/update-user.dto'
import { type User } from '../user.entity'
import { type UserPrimitive } from '../user.primitive'
import { UserRepository } from '../user.repository'

@Injectable()
export class UserUseCase {
  constructor (
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async createUser (user: CreateUserDTO): Promise<User> {
    return await this.userRepository.createUser(user)
  }

  async findUser (params: FindUserDTO): Promise<User | null> {
    return await this.userRepository.findUser(params)
  }

  async findUserByID (id: UserPrimitive['id']): Promise<User | null> {
    return await this.userRepository.findUserByID(id)
  }

  activateUser (): void {}

  async updateUser (
    id: UserPrimitive['id'],
    data: UpdateUserDTO
  ): Promise<User> {
    const user = await this.userRepository.findUserByID(id)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.UserNotFound)
    }

    if (data.name !== undefined) user.name = data.name
    if (data.lastName !== undefined) user.lastName = data.lastName
    if (data.email !== undefined) user.email = data.email
    if (data.phoneNumber !== undefined) user.phoneNumber = data.phoneNumber
    if (data.password !== undefined) user.password = data.password
    if (data.address !== undefined) user.address = data.address
    if (data.role !== undefined) user.role = data.role

    return await this.userRepository.updateUser(user)

    // TO-DO: send notification to account email
  }

  async deleteUser (
    id: UserPrimitive['id'],
    data: DeleteUserDTO
  ): Promise<void> {
    const user = await this.userRepository.findUserByID(id)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.UserNotFound)
    }

    if (!user.comparePassword(data.password)) {
      throw new UnauthorizedException(UserErrorsMessages.UserNotFound)
    }

    await this.userRepository.deleteUser(user)
  }
}

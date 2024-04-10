import { UserErrorsMessages } from '@/messages/error/user'
import { Password } from '@/value-objects/password'
import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type CreateUserDTO } from '../dto/create-user.dto'
import { type DeleteUserDTO } from '../dto/delete-user.dto'
import { type FindUserDTO } from '../dto/find-user.dto'
import { type UpdateUserDTO } from '../dto/update-user.dto'
import { User } from '../user.entity'
import { type UserPrimitive } from '../user.primitive'
import { UserRepository } from '../user.repository'

@Injectable()
export class UserUseCase {
  constructor (@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async createUser (user: CreateUserDTO): Promise<User> {
    const checkUser = await this.userRepository.findOne({
      dni: user.dni,
      email: user.email,
      phoneNumber: user.phoneNumber
    })

    if (checkUser !== null) {
      throw new ConflictException(UserErrorsMessages.UserAlreadyExist)
    }

    const password = new Password(user.password)

    const newUser = User.create({
      ...user,
      password: password.value,
      salt: password.salt
    })

    // TO-DO: send notification with url to email

    return await this.userRepository.createUser(newUser)
  }

  async findOne (params: FindUserDTO): Promise<User | null> {
    return await this.userRepository.findOne(params)
  }

  async findOneByID (id: UserPrimitive['id']): Promise<User | null> {
    return await this.userRepository.findOneByID(id)
  }

  activateUser (): void {}

  async updateUser (id: UserPrimitive['id'], data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOneByID(id)

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

  async deleteUser (id: UserPrimitive['id'], data: DeleteUserDTO): Promise<void> {
    const user = await this.userRepository.findOneByID(id)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.UserNotFound)
    }

    if (!user.comparePassword(data.password)) {
      throw new UnauthorizedException(UserErrorsMessages.UserNotFound)
    }

    await this.userRepository.deleteUser(user)
  }
}

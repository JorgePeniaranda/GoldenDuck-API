import { Tracking } from '@/utils/decorators'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { type CreateUserDTO } from '../dto/create-user.dto'
import { type DeleteUserDTO } from '../dto/delete-user.dto'
import { type FindUserDTO } from '../dto/find-user.dto'
import { type IDUserDTO } from '../dto/id-user.dto'
import { type UpdateUserDTO } from '../dto/update-user.dto'
import { type User } from '../user.entity'
import { UserRepository } from '../user.repository'

@Injectable()
export class UserUseCase {
  constructor (@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  @Tracking()
  async createUser (user: CreateUserDTO): Promise<User> {
    return await this.userRepository.createUser(user)
  }

  @Tracking()
  async findUser (params: FindUserDTO): Promise<User | null> {
    return await this.userRepository.findUser(params)
  }

  @Tracking()
  async findUserByID (id: IDUserDTO): Promise<User | null> {
    return await this.userRepository.findUserByID(id)
  }

  @Tracking()
  activateUser (): void {

  }

  @Tracking()
  async updateUser (id: IDUserDTO, data: UpdateUserDTO): Promise<User> {
    return await this.userRepository.updateUser(id, data)
  }

  @Tracking()
  async deleteUser (id: IDUserDTO, data: DeleteUserDTO): Promise<void> {
    const user = await this.userRepository.findUserByID(id)

    if (data.password === user?.password) {
      throw new UnauthorizedException('Password') // change to custom message
    }

    await this.userRepository.deleteUser(id, data)
  }
}

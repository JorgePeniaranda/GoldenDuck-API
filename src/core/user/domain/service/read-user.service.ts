import { Inject, Injectable } from '@nestjs/common'
import { type FindUserDTO } from '../dto/find-user.dto'
import { type User } from '../user.entity'
import { type UserPrimitive } from '../user.primitive'
import { UserRepository } from '../user.repository'

@Injectable()
export class ReadUserService {
  constructor (@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async findOne (params: FindUserDTO): Promise<User | null> {
    return await this.userRepository.findOne(params)
  }

  async findByID ({ id }: { id: UserPrimitive['id'] }): Promise<User | null> {
    return await this.userRepository.findByID({ id })
  }
}

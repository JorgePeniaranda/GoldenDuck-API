import type UserEntity from '../domain/user.entity'
import type UserRepository from '../domain/user.repository'

export default class UseruUseCase {
  constructor (private readonly userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async create (user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userRepository.saveUser(user)

    return createdUser
  }

  public async update (user: UserEntity): Promise<UserEntity> {
    const updatedUser = await this.userRepository.saveUser(user)

    return updatedUser
  }

  public async delete (user: UserEntity): Promise<UserEntity> {
    user.deleted = true
    const updatedUser = await this.userRepository.saveUser(user)

    return updatedUser
  }

  public async findUser (searchParams: { id?: number, email?: string, phoneNumber?: number }): Promise<UserEntity | null> {
    const user = await this.userRepository.findUser(searchParams)

    return user
  }
}

import type UserEntity from '../domain/user.entity'
import type UserRepository from '../domain/user.repository'

export default class UseruUseCase {
  constructor (private readonly userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async create (user: UserEntity): Promise<UserEntity> {
    await this.userRepository.findUserByID(1)

    return user
  }
}

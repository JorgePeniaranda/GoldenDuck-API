import { type UserEntity } from '../domain/user.entity'
import { type UserRepository } from '../domain/user.repository'
import { type User } from '../domain/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async create (user: User): Promise<User> {
    const createdUser = await this.userRepository.saveUser(user)

    return createdUser
  }

  public async update (user: User): Promise<User> {
    const updatedUser = await this.userRepository.saveUser(user)

    return updatedUser
  }

  public async delete (user: User): Promise<User> {
    user.deleted = true
    const updatedUser = await this.userRepository.saveUser(user)

    return updatedUser
  }

  public async findUser (searchParams: {
    id?: UserEntity['id']
    dni?: UserEntity['dni']
    email?: UserEntity['email']
    phoneNumber?: UserEntity['phoneNumber']
  }): Promise<User | null> {
    const user = await this.userRepository.findUser(searchParams)

    return user
  }
}

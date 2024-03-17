import { RequestError } from '../../../helpers/customErrors'
import { ErrorsDictionary } from '../../../messages/errors'
import { type UserEntity } from '../domain/user.entity'
import { type UserRepository } from '../domain/user.repository'
import { type User } from '../domain/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public async create (user: User): Promise<User> {
    const createdUser = await this.userRepository.createUser(user)

    return createdUser
  }

  public async update (user: User): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(user)

    return updatedUser
  }

  public async delete (user: User): Promise<void> {
    user.deleted = true

    await this.userRepository.deleteUser(user)
  }

  public async findUser (searchParams: {
    id?: UserEntity['id']
    dni?: UserEntity['dni']
    email?: UserEntity['email']
    phoneNumber?: UserEntity['phoneNumber']
  }): Promise<User | null> {
    if (
      searchParams.id === undefined &&
      searchParams.dni === undefined &&
      searchParams.email === undefined &&
      searchParams.phoneNumber === undefined
    ) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const user = await this.userRepository.findUser(searchParams)

    return user
  }

  public async checkUser (searchParams: {
    dni?: UserEntity['dni']
    email?: UserEntity['email']
    phoneNumber?: UserEntity['phoneNumber']
  }): Promise<boolean> {
    if (
      searchParams.dni === undefined &&
      searchParams.email === undefined &&
      searchParams.phoneNumber === undefined
    ) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const user = await this.userRepository.findUser(searchParams)

    if (user === null) {
      return false
    }

    return true
  }
}

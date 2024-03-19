import { RequestError } from '@/helpers/customErrors'
import { type UserEntity } from '../domain/user.entity'
import { ErrorsDictionary } from '@/messages/errors'
import { type UserRepository } from '../domain/user.repository'
import { type User } from '../domain/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public async createUser ({
    name,
    lastName,
    dni,
    email,
    phoneNumber,
    password,
    address,
    birthDate,
    sex
  }: {
    name: UserEntity['name']
    lastName: UserEntity['lastName']
    dni: UserEntity['dni']
    email: UserEntity['email']
    phoneNumber: UserEntity['phoneNumber']
    password: UserEntity['password']
    address: UserEntity['address']
    birthDate: UserEntity['birthDate']
    sex: UserEntity['sex']
  }): Promise<User> {
    const createdUser = await this.userRepository.createUser({
      name,
      lastName,
      dni,
      email,
      phoneNumber,
      password,
      address,
      birthDate,
      sex
    })

    return createdUser
  }

  public async updateUser ({
    id,
    email,
    phoneNumber,
    password
  }: {
    id: UserEntity['id']
    email: UserEntity['email']
    phoneNumber: UserEntity['phoneNumber']
    password: UserEntity['password']
  }): Promise<User> {
    const updatedUser = await this.userRepository.updateUser({
      id,
      email,
      phoneNumber,
      password
    })

    return updatedUser
  }

  public async deleteUser (id: UserEntity['id']): Promise<void> {
    await this.userRepository.deleteUser(id)
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

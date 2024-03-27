import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '../../domain/user.repository'
import { type ChangeUserAddressDTO, type ChangeUserEmailDTO, type ChangeUserLastNameDTO, type ChangeUserNameDTo, type ChangeUserPasswordDTO, type ChangeUserPhoneNumberDTO, type ChangeUserRoleDTO, type CreateUserDTO, type UpdateUserDTO } from '../dto/user.dto'

@Injectable()
export class UserUseCase {
  constructor (@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  getHello (): string {
    return this.userRepository.getHello()
  }

  createUser (user: CreateUserDTO): CreateUserDTO {
    return user
  }

  getUserByID (): string {
    return 'this.appService.getHello()'
  }

  activateUser (): string {
    return 'this.getHello()'
  }

  updateUser (user: UpdateUserDTO): UpdateUserDTO {
    return user
  }

  changeUserName (user: ChangeUserNameDTo): ChangeUserNameDTo {
    return user
  }

  changeUserLastName (user: ChangeUserLastNameDTO): ChangeUserLastNameDTO {
    return user
  }

  changeUserEmail (user: ChangeUserEmailDTO): ChangeUserEmailDTO {
    return user
  }

  changeUserPhoneNumber (user: ChangeUserPhoneNumberDTO): ChangeUserPhoneNumberDTO {
    return user
  }

  changeUserPassword (user: ChangeUserPasswordDTO): ChangeUserPasswordDTO {
    return user
  }

  changeUserAddress (user: ChangeUserAddressDTO): ChangeUserAddressDTO {
    return user
  }

  changeUserRole (user: ChangeUserRoleDTO): ChangeUserRoleDTO {
    return user
  }

  deleteUser (id: string): string {
    return id
  }
}

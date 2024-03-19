import { prisma } from '../../../../libs/prisma'
import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.repository'
import { User } from '../../domain/user.value'

export class PrismaRepository implements UserRepository {
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
    const createdUser = await prisma.user.create({
      data: {
        name: name.value,
        lastName: lastName.value,
        dni: dni.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        address: address.value,
        birthDate: birthDate.value,
        sex: sex.value
      }
    })

    return new User(createdUser)
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
    const updatedUser = await prisma.user.update({
      where: {
        id: id.value
      },
      data: {
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value
      }
    })

    return new User(updatedUser)
  }

  public async deleteUser (id: UserEntity['id']): Promise<void> {
    await prisma.user.update({
      where: {
        id: id.value
      },
      data: {
        deleted: true
      }
    })
  }

  public async findUser ({
    id,
    dni,
    email,
    phoneNumber
  }: {
    id?: UserEntity['id']
    dni?: UserEntity['dni']
    email?: UserEntity['email']
    phoneNumber?: UserEntity['phoneNumber']
  }): Promise<User | null> {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [
          { id: id?.value },
          { dni: dni?.value },
          { email: email?.value },
          { phoneNumber: phoneNumber?.value }
        ],
        deleted: false
      }
    })

    if (findUser === null) {
      return null
    }

    const user = new User(findUser)

    return user
  }
}

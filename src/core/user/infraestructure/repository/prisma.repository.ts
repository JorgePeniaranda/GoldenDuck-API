import { prisma } from '../../../../libs/prisma'
import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.repository'
import { User } from '../../domain/user.value'

export class PrismaRepository implements UserRepository {
  public async createUser (user: User): Promise<User> {
    await prisma.user.create({
      data: user.toJSON()
    })

    return user
  }

  public async updateUser (user: User): Promise<User> {
    await prisma.user.update({
      where: {
        id: user.id.value()
      },
      data: user.toJSON()
    })

    return user
  }

  public async deleteUser (user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id.value()
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
        OR: [{ id: id?.value() }, { dni: dni?.value() }, { email: email?.value() }, { phoneNumber: phoneNumber?.value() }],
        deleted: false
      }
    })

    if (findUser === null) {
      return null
    }

    const user = User.create(findUser)

    return user
  }
}

import { PrismaClient } from '@prisma/client'
import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.repository'
import { User } from '../../domain/user.value'

const prisma = new PrismaClient()

export default class PrismaRepository implements UserRepository {
  public async saveUser (user: User): Promise<User> {
    await prisma.user.upsert({
      where: {
        id: user.id.value()
      },
      create: user.toJSON(),
      update: user.toJSON()
    })

    return user
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

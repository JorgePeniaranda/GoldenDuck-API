import { PrismaClient } from '@prisma/client'
import type UserEntity from '../../domain/user.entity'
import type UserRepository from '../../domain/user.repository'

const prisma = new PrismaClient()

export default class PrismaRepository implements UserRepository {
  public async saveUser (user: UserEntity): Promise<UserEntity> {
    const createdUser = await prisma.user.upsert({
      where: {
        id: user.id
      },
      create: user,
      update: user
    })

    return createdUser
  }

  public async findUser ({ id, email, phoneNumber }: { id?: number, email?: string, phoneNumber?: number }): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id },
          { email },
          { phoneNumber }
        ],
        deleted: false
      }
    })

    return user
  }
}

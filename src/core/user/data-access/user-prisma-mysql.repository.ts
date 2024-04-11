import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { type FindUserDTO } from '../domain/dto/find-user.dto'
import { User } from '../domain/user.entity'
import { type UserPrimitive } from '../domain/user.primitive'
import { type UserRepository } from '../domain/user.repository'

@Injectable()
export class UserRepositoryPrismaMySQL implements UserRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async createUser (user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: { ...user.toJSON(), id: undefined }
    })

    return new User(createdUser)
  }

  public async updateUser (user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id, deleted: false },
      data: user.toJSON()
    })

    return new User(updatedUser)
  }

  public async deleteUser (user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        ...user.toJSON(),
        deleted: false
      },
      data: {
        deleted: true
      }
    })
  }

  public async findOne ({ dni, email, phoneNumber }: FindUserDTO): Promise<User | null> {
    const findUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ dni }, { email }, { phoneNumber }],
        deleted: false
      }
    })

    if (findUser === null) {
      return null
    }

    return new User(findUser)
  }

  public async findOneByID (id: UserPrimitive['id']): Promise<User | null> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
        deleted: false
      }
    })

    if (findUser === null) {
      return null
    }

    return new User(findUser)
  }
}

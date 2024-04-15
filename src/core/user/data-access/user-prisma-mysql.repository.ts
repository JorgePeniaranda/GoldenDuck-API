import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { type FindUserDTO } from '../domain/dto/find-user.dto'
import { User } from '../domain/user.entity'
import { type UserPrimitive } from '../domain/user.primitive'
import { type UserRepository } from '../domain/user.repository'

@Injectable()
export class UserRepositoryPrismaMySQL implements UserRepository {
  constructor (private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create
  public async create (data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: { ...data.toJSON(), id: undefined }
    })

    return new User(user)
  }

  /* ---------- update ---------- */ // MARK: update
  public async update (data: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: data.id, deleted: false },
      data: data.toJSON()
    })

    return new User(user)
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({ dni, email, phoneNumber }: FindUserDTO): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ dni }, { email }, { phoneNumber }],
        deleted: false
      }
    })

    return user === null ? null : new User(user)
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID ({ id }: { id: UserPrimitive['id'] }): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        deleted: false
      }
    })

    return user === null ? null : new User(user)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete (data: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        ...data.toJSON(),
        deleted: false
      },
      data: {
        deleted: true
      }
    })
  }
}

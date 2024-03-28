import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { type CreateUserDTO } from '../domain/dto/create-user.dto'
import { type DeleteUserDTO } from '../domain/dto/delete-user.dto'
import { type FindUserDTO } from '../domain/dto/find-user.dto'
import { type IDUserDTO } from '../domain/dto/id-user.dto'
import { type UpdateUserDTO } from '../domain/dto/update-user.dto'
import { User } from '../domain/user.entity'
import { type UserRepository } from '../domain/user.repository'

const prisma = new PrismaClient()

@Injectable()
export class UserRepositoryPrismaMySQL implements UserRepository {
  public async createUser (data: CreateUserDTO): Promise<User> {
    const createdUser = await prisma.user.create({
      data
    })

    return new User(createdUser)
  }

  public async updateUser ({ id }: IDUserDTO, data: UpdateUserDTO): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        address: data.address,
        role: data.role
      }
    })

    return new User(updatedUser)
  }

  public async deleteUser ({ id }: IDUserDTO, data: DeleteUserDTO): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id,
        deleted: false
      },
      select: {
        password: true
      }
    })

    if (data.password === user?.password) {
      throw new UnauthorizedException('Password') // change to custom message
    }

    await prisma.user.update({
      where: {
        id,
        password: data.password,
        deleted: false
      },
      data: {
        deleted: true
      }
    })
  }

  public async findUser ({
    dni,
    email,
    phoneNumber
  }: FindUserDTO): Promise<User> {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [
          { dni },
          { email },
          { phoneNumber }
        ],
        deleted: false
      }
    })

    if (findUser === null) {
      throw new NotFoundException('User not found') // change to custom message
    }

    return new User(findUser)
  }

  public async findUserByID ({
    id
  }: IDUserDTO): Promise<User> {
    const findUser = await prisma.user.findUnique({
      where: {
        id,
        deleted: false
      }
    })

    if (findUser === null) {
      throw new NotFoundException('User not found') // change to custom message
    }

    return new User(findUser)
  }
}

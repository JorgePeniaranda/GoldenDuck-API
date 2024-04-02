import { PrismaService } from '@/core/shared/prisma.repository'
import { type IDUserDTO } from '@/core/user/domain/dto/id-user.dto'
import { Injectable } from '@nestjs/common'
import { Account } from '../domain/account.entity'
import { type AccountRepository } from '../domain/account.repository'
import { type CreateAccountDTO } from '../domain/dto/create-account'
import { type IDAccountDTO } from '../domain/dto/id-account'
import { type UpdateAccountDTO } from '../domain/dto/update-account'

@Injectable()
export class AccountRepositoryPrismaMySQL implements AccountRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateAccountDTO): Promise<Account> {
    const newAccount = await this.prisma.account.create({
      data
    })

    return new Account(newAccount)
  }

  public async getAll ({ id }: IDUserDTO): Promise<Account[] | null> {
    const accounts = await this.prisma.account.findMany({
      where: {
        idUser: id
      }
    })

    return accounts.map(account => new Account(account))
  }

  public async find ({ id }: IDAccountDTO): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: {
        id
      }
    })

    return account !== null ? new Account(account) : null
  }

  public async update ({ id }: IDAccountDTO, account: UpdateAccountDTO): Promise<Account> {
    const updatedAccount = await this.prisma.account.update({
      where: {
        id
      },
      data: account
    })

    return new Account(updatedAccount)
  }

  public async delete ({ id }: IDAccountDTO): Promise<void> {
    await this.prisma.account.update({
      where: {
        id
      },
      data: {
        deleted: true
      }
    })
  }
}

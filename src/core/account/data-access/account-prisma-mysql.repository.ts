import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Account } from '../domain/account.entity'
import { type AccountPrimitive } from '../domain/account.primitive'
import { type AccountRepository } from '../domain/account.repository'

@Injectable()
export class AccountRepositoryPrismaMySQL implements AccountRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: Account): Promise<Account> {
    const newAccount = await this.prisma.account.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Account(newAccount)
  }

  public async findAll (idUser: AccountPrimitive['idUser']): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        idUser
      }
    })

    return accounts.map(account => new Account(account))
  }

  public async findOne (id: AccountPrimitive['id']): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: {
        id
      }
    })

    return account !== null ? new Account(account) : null
  }

  public async update (account: Account): Promise<Account> {
    const updatedAccount = await this.prisma.account.update({
      where: {
        id: account.id,
        deleted: false
      },
      data: account.toJSON()
    })

    return new Account(updatedAccount)
  }

  public async delete (account: Account): Promise<void> {
    await this.prisma.account.update({
      where: account.toJSON(),
      data: {
        deleted: true
      }
    })
  }
}

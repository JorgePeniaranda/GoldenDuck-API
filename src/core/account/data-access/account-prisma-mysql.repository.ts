import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Account } from '../domain/account.entity'
import { type AccountPrimitive } from '../domain/account.primitive'
import { type AccountRepository } from '../domain/account.repository'

@Injectable()
export class AccountRepositoryPrismaMySQL implements AccountRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: Account): Promise<Account> {
    const account = await this.prisma.account.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Account(account)
  }

  public async findIDUser ({
    id
  }: {
    id: AccountPrimitive['id']
  }): Promise<AccountPrimitive['idUser'] | null> {
    const idUser = await this.prisma.account.findUnique({
      where: {
        id,
        deleted: false
      },
      select: {
        idUser: true
      }
    })

    return idUser === null ? null : idUser.idUser
  }

  public async findAll ({ idUser }: { idUser: AccountPrimitive['idUser'] }): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        idUser,
        deleted: false
      }
    })

    return accounts.map(account => new Account(account))
  }

  public async findOne ({
    idUser,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    index: number
  }): Promise<Account | null> {
    const account = await this.prisma.account.findMany({
      where: {
        idUser,
        deleted: false
      },
      skip: index,
      take: 1
    })

    if (account[0] === undefined) return null

    return new Account(account[0])
  }

  public async findByID ({ id }: { id: AccountPrimitive['id'] }): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
        deleted: false
      }
    })

    return account !== null ? new Account(account) : null
  }

  public async update (data: Account): Promise<Account> {
    const account = await this.prisma.account.update({
      where: {
        id: data.id,
        deleted: false
      },
      data: data.toJSON()
    })

    return new Account(account)
  }

  public async delete (account: Account): Promise<void> {
    await this.prisma.account.update({
      where: {
        ...account.toJSON(),
        deleted: false
      },
      data: {
        deleted: true
      }
    })
  }
}

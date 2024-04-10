import { type IDUserDTO } from '@/core/user/domain/dto/id-user.dto'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Account } from '../domain/account.entity'
import { type AccountPrimitive } from '../domain/account.primitive'
import { type AccountRepository } from '../domain/account.repository'
import { type CreateAccountDTO } from '../domain/dto/create-account'
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

  public async findAll ({ id }: IDUserDTO): Promise<Account[] | null> {
    const accounts = await this.prisma.account.findMany({
      where: {
        idUser: id
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

  public async update (id: AccountPrimitive['id'], account: UpdateAccountDTO): Promise<Account> {
    const updatedAccount = await this.prisma.account.update({
      where: {
        id
      },
      data: account
    })

    return new Account(updatedAccount)
  }

  public async delete (id: AccountPrimitive['id']): Promise<void> {
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

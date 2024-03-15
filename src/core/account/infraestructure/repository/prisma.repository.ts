import { prisma } from '../../../../libs/prisma'
import { Account } from '../../domain/account.value'
import { type AccountEntity } from '../../domain/account.entity'
import { type AccountRepository } from '../../domain/account.repository'

export class PrismaRepository implements AccountRepository {
  public async createAccount (account: Account): Promise<Account> {
    await prisma.account.create({
      data: account.toJSON()
    })

    return account
  }

  public async updateAccount (account: Account): Promise<Account> {
    await prisma.account.update({
      where: {
        id: account.id.value()
      },
      data: account.toJSON()
    })

    return account
  }

  public async deleteAccount (account: Account): Promise<void> {
    await prisma.account.update({
      where: {
        id: account.id.value()
      },
      data: {
        deleted: true
      }
    })
  }

  public async findAccount ({
    id
  }: {
    id?: AccountEntity['id']
  }): Promise<Account | null> {
    const findAccount = await prisma.account.findFirst({
      where: {
        OR: [{ id: id?.value() }],
        deleted: false
      }
    })

    if (findAccount === null) {
      return null
    }

    const account = Account.create(findAccount)

    return account
  }
}

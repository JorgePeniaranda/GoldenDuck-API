import { prisma } from '@/libs/prisma'
import { type AccountEntity } from '../../domain/account.entity'
import { type AccountRepository } from '../../domain/account.repository'
import { Account } from '../../domain/account.value'
import { type UserEntity } from '@/core/user/domain/user.entity'

export class PrismaRepository implements AccountRepository {
  public async createAccount ({ idUser, imgUrl }: { idUser: AccountEntity['idUser'], imgUrl?: AccountEntity['imgUrl'] }): Promise<Account> {
    const createdAccount = await prisma.account.create({
      data: {
        idUser: idUser.value,
        imgUrl: imgUrl?.value
      }
    })

    return new Account(createdAccount)
  }

  public async getAllAccounts (
    idUser: UserEntity['id']
  ): Promise<Account[] | null> {
    const findAccounts = await prisma.account.findMany({
      where: {
        idUser: idUser?.value,
        deleted: false
      }
    })

    return findAccounts === null ? null : findAccounts.map(account => new Account(account))
  }

  public async findAccount ({
    id
  }: {
    id?: AccountEntity['id']
  }): Promise<Account | null> {
    const findAccount = await prisma.account.findFirst({
      where: {
        OR: [{ id: id?.value }],
        deleted: false
      }
    })

    return findAccount === null ? null : new Account(findAccount)
  }

  public async updateAccount ({ id, imgUrl }: { id: AccountEntity['id'], imgUrl: AccountEntity['imgUrl'] }): Promise<Account> {
    const updatedAccount = await prisma.account.update({
      where: {
        id: id.value
      },
      data: {
        imgUrl: imgUrl?.value,
        updatedAt: new Date()
      }
    })

    return new Account(updatedAccount)
  }

  public async deleteAccount (id: AccountEntity['id']): Promise<void> {
    await prisma.account.update({
      where: {
        id: id.value
      },
      data: {
        updatedAt: new Date(),
        deleted: true
      }
    })
  }
}

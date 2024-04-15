import { AccountErrorsMessages } from '@/messages/error/account'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type Account } from '../account.entity'
import { type AccountPrimitive } from '../account.primitive'
import { AccountRepository } from '../account.repository'

@Injectable()
export class ReadAccountService {
  constructor (
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepository
  ) {}

  /* ---------- findIDUser ---------- */ // MARK: findIDUser
  public async findIDUser ({
    id
  }: {
    id: AccountPrimitive['id']
  }): Promise<AccountPrimitive['idUser']> {
    const idUser = await this.accountRepository.findIDUser({ id })

    if (idUser === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return idUser
  }

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({ idUser }: { idUser: AccountPrimitive['idUser'] }): Promise<Account[]> {
    return await this.accountRepository.findAll({ idUser })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    index: number
  }): Promise<Account | null> {
    return await this.accountRepository.findOne({ idUser, index })
  }

  public async findByID ({ id }: { id: AccountPrimitive['id'] }): Promise<Account | null> {
    return await this.accountRepository.findByID({ id })
  }
}

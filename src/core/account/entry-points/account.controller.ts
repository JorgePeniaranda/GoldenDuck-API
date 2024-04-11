import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AccountErrorsMessages } from '@/messages/error/account'
import { type Account } from '../domain/account.entity'
import { type AccountPrimitive } from '../domain/account.primitive'
import { CreateAccountDTO } from '../domain/dto/create-account'
import { AccountService } from '../domain/service/account.service'
import { AccountResponse } from './account.response'

@ApiResponse({
  type: AccountResponse
})
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor (private readonly accountService: AccountService) {}

  @Post('all')
  async findAll (@Body('idUser', new ParseIntPipe()) idUser: AccountPrimitive['idUser']): Promise<Account[]> {
    const accounts = await this.accountService.findAll(idUser)

    return accounts
  }

  @Post()
  async create (@Body() data: CreateAccountDTO): Promise<Account> {
    const account = await this.accountService.create(data)

    return account
  }

  @Get('/:id')
  async findOne (@Param('id', new ParseIntPipe()) id: AccountPrimitive['id']): Promise<Account> {
    const account = await this.accountService.findOne(id)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    return account
  }

  @Delete('/:id')
  async delete (@Param('id', new ParseIntPipe()) id: AccountPrimitive['id']): Promise<void> {
    await this.accountService.delete(id)
  }
}

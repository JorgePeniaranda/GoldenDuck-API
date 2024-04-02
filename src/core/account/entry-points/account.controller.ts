import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { IDUserDTO } from '@/core/user/domain/dto/id-user.dto'
import { type Account } from '../domain/account.entity'
import { type AccountPrimitive } from '../domain/account.primitive'
import { CreateAccountDTO } from '../domain/dto/create-account'
import { UpdateAccountDTO } from '../domain/dto/update-account'
import { AccountService } from '../domain/service/account.service'
import { AccountResponse } from './account.response'

@ApiResponse({
  type: AccountResponse
})
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor (private readonly accountService: AccountService) {}

  @Get()
  async getAllAccount (@Body() id: IDUserDTO): Promise<Account[]> {
    const accounts = await this.accountService.getAll(id)

    if (accounts === null) {
      return []
    }

    return accounts
  }

  @Post()
  async createAccount (@Body() data: CreateAccountDTO): Promise<Account> {
    const account = await this.accountService.create(data)

    return account
  }

  @Get('/:id')
  async getAccount (@Param('id', new ParseIntPipe()) id: AccountPrimitive['id']): Promise<Account> {
    const account = await this.accountService.find(id)

    if (account === null) {
      throw new NotFoundException()
    }

    return account
  }

  @Put('/config/image')
  async configAccount (@Param('id', new ParseIntPipe()) id: AccountPrimitive['id'], @Body() data: UpdateAccountDTO): Promise<Account> {
    const account = await this.accountService.update(id, data)

    if (account === null) {
      throw new NotFoundException()
    }

    return account
  }

  @Delete('/:id')
  async deleteAccount (@Param('id', new ParseIntPipe()) id: AccountPrimitive['id']): Promise<void> {
    await this.accountService.delete(id)
  }
}

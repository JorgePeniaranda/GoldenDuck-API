import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
import { JwtAuthGuard } from '@/guard/jwt.guard'
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll (@Request() UserData: { user: JwtPayload }): Promise<Account[]> {
    const accounts = await this.accountService.findAll(UserData.user.id)

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

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
import { AccountErrorsMessages } from '@/messages/error/account'
import { type Account } from '../domain/account.entity'
import { type AccountPrimitive } from '../domain/account.primitive'
import { CreateAccountDTO } from '../domain/dto/create-account'
import { ReadAccountService } from '../domain/service/read-account.service'
import { WriteAccountService } from '../domain/service/write-account.service'
import { AccountResponse } from './account.response'

@ApiResponse({
  type: AccountResponse
})
@ApiTags('Account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  constructor (private readonly writeAccountService: WriteAccountService, private readonly readAccountService: ReadAccountService) {}

  @Get()
  async findAll (@Request() UserData: { user: JwtPayload }): Promise<Account[]> {
    const accounts = await this.readAccountService.findAll(UserData.user.id)

    return accounts
  }

  @Post()
  async create (@Body() data: CreateAccountDTO): Promise<Account> {
    const account = await this.writeAccountService.create(data)

    return account
  }

  @Get('/:index')
  async findOne (@Request() UserData: { user: JwtPayload }, @Param('index', new ParseIntPipe()) index: AccountPrimitive['id']): Promise<Account> {
    const account = await this.readAccountService.findOne(UserData.user.id, index)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    return account
  }

  @Delete('/:id')
  async delete (@Param('id', new ParseIntPipe()) id: AccountPrimitive['id']): Promise<void> {
    await this.writeAccountService.delete(id)
  }
}

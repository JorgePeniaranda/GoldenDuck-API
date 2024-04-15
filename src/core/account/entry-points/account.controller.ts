import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { AccountErrorsMessages } from '@/messages/error/account'
import { type Account } from '../domain/account.entity'
import { ReadAccountService } from '../domain/service/read-account.service'
import { WriteAccountService } from '../domain/service/write-account.service'
import { AccountResponse } from './account.response'

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor (
    private readonly writeAccountService: WriteAccountService,
    private readonly readAccountService: ReadAccountService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: AccountResponse,
    status: 200
  })
  @Get()
  async findAll (@Request() UserData: { user: PayloadPrimitive }): Promise<Account[]> {
    const accounts = await this.readAccountService.findAll({
      idUser: UserData.user.id
    })

    return accounts
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    response: AccountResponse,
    status: 201
  })
  @Post()
  async create (@Request() UserData: { user: PayloadPrimitive }): Promise<Account> {
    const account = await this.writeAccountService.create({
      idUser: UserData.user.id
    })

    return account
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: AccountResponse,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Account> {
    const account = await this.readAccountService.findOne({ idUser: UserData.user.id, index })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return account
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @HttpCode(204)
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeAccountService.delete({ idUser: UserData.user.id, index })
  }
}

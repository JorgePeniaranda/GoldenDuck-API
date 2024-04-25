import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Messages } from '@/messages'
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
  async findAll (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<Account[]> {
    const accounts = await this.readAccountService.findAll({
      idUser: UserData.id
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
  async create (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<Account> {
    const account = await this.writeAccountService.create({
      idUser: UserData.id
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
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Account> {
    const account = await this.readAccountService.findOne({ idUser: UserData.id, index })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
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
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeAccountService.delete({ idUser: UserData.id, index })
  }
}

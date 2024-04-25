import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Messages } from '@/messages'
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
import { ApiTags } from '@nestjs/swagger'
import { CreateTransactionDTO, SWGCreateTransactionDTO } from '../domain/dto/create-transaction'
import { ReadTransactionService } from '../domain/service/read-transaction.service'
import { WriteTransactionService } from '../domain/service/write-transaction.service'
import { type Transaction } from '../domain/transaction.entity'
import { TransactionResponse } from './transaction.response'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'

@ApiTags('Transaction')
@Controller('account/:AccountIndex/transaction')
export class TransactionController {
  constructor (
    private readonly readTransactionService: ReadTransactionService,
    private readonly writeTransactionService: WriteTransactionService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number
  ): Promise<Transaction[]> {
    const transactions = await this.readTransactionService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    return transactions
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateTransactionDTO,
    response: TransactionResponse,
    status: 201
  })
  @Post()
  async create (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Body() data: CreateTransactionDTO
  ): Promise<Transaction> {
    const transaction = await this.writeTransactionService.create({
      idUser: UserData.id,
      AccountIndex,
      data
    })

    return transaction
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transaction
  }

  /* ---------- findOneAsSender ---------- */ // MARK: findOneAsSender
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 200
  })
  @Get('/send/:index')
  async findOneAsSender (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsSender({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transaction
  }

  /* ---------- findOneAsReceiver ---------- */ // MARK: findOneAsReceiver
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 200
  })
  @Get('/received/:index')
  async findOneAsReceiver (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsReceiver({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transaction
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 204
  })
  @Delete('/:index')
  async delete (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeTransactionService.delete({ idUser: UserData.id, AccountIndex, index })
  }
}

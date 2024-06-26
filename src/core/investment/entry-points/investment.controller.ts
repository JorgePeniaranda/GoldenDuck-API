import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
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
import { CreateInvestmentDTO, SWGCreateInvestmentDTO } from '../domain/dto/create-investment'
import { type Investment } from '../domain/investment.entity'
import { ReadInvestmentService } from '../domain/service/read-investment.service'
import { WriteInvestmentService } from '../domain/service/write-investment.service'
import { InvestmentResponse } from './investment.response'

@ApiTags('Investment')
@Controller('account/:AccountIndex/investment')
export class InvestmentController {
  constructor (
    private readonly writeInvestmentService: WriteInvestmentService,
    private readonly readInvestmentService: ReadInvestmentService
  ) {}

  @Get()
  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: InvestmentResponse,
    isArray: true,
    status: 200
  })
  async findAll (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number
  ): Promise<Investment[]> {
    const investment = await this.readInvestmentService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    return investment
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateInvestmentDTO,
    response: InvestmentResponse,
    status: 204
  })
  @Post()
  async create (@Body() data: CreateInvestmentDTO): Promise<Investment> {
    const investment = await this.writeInvestmentService.create(data)

    return investment
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: InvestmentResponse,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Investment> {
    const investment = await this.readInvestmentService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (investment === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.INVESTMENT))
    }

    return investment
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Delete('/:index')
  async delete (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeInvestmentService.delete({
      idUser: UserData.id,
      AccountIndex,
      index
    })
  }
}

import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
import { InvestmentErrorsMessages } from '@/messages/error/investment'
import {
  Body,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateInvestmentDTO } from '../domain/dto/create-investment'
import { type Investment } from '../domain/investment.entity'
import { type InvestmentPrimitive } from '../domain/investment.primitive'
import { ReadInvestmentService } from '../domain/service/read-investment.service'
import { WriteInvestmentService } from '../domain/service/write-investment.service'
import { InvestmentResponse } from './investment.response'

@ApiResponse({
  type: InvestmentResponse
})
@ApiTags('Investment')
@ApiBearerAuth()
@Controller('account/:AccountIndex/investment')
export class InvestmentController {
  constructor (
    private readonly writeInvestmentService: WriteInvestmentService,
    private readonly readInvestmentService: ReadInvestmentService
  ) {}

  @Get()
  async findAll (@Body() id: InvestmentPrimitive['id']): Promise<Investment[]> {
    const investment = await this.readInvestmentService.findAll(id)

    return investment
  }

  @Post()
  async create (@Body() data: CreateInvestmentDTO): Promise<Investment> {
    const investment = await this.writeInvestmentService.create(data)

    return investment
  }

  @Get('/:index')
  async findOne (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Investment> {
    const investment = await this.readInvestmentService.findOne({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })

    if (investment === null) {
      throw new NotFoundException(InvestmentErrorsMessages.NotFound)
    }

    return investment
  }

  @HttpCode(204)
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeInvestmentService.delete({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })
  }
}

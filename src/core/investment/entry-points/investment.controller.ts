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
import { CreateInvestmentDTO } from '../domain/dto/create-investment'
import { type Investment } from '../domain/investment.entity'
import { type InvestmentPrimitive } from '../domain/investment.primitive'
import { InvestmentService } from '../domain/service/investment.service'
import { InvestmentResponse } from './investment.response'

@ApiResponse({
  type: InvestmentResponse
})
@ApiTags('Investment')
@Controller('investment')
export class InvestmentController {
  constructor (private readonly investmentService: InvestmentService) {}

  @Get()
  async getAllInvestment (
    @Body() id: InvestmentPrimitive['id']
  ): Promise<Investment[]> {
    const investment = await this.investmentService.findAll(id)

    if (investment === null) {
      return []
    }

    return investment
  }

  @Post()
  async createInvestment (
    @Body() data: CreateInvestmentDTO
  ): Promise<Investment> {
    const investment = await this.investmentService.create(data)

    return investment
  }

  @Get('/:id')
  async getInvestment (
    @Param('id', new ParseIntPipe()) id: InvestmentPrimitive['id']
  ): Promise<Investment> {
    const investment = await this.investmentService.findOne(id)

    if (investment === null) {
      throw new NotFoundException()
    }

    return investment
  }

  @Delete('/:id')
  async deleteInvestment (
    @Param('id', new ParseIntPipe()) id: InvestmentPrimitive['id']
  ): Promise<void> {
    await this.investmentService.delete(id)
  }
}

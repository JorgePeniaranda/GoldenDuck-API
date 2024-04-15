import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
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
import { type Card } from '../domain/card.entity'
import { SWGCreateCardDTO } from '../domain/dto/create-card'
import { ReadCardService } from '../domain/service/read-card.service'
import { WriteCardService } from '../domain/service/write-card.service'
import { CardResponse } from './card.response'

@ApiResponse({
  type: CardResponse
})
@ApiTags('Card')
@ApiBearerAuth()
@Controller('account/:AccountIndex/card')
export class CardController {
  constructor (
    private readonly writeCardService: WriteCardService,
    private readonly readCardService: ReadCardService
  ) {}

  @Get()
  async findAll (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number
  ): Promise<Card[]> {
    const cards = await this.readCardService.findAll({
      idUser: UserData.user.id,
      AccountIndex
    })

    if (cards === null) {
      return []
    }

    return cards
  }

  @Post()
  async create (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Body() data: SWGCreateCardDTO
  ): Promise<Card> {
    const card = await this.writeCardService.create({
      idUser: UserData.user.id,
      AccountIndex,
      data
    })

    return card
  }

  @Get('/:index')
  async findOne (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Card> {
    const card = await this.readCardService.findOne({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })

    if (card === null) {
      throw new NotFoundException()
    }

    return card
  }

  @HttpCode(204)
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeCardService.delete({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })
  }
}

import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
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
import { type Card } from '../domain/card.entity'
import { type CardPrimitive } from '../domain/card.primitive'
import { CreateCardDTO } from '../domain/dto/create-card'
import { CardService } from '../domain/service/card.service'
import { CardResponse } from './card.response'

@ApiResponse({
  type: CardResponse
})
@ApiTags('Card')
@ApiBearerAuth()
@Controller('account/:AccountIndex/card')
export class CardController {
  constructor (private readonly cardService: CardService) {}

  @Get()
  async getAllCard (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: CardPrimitive['idAccount']
  ): Promise<Card[]> {
    const cards = await this.cardService.findAll({
      idUser: UserData.user.id,
      AccountIndex
    })

    if (cards === null) {
      return []
    }

    return cards
  }

  @Post()
  async createCard (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: CardPrimitive['idAccount'],
      @Body() data: CreateCardDTO
  ): Promise<Card> {
    const card = await this.cardService.create({ idUser: UserData.user.id, AccountIndex, data })

    return card
  }

  @Get('/:index')
  async getCard (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: CardPrimitive['idAccount'],
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Card> {
    const card = await this.cardService.findOne({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })

    if (card === null) {
      throw new NotFoundException()
    }

    return card
  }

  @Delete('/:index')
  async deleteCard (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: CardPrimitive['idAccount'],
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.cardService.delete({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })
  }
}

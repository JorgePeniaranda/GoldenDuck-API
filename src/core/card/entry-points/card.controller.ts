import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { type Card } from '../domain/card.entity'
import { type CardPrimitive } from '../domain/card.primitive'
import { CreateCardDTO } from '../domain/dto/create-card'
import { CardService } from '../domain/service/card.service'
import { CardResponse } from './card.response'

@ApiResponse({
  type: CardResponse
})
@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor (private readonly cardService: CardService) {}

  @Get()
  async getAllCard (@Body() id: CardPrimitive['id']): Promise<Card[]> {
    const cards = await this.cardService.getAll(id)

    if (cards === null) {
      return []
    }

    return cards
  }

  @Post()
  async createCard (@Body() data: CreateCardDTO): Promise<Card> {
    const card = await this.cardService.create(data)

    return card
  }

  @Get('/:id')
  async getCard (@Param('id', new ParseIntPipe()) id: CardPrimitive['id']): Promise<Card> {
    const transaction = await this.cardService.find(id)

    if (transaction === null) {
      throw new NotFoundException()
    }

    return transaction
  }

  @Delete('/:id')
  async deleteCard (@Param('id', new ParseIntPipe()) id: CardPrimitive['id']): Promise<void> {
    await this.cardService.delete(id)
  }
}

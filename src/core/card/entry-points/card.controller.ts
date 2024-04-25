import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
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
import { type Card } from '../domain/card.entity'
import { CreateCardDTO, SWGCreateCardDTO } from '../domain/dto/create-card'
import { ReadCardService } from '../domain/service/read-card.service'
import { WriteCardService } from '../domain/service/write-card.service'
import { CardResponse } from './card.response'

@ApiTags('Card')
@Controller('account/:AccountIndex/card')
export class CardController {
  constructor (
    private readonly writeCardService: WriteCardService,
    private readonly readCardService: ReadCardService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: CardResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number
  ): Promise<Card[]> {
    const cards = await this.readCardService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    if (cards === null) {
      return []
    }

    return cards
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateCardDTO,
    response: CardResponse,
    status: 201
  })
  @Post()
  async create (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Body() data: CreateCardDTO
  ): Promise<Card> {
    const card = await this.writeCardService.create({
      idUser: UserData.id,
      AccountIndex,
      data
    })

    return card
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: CardResponse,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Card> {
    const card = await this.readCardService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (card === null) {
      throw new NotFoundException()
    }

    return card
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    response: CardResponse,
    status: 204
  })
  @Delete('/:index')
  async delete (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeCardService.delete({
      idUser: UserData.id,
      AccountIndex,
      index
    })
  }
}

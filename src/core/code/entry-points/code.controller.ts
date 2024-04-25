import { EntitiesName } from '@/constants/entities'
import { PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { JWTResponse } from '@/core/auth/entry-points/session.response'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Messages } from '@/messages'
import {
  BadRequestException,
  Body,
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
import { type Code } from '../domain/code.entity'
import { CreateCodeDTO, SWGCreateCodeDTO } from '../domain/dto/create-code'
import { ReadCodeService } from '../domain/service/read-code.service'
import { WriteCodeService } from '../domain/service/write-code.service'
import { CodeResponse } from './code.response'
import { type CodePrimitive } from '../domain/code.primitive'
import { type Token } from '@/core/auth/domain/token.entity'
import { SWGVerifyCodeDTO, VerifyCodeDTO } from '../domain/dto/verify-code'

@ApiTags('Code')
@Controller('code')
export class CodeController {
  constructor (
    private readonly writeCodeService: WriteCodeService,
    private readonly readCodeService: ReadCodeService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: CodeResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<Code[]> {
    const codes = await this.readCodeService.findAll({ idUser: UserData.id })

    return codes
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: CodeResponse,
    isArray: true,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('index') index: number
  ): Promise<Code> {
    const code = await this.readCodeService.findOne({ idUser: UserData.id, index })

    if (code === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.CODE))
    }

    return code
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: false,
    body: SWGCreateCodeDTO,
    response: CodeResponse,
    status: 201
  })
  @Post()
  async create (@Body() data: CreateCodeDTO): Promise<Code> {
    if (data.email === undefined && data.phoneNumber === undefined) {
      throw new BadRequestException()
    }

    return await this.writeCodeService.create({
      email: data.email,
      phoneNumber: data.phoneNumber
    })
  }

  /* ---------- verify ---------- */ // MARK: verify
  @ENDPOINT_INFO({
    auth: false,
    body: SWGVerifyCodeDTO,
    response: JWTResponse,
    status: 200
  })
  @Post('/:id')
  async verify (@Param('id') id: CodePrimitive['id'], @Body() data: VerifyCodeDTO): Promise<Token> {
    return await this.writeCodeService.validate({ id, code: data.code })
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
    await this.writeCodeService.delete({ idUser: UserData.id, index })
  }

  /* ---------- deleteAll ---------- */ // MARK: deleteAll
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @HttpCode(204)
  @Delete()
  async deleteAll (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<void> {
    await this.writeCodeService.deleteAll({ idUser: UserData.id })
  }
}

import { PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { type Token } from '@/core/auth/domain/token.entity'
import { TokenResponse } from '@/core/auth/entry-points/token.response'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { type Code } from '../domain/code.entity'
import { type CodePrimitive } from '../domain/code.primitive'
import { CreateCodeDTO, SWGCreateCodeDTO } from '../domain/dto/create-code'
import { SWGVerifyCodeDTO, VerifyCodeDTO } from '../domain/dto/verify-code'
import { WriteCodeService } from '../domain/service/write-code.service'
import { CodeResponse } from './code.response'

@ApiTags('Code')
@Controller('code')
export class CodeController {
  constructor (
    private readonly writeCodeService: WriteCodeService
  ) {}

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
    response: TokenResponse,
    status: 200
  })
  @Post('/:id')
  async verify (@Param('id') id: CodePrimitive['id'], @Body() data: VerifyCodeDTO): Promise<Token> {
    return await this.writeCodeService.validate({ id, code: data.code })
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

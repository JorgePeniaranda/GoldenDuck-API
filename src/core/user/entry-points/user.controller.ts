import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { Public } from '@/decorators/public.decorator'
import { UserErrorsMessages } from '@/messages/error/user'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Patch,
  Post,
  Request
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SWGCreateUserDTO } from '../domain/dto/create-user.dto'
import { SWGDeleteUserDTO } from '../domain/dto/delete-user.dto'
import { SWGFindUserDTO } from '../domain/dto/find-user.dto'
import { SWGUpdateUserDTO } from '../domain/dto/update-user.dto'
import { ReadUserService } from '../domain/service/read-user.service'
import { WriteUserService } from '../domain/service/write-user.service'
import { type User } from '../domain/user.entity'
import { UserResponse } from './user.response'

@ApiResponse({
  type: UserResponse
})
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (
    private readonly writeUserService: WriteUserService,
    private readonly readUserService: ReadUserService
  ) {}

  @ApiBearerAuth()
  @Get('/')
  async findByID (@Request() UserData: { user: PayloadPrimitive }): Promise<User> {
    const user = await this.readUserService.findByID({
      id: UserData.user.id
    })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }

  // @ApiBearerAuth()
  @Public()
  @Post()
  async create (@Body() user: SWGCreateUserDTO): Promise<User> {
    return await this.writeUserService.create(user)
  }

  @ApiBearerAuth()
  @Patch()
  async update (
    @Request() UserData: { user: PayloadPrimitive },
      @Body() data: SWGUpdateUserDTO
  ): Promise<User> {
    return await this.writeUserService.update({
      id: UserData.user.id,
      data
    })
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete()
  async delete (
    @Request() UserData: { user: PayloadPrimitive },
      @Body() data: SWGDeleteUserDTO
  ): Promise<void> {
    await this.writeUserService.delete({
      id: UserData.user.id,
      data
    })
  }

  @Public()
  @HttpCode(204)
  @Post('/find')
  async findOne (@Body() params: SWGFindUserDTO): Promise<void> {
    const user = await this.readUserService.findOne(params)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }
  }

  @HttpCode(204)
  @Get('/activate')
  async activate (@Request() UserData: { user: PayloadPrimitive }): Promise<'🤠'> {
    await this.writeUserService.activate({
      id: UserData.user.id
    })

    return '🤠'
  }
}

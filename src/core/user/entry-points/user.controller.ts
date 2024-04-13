import { type JwtPayload } from '@/core/auth/domain/payload.entity'
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
import { CreateUserDTO } from '../domain/dto/create-user.dto'
import { DeleteUserDTO } from '../domain/dto/delete-user.dto'
import { FindUserDTO } from '../domain/dto/find-user.dto'
import { UpdateUserDTO } from '../domain/dto/update-user.dto'
import { ReadUserService } from '../domain/service/read-user.service'
import { WriteUserService } from '../domain/service/write-user.service'
import { type User } from '../domain/user.entity'
import { type UserPrimitive } from '../domain/user.primitive'
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
  async findOne (@Request() UserData: { user: JwtPayload }): Promise<User> {
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
  async create (@Body() user: CreateUserDTO): Promise<User> {
    return await this.writeUserService.create(user)
  }

  @ApiBearerAuth()
  @Patch()
  async update (
    @Request() UserData: { user: JwtPayload },
      @Body() data: UpdateUserDTO
  ): Promise<UserPrimitive> {
    return await this.writeUserService.update({
      id: UserData.user.id,
      data
    })
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete()
  async delete (
    @Request() UserData: { user: JwtPayload },
      @Body() data: DeleteUserDTO
  ): Promise<void> {
    await this.writeUserService.delete({
      id: UserData.user.id,
      data
    })
  }

  @Public()
  @HttpCode(204)
  @Post('/find')
  async findUser (@Body() params: FindUserDTO): Promise<void> {
    const user = await this.readUserService.findOne(params)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }
  }

  @HttpCode(204)
  @Get('/activate')
  async activate (@Request() UserData: { user: JwtPayload }): Promise<'🤠'> {
    await this.writeUserService.activate({
      id: UserData.user.id
    })

    return '🤠'
  }
}

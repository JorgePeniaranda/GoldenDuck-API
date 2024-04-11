import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
import { Public } from '@/decorators/public.decorator'
import { UserErrorsMessages } from '@/messages/error/user'
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
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
    const user = await this.readUserService.findByID(UserData.user.id)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }

  @ApiBearerAuth()
  @Post()
  async createUser (@Body() user: CreateUserDTO): Promise<User> {
    return await this.writeUserService.createUser(user)
  }

  @Public()
  @Post('/find')
  async findUser (@Body() params: FindUserDTO): Promise<object> {
    const user = await this.readUserService.findOne(params)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }

  @ApiBearerAuth()
  @Patch('/:id')
  async updateUser (
    @Param('id', ParseIntPipe) id: UserPrimitive['id'],
      @Body() data: UpdateUserDTO
  ): Promise<UserPrimitive> {
    return await this.writeUserService.updateUser(id, data)
  }

  @Get('/activate')
  async activateUser (@Request() UserData: { user: JwtPayload }): Promise<'🤠'> {
    await this.writeUserService.activateUser(UserData.user.id)

    return '🤠'
  }

  @ApiBearerAuth()
  @Delete('/:id')
  async deleteUser (
    @Request() UserData: { user: JwtPayload },
      @Body() data: DeleteUserDTO
  ): Promise<void> {
    await this.writeUserService.deleteUser(UserData.user.id, data)
  }
}

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
  Post
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDTO } from '../domain/dto/create-user.dto'
import { DeleteUserDTO } from '../domain/dto/delete-user.dto'
import { FindUserDTO } from '../domain/dto/find-user.dto'
import { UpdateUserDTO } from '../domain/dto/update-user.dto'
import { ReadUserService } from '../domain/service/read-user.service'
import { WriteUserService } from '../domain/service/write-user.service'
import { type User } from '../domain/user.entity'
import { type UserPrimitive } from '../domain/user.primitive'
import { UserResponse } from './user.response'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (private readonly writeUserService: WriteUserService, private readonly readUserService: ReadUserService) {}

  @ApiCreatedResponse({
    description: 'Created User',
    type: UserResponse
  })
  @Post()
  async createUser (@Body() user: CreateUserDTO): Promise<User> {
    return await this.writeUserService.createUser(user)
  }

  @ApiOkResponse({
    description: 'Found User',
    type: UserResponse
  })
  @Post('/find')
  async findUser (@Body() params: FindUserDTO): Promise<object> {
    const user = await this.readUserService.findOne(params)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.UserNotFound)
    }

    return user
  }

  @ApiOkResponse({
    description: 'Updated User',
    type: UserResponse
  })
  @Patch('/:id')
  async updateUser (
    @Param('id', ParseIntPipe) id: UserPrimitive['id'],
      @Body() data: UpdateUserDTO
  ): Promise<UserPrimitive> {
    return await this.writeUserService.updateUser(id, data)
  }

  @Get('/activate/:id')
  async activateUser (): Promise<{ '🤠': string }> {
    return { '🤠': 'HOLA MUNDO!' } // <- falta implementar
  }

  @ApiOkResponse({
    description: 'User Deleted'
  })
  @ApiResponse({})
  @Delete('/:id')
  async deleteUser (
    @Param('id', ParseIntPipe) id: UserPrimitive['id'],
      @Body() data: DeleteUserDTO
  ): Promise<void> {
    await this.writeUserService.deleteUser(id, data)
  }
}

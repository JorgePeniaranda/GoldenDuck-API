import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { CreateUserDTO } from '../domain/dto/create-user.dto'
import { DeleteUserDTO } from '../domain/dto/delete-user.dto'
import { FindUserDTO } from '../domain/dto/find-user.dto'
import { IDUserDTO } from '../domain/dto/id-user.dto'
import { UpdateUserDTO } from '../domain/dto/update-user.dto'
import { UserUseCase } from '../domain/service/user.service'
import { type User } from '../domain/user.entity'
import { type UserPrimitive } from '../domain/user.primitive'
import { UserResponse } from './user.response'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  @ApiCreatedResponse({
    description: 'Created User',
    type: UserResponse
  })
  @Post()
  async createUser (@Body() user: CreateUserDTO): Promise<User> {
    return await this.userUseCase.createUser(user)
  }

  @ApiOkResponse({
    description: 'Found User',
    type: UserResponse
  })
  @Get('/:id')
  async findUser (@Body() params: FindUserDTO): Promise<object> {
    const user = await this.userUseCase.findUser(params)

    if (user === null) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  @ApiOkResponse({
    description: 'Updated User',
    type: UserResponse
  })
  @Put('/:id')
  async updateUser (
    @Param('id') id: IDUserDTO,
      @Body() data: UpdateUserDTO
  ): Promise<UserPrimitive> {
    return await this.userUseCase.updateUser(id, data)
  }

  // @Patch('/:id')
  // async activateUser (): Promise<User> {
  //   return await this.userUseCase.findUser(params)
  // }

  @ApiOkResponse({
    description: 'User Deleted'
  })
  @ApiResponse({})
  @Delete('/:id')
  async deleteUser (
    @Param() id: IDUserDTO,
      @Body() data: DeleteUserDTO
  ): Promise<void> {
    await this.userUseCase.deleteUser(id, data)
  }
}

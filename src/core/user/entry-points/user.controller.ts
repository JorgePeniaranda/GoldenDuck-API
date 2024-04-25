import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Messages } from '@/messages'
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDTO, SWGCreateUserDTO } from '../domain/dto/create-user.dto'
import { DeleteUserDTO, SWGDeleteUserDTO } from '../domain/dto/delete-user.dto'
import { FindUserDTO, SWGFindUserDTO } from '../domain/dto/find-user.dto'
import { SWGUpdateUserDTO, UpdateUserDTO } from '../domain/dto/update-user.dto'
import { ReadUserService } from '../domain/service/read-user.service'
import { WriteUserService } from '../domain/service/write-user.service'
import { type User } from '../domain/user.entity'
import { UserResponse } from './user.response'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (
    private readonly writeUserService: WriteUserService,
    private readonly readUserService: ReadUserService
  ) {}

  /* ---------- findByID ---------- */ // MARK: findByID
  @ENDPOINT_INFO({
    auth: true,
    response: UserResponse,
    status: 200
  })
  @Get('/')
  async findByID (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<User> {
    const user = await this.readUserService.findByID({
      id: UserData.id
    })

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    return user
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: false,
    body: SWGCreateUserDTO,
    response: UserResponse,
    status: 201
  })
  @Post()
  async create (@Body() user: CreateUserDTO): Promise<User> {
    return await this.writeUserService.create(user)
  }

  /* ---------- update ---------- */ // MARK: update
  @ENDPOINT_INFO({
    auth: true,
    body: SWGUpdateUserDTO,
    response: UserResponse,
    status: 200
  })
  @Patch()
  async update (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Body() data: UpdateUserDTO
  ): Promise<User> {
    return await this.writeUserService.update({
      id: UserData.id,
      data
    })
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    body: SWGDeleteUserDTO,
    status: 204
  })
  @Delete()
  async delete (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Body() data: DeleteUserDTO
  ): Promise<void> {
    await this.writeUserService.delete({
      id: UserData.id,
      data
    })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: false,
    body: SWGFindUserDTO,
    response: UserResponse,
    status: 200
  })
  @Post('/find')
  async findOne (@Body() params: FindUserDTO): Promise<void> {
    const user = await this.readUserService.findOne(params)

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }
  }

  /* ---------- activate ---------- */ // MARK: activate
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Get('/activate')
  async activate (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<'🤠'> {
    await this.writeUserService.activate({
      id: UserData.id
    })

    return '🤠'
  }
}

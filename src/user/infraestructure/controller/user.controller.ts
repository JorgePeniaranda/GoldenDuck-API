import { ChangeUserAddressDTO, ChangeUserEmailDTO, ChangeUserLastNameDTO, ChangeUserNameDTo, ChangeUserPasswordDTO, ChangeUserPhoneNumberDTO, ChangeUserRoleDTO, CreateUserDTO, DeleteUserDTO, GetUserDTO, UpdateUserDTO } from '@/user/application/dto/user.dto'
import { UserUseCase } from '@/user/application/usecase/user.usecase'
import { User } from '@/user/domain/user.entity'
import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiResponse({
  description: 'User',
  type: User
})
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  @Get()
  getHello (): string {
    return this.userUseCase.getHello()
  }

  @Post()
  createUser (@Body() form: CreateUserDTO): CreateUserDTO {
    return form
  }

  @Get('/:id')
  getUserByID (@Body() user: GetUserDTO): number {
    return user.id
  }

  @Post('/:id')
  activateUser (): string {
    return 'this.appService.getHello()'
  }

  @Put('/:id')
  updateUser (@Body() user: UpdateUserDTO): UpdateUserDTO {
    return user
  }

  @Patch('/:id/config/name')
  changeUserName (@Body() user: ChangeUserNameDTo): ChangeUserNameDTo {
    return user
  }

  @Patch('/:id/config/last-name')
  changeUserLastName (@Body() user: ChangeUserLastNameDTO): ChangeUserLastNameDTO {
    return user
  }

  @Patch('/:id/config/email')
  changeUserEmail (@Body() user: ChangeUserEmailDTO): ChangeUserEmailDTO {
    return user
  }

  @Patch('/:id/config/phone-number')
  changeUserPhoneNumber (@Body() user: ChangeUserPhoneNumberDTO): ChangeUserPhoneNumberDTO {
    return user
  }

  @Patch('/:id/config/password')
  changeUserPassword (@Body() user: ChangeUserPasswordDTO): ChangeUserPasswordDTO {
    return user
  }

  @Patch('/:id/config/address')
  changeUserAddress (@Body() user: ChangeUserAddressDTO): ChangeUserAddressDTO {
    return user
  }

  @Patch('/:id/config/role')
  changeUserRole (@Body() user: ChangeUserRoleDTO): ChangeUserRoleDTO {
    return user
  }

  @ApiResponse({})
  @Delete('/:id')
  deleteUser (@Body() { id }: DeleteUserDTO): number {
    return id
  }
}

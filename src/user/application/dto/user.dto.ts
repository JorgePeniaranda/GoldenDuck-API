import { User } from '@/user/domain/user.entity'
import { PickType } from '@nestjs/swagger'

export class UpdateUserDTO extends PickType(User, ['name', 'lastName', 'email', 'phoneNumber', 'password', 'address', 'birthDate']) {}

export class CreateUserDTO extends PickType(User, ['name', 'lastName', 'email', 'phoneNumber', 'password', 'address', 'birthDate', 'sex', 'role']) {}

export class GetUserDTO extends PickType(User, ['id']) {}

export class ChangeUserPasswordDTO extends PickType(User, ['password']) {}

export class ChangeUserEmailDTO extends PickType(User, ['email']) {}

export class ChangeUserRoleDTO extends PickType(User, ['role']) {}

export class ChangeUserPhoneNumberDTO extends PickType(User, ['phoneNumber']) {}

export class ChangeUserAddressDTO extends PickType(User, ['address']) {}

export class ChangeUserNameDTo extends PickType(User, ['name']) {}

export class ChangeUserLastNameDTO extends PickType(User, ['lastName']) {}

export class DeleteUserDTO extends PickType(User, ['id', 'password']) {}

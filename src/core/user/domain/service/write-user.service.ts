import { EventsMap } from '@/constants/events'
import { UserErrorsMessages } from '@/messages/error/user'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { type CreateUserDTO } from '../dto/create-user.dto'
import { type DeleteUserDTO } from '../dto/delete-user.dto'
import { type UpdateUserDTO } from '../dto/update-user.dto'
import { User } from '../user.entity'
import { type UserPrimitive } from '../user.primitive'
import { UserRepository } from '../user.repository'

@Injectable()
export class WriteUserService {
  constructor (
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create (data: CreateUserDTO): Promise<User> {
    const checkUser = await this.userRepository.findOne({
      dni: data.dni,
      email: data.email,
      phoneNumber: data.phoneNumber
    })

    if (checkUser !== null) {
      throw new ConflictException(UserErrorsMessages.AlreadyExist)
    }

    const newUser = User.create(data)

    const user = await this.userRepository.create(newUser)

    this.eventEmitter.emit(EventsMap.USER_CREATED, user.toJSON())
    // TO-DO: send notification with url to email

    return user
  }

  async activate ({ id }: { id: UserPrimitive['id'] }): Promise<User> {
    const user = await this.userRepository.findByID({ id })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    user.actived = true

    this.eventEmitter.emit(EventsMap.USER_ACTIVATED, user.toJSON())

    return await this.userRepository.update(user)
  }

  async update ({ id, data }: { id: UserPrimitive['id'], data: UpdateUserDTO }): Promise<User> {
    const user = await this.userRepository.findByID({ id })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    if (data.name !== undefined) user.name = data.name
    if (data.lastName !== undefined) user.lastName = data.lastName
    if (data.email !== undefined) user.email = data.email
    if (data.phoneNumber !== undefined) user.phoneNumber = data.phoneNumber
    if (data.password !== undefined) {
      user.password = data.password
      this.eventEmitter.emit(EventsMap.USER_PASSWORD_UPDATED, user.toJSON())
    }
    if (data.address !== undefined) user.address = data.address
    if (data.imgUrl !== undefined) user.imgUrl = data.imgUrl
    if (data.role !== undefined) user.role = data.role // ??

    return await this.userRepository.update(user)

    // TO-DO: send notification to account email
  }

  async delete ({ id, data }: { id: UserPrimitive['id'], data: DeleteUserDTO }): Promise<void> {
    const user = await this.userRepository.findByID({ id })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    if (!user.comparePassword(data.password)) {
      throw new UnauthorizedException(UserErrorsMessages.NotFound)
    }

    this.eventEmitter.emit(EventsMap.USER_DELETED, user.toJSON())

    await this.userRepository.delete(user)
  }
}

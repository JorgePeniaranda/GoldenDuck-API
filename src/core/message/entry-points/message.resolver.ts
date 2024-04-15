import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { User } from '@/core/user/domain/user.entity'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { UserErrorsMessages } from '@/messages/error/user'
import { Body, NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CreateMessageDTO } from '../domain/dto/create-message'
import { UpdateMessageDTO } from '../domain/dto/update-message'
import { Message } from '../domain/message.entity'
import { type MessagePrimitive } from '../domain/message.primitive'
import { ReadMessageService } from '../domain/service/read-messages.service'
import { WriteMessageService } from '../domain/service/write-messages.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => Message)
export class MessageResolver {
  constructor (
    private readonly writeMessageService: WriteMessageService,
    private readonly readMessageService: ReadMessageService,
    private readonly readUserService: ReadUserService
  ) {}

  @Query(() => Message, { name: 'find_all_message' })
  async findAll (@CurrentUser() UserData: PayloadPrimitive): Promise<Message[]> {
    const messages = await this.readMessageService.findAll({ idUser: UserData.id })

    return messages
  }

  @Query(() => [Message], { name: 'find_message_history' })
  async findHistory (@CurrentUser() UserData: PayloadPrimitive): Promise<Message[]> {
    const messages = await this.readMessageService.findHistory({
      idUser: UserData.id
    })

    return messages
  }

  @Query(() => Message, { name: 'find_chat' })
  async findChat (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int })
      idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  ): Promise<Message[]> {
    const messages = await this.readMessageService.findChat({
      idUser: UserData.id,
      idTarget
    })

    return messages
  }

  @Mutation(() => Message, { name: 'create_message' })
  async create (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Body() data: CreateMessageDTO
  ): Promise<Message> {
    const message = await this.writeMessageService.create({
      idSender: UserData.id,
      idTarget,
      data
    })

    return message
  }

  @Query(() => Message, { name: 'find_one_message' })
  async findOne (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Args('index', { type: () => Int }) index: number
  ): Promise<Message> {
    const message = await this.readMessageService.findOne({
      idUser: UserData.id,
      idTarget,
      index
    })

    if (message === null) {
      throw new NotFoundException()
    }

    return message
  }

  @Mutation(() => Message, { name: 'update_message' })
  async update (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Args('index', { type: () => Int }) index: number,
      @Body() data: UpdateMessageDTO
  ): Promise<Message> {
    const message = await this.writeMessageService.update({
      idUser: UserData.id,
      idTarget,
      index,
      data
    })

    if (message === null) {
      throw new NotFoundException()
    }

    return message
  }

  @Mutation(() => Message, { name: 'delete_message' })
  async delete (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeMessageService.delete({
      idUser: UserData.id,
      idTarget,
      index
    })
  }

  @Mutation(() => Message, { name: 'read_message' })
  async read (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeMessageService.read({
      idUser: UserData.id,
      idTarget,
      index
    })
  }

  @ResolveField(() => User)
  async sender (@Parent() message: Message): Promise<User> {
    const sender = await this.readUserService.findByID({
      id: message.idSender
    })

    if (sender === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return sender
  }

  @ResolveField(() => User)
  async receiver (@Parent() message: Message): Promise<User> {
    const receiver = await this.readUserService.findByID({
      id: message.idReceiver
    })

    if (receiver === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return receiver
  }
}

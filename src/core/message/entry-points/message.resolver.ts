import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { User } from '@/core/user/domain/user.entity'
import { CurrentGQLUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { Messages } from '@/messages'
import { Body, NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GQLCreateMessageDTO } from '../domain/dto/create-message'
import { GQLUpdateMessageDTO } from '../domain/dto/update-message'
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

  /* ---------- findAll ---------- */ // MARK: findAll
  @Query(() => Message, { name: 'find_all_message' })
  async findAll (@CurrentGQLUser() UserData: PayloadPrimitive): Promise<Message[]> {
    const messages = await this.readMessageService.findAll({ idUser: UserData.id })

    return messages
  }

  /* ---------- findHistory ---------- */ // MARK: findHistory
  @Query(() => [Message], { name: 'find_message_history' })
  async findHistory (@CurrentGQLUser() UserData: PayloadPrimitive): Promise<Message[]> {
    const messages = await this.readMessageService.findHistory({
      idUser: UserData.id
    })

    return messages
  }

  /* ---------- findChat ---------- */ // MARK: findChat
  @Query(() => Message, { name: 'find_chat' })
  async findChat (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int })
      idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  ): Promise<Message[]> {
    const messages = await this.readMessageService.findChat({
      idUser: UserData.id,
      idTarget
    })

    return messages
  }

  /* ---------- create ---------- */ // MARK: create
  @Mutation(() => Message, { name: 'create_message' })
  async create (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Body() data: GQLCreateMessageDTO
  ): Promise<Message> {
    const message = await this.writeMessageService.create({
      idSender: UserData.id,
      idTarget,
      data
    })

    return message
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @Query(() => Message, { name: 'find_one_message' })
  async findOne (
    @CurrentGQLUser() UserData: PayloadPrimitive,
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

  /* ---------- update ---------- */ // MARK: update
  @Mutation(() => Message, { name: 'update_message' })
  async update (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Args('index', { type: () => Int }) index: number,
      @Body() data: GQLUpdateMessageDTO
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

  /* ---------- delete ---------- */ // MARK: delete
  @Mutation(() => Message, { name: 'delete_message' })
  async delete (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeMessageService.delete({
      idUser: UserData.id,
      idTarget,
      index
    })
  }

  /* ---------- read ---------- */ // MARK: read
  @Mutation(() => Message, { name: 'read_message' })
  async read (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('idTarget', { type: () => Int }) idTarget: MessagePrimitive['idReceiver'],
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeMessageService.read({
      idUser: UserData.id,
      idTarget,
      index
    })
  }

  /* ---------- sender ---------- */ // MARK: sender
  @ResolveField(() => User)
  async sender (@Parent() message: Message): Promise<User> {
    const sender = await this.readUserService.findByID({
      id: message.idSender
    })

    if (sender === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    return sender
  }

  /* ---------- receiver ---------- */ // MARK: receiver
  @ResolveField(() => User)
  async receiver (@Parent() message: Message): Promise<User> {
    const receiver = await this.readUserService.findByID({
      id: message.idReceiver
    })

    if (receiver === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    return receiver
  }
}

import { type MessagePrimitive } from './messages.primitive'

export class Message implements MessagePrimitive {
  id: MessagePrimitive['id']
  idSender: MessagePrimitive['idSender']
  idReceiver: MessagePrimitive['idReceiver']
  message: MessagePrimitive['message']
  read: MessagePrimitive['read']
  updatedAt: MessagePrimitive['updatedAt']
  createdAt: MessagePrimitive['createdAt']
  deleted: MessagePrimitive['deleted']

  constructor (props: MessagePrimitive) {
    this.id = props.id
    this.idSender = props.idSender
    this.idReceiver = props.idReceiver
    this.message = props.message
    this.read = props.read
    this.updatedAt = props.updatedAt
    this.createdAt = props.createdAt
    this.deleted = props.deleted
  }
}

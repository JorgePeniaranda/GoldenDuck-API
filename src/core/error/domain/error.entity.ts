import { type ErrorPrimitive } from './error.primitive'

export class Error implements ErrorPrimitive {
  id: ErrorPrimitive['id']
  name: ErrorPrimitive['name']
  message: ErrorPrimitive['message']
  stack: ErrorPrimitive['stack']
  updatedAt: ErrorPrimitive['updatedAt']
  createdAt: ErrorPrimitive['createdAt']
  deleted: ErrorPrimitive['deleted']

  constructor (transaction: ErrorPrimitive) {
    this.id = transaction.id
    this.name = transaction.name
    this.message = transaction.message
    this.stack = transaction.stack
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }
}

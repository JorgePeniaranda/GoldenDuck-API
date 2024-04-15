import { type Error } from '@prisma/client'

export interface ErrorPrimitive {
  readonly id: Error['id']
  readonly name: Error['name']
  readonly message: Error['message']
  readonly stack: Error['stack']
  updatedAt: Error['updatedAt']
  readonly createdAt: Error['createdAt']
  deleted: Error['deleted']
}

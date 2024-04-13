import { type Error } from '@prisma/client'

export interface ErrorPrimitive {
  readonly id: Error['id']
  name: Error['name']
  message: Error['message']
  stack: Error['stack']
  updatedAt: Error['updatedAt']
  readonly createdAt: Error['createdAt']
  deleted: Error['deleted']
}

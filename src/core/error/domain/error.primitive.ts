import { type Error } from '@prisma/client'

export interface ErrorPrimitive {
  id: Error['id']
  name: Error['name']
  message: Error['message']
  stack: Error['stack']
  updatedAt: Error['updatedAt']
  createdAt: Error['createdAt']
  deleted: Error['deleted']
}

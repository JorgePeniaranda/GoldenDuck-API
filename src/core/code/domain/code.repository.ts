import { type Code } from './code.entity'
import { type CodePrimitive } from './code.primitive'

export interface CategoryRepository {
  create: (data: Code) => Promise<Code>
  findAll: ({ idUser }: { idUser: CodePrimitive['idUser'] }) => Promise<Code[]>
  findOne: ({
    idUser,
    index
  }: {
    idUser: CodePrimitive['idUser']
    index: number
  }) => Promise<Code | null>
  findOneByID: ({
    id
  }: {
    id: CodePrimitive['id']
  }) => Promise<Code | null>
  delete: (data: Code) => Promise<void>
  deleteAll: ({ idUser }: { idUser: CodePrimitive['idUser'] }) => Promise<void>
}

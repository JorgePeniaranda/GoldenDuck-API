import { type Code } from './code.entity'
import { type CodePrimitive } from './code.primitive'

export interface CategoryRepository {
  create: (data: Code) => Promise<Code>
  findLast: ({ idUser }: { idUser: CodePrimitive['idUser'] }) => Promise<Code | null>
  deleteAll: ({ idUser }: { idUser: CodePrimitive['idUser'] }) => Promise<void>
}

import { Inject, Injectable } from '@nestjs/common'
import { type Code } from '../code.entity'
import { type CodePrimitive } from '../code.primitive'
import { CategoryRepository } from '../code.repository'

@Injectable()
export class ReadCodeService {
  constructor (
    @Inject('CodeRepository')
    private readonly CodeRepository: CategoryRepository
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({ idUser }: { idUser: CodePrimitive['idUser'] }): Promise<Code[]> {
    return await this.CodeRepository.findAll({ idUser })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    index
  }: {
    idUser: CodePrimitive['idUser']
    index: number
  }): Promise<Code | null> {
    return await this.CodeRepository.findOne({ idUser, index })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOneByID ({ id }: { id: CodePrimitive['id'] }): Promise<Code | null> {
    return await this.CodeRepository.findByID({ id })
  }
}

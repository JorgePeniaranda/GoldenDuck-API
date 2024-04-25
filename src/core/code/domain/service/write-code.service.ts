import { EntitiesName } from '@/constants/entities'
import { EventsMap } from '@/constants/events'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { Messages } from '@/messages'
import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { v4 as UUID } from 'uuid'
import { Code } from '../code.entity'
import { CodeType, type CodePrimitive } from '../code.primitive'
import { CategoryRepository } from '../code.repository'
import { type CreateCodeDTO } from '../dto/create-code'
import { AuthService } from '@/core/auth/domain/service/auth.service'
import { type Token } from '@/core/auth/domain/token.entity'
import { VALIDATION_CODE_LENGTH } from '@/constants'

@Injectable()
export class WriteCodeService {
  constructor (
    @Inject('CodeRepository')
    private readonly codeRepository: CategoryRepository,
    private readonly readUserService: ReadUserService,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /* ---------- create ---------- */ // MARK: create
  public async create ({ email, phoneNumber }: CreateCodeDTO): Promise<Code> {
    const user = await this.readUserService.findOne({ email, phoneNumber })

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    await this.deleteAll({ idUser: user.id })

    const validationCode = UUID().replace(/-/g, '').slice(0, VALIDATION_CODE_LENGTH).toUpperCase()
    const code = Code.create({
      idUser: user.id,
      code: validationCode,
      type: email !== undefined ? CodeType.EMAIL : CodeType.PHONE
    })

    Logger.debug(`Code created: ${validationCode}`) // FOR DEVELOPMENT ONLY

    this.eventEmitter.emit(EventsMap.CODE_CREATED, code.toJSON()) // implement

    return await this.codeRepository.create(code)
  }

  /* ---------- validate ---------- */ // MARK: validate
  public async validate ({
    id,
    code: input
  }: {
    id: CodePrimitive['id']
    code: CodePrimitive['code']
  }): Promise<Token> {
    const code = await this.codeRepository.findByID({
      id
    })

    if (code === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.CODE))
    }

    if (code.expired || !code.compare(input)) {
      throw new UnauthorizedException()
    }

    const user = await this.readUserService.findByID({ id: code.idUser })

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    return await this.authService.login(user)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete ({
    idUser,
    index
  }: {
    idUser: CodePrimitive['idUser']
    index: number
  }): Promise<void> {
    const code = await this.codeRepository.findOne({
      idUser,
      index
    })

    if (code === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.CATEGORY))
    }

    await this.codeRepository.delete(code)
  }

  /* ---------- deleteAll ---------- */ // MARK: deleteAll
  public async deleteAll ({ idUser }: { idUser: CodePrimitive['idUser'] }): Promise<void> {
    await this.codeRepository.deleteAll({ idUser })
  }
}

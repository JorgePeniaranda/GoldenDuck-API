import jwt from 'jsonwebtoken'
import {
  type TokenExpiration,
  TokenType,
  type TokenEntity
} from './token.entity'
import { ConfigError, ValidationError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'

export class Token implements TokenEntity {
  readonly id: TokenEntity['id']
  readonly key: TokenEntity['key']
  readonly role: TokenEntity['role']
  readonly body: TokenEntity['body']
  readonly type: TokenEntity['type']

  constructor ({
    token,
    id,
    role,
    type
  }: {
    token: TokenEntity['key']
    id: TokenEntity['id']
    role: TokenEntity['role']
    type: TokenEntity['type']
  }) {
    if (typeof process.env.JWT_SECRET !== 'string') {
      throw new ConfigError(ErrorsDictionary.NoVariableEnv('JWT_SECRET'))
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: TokenType[type],
      subject: String(id.value)
    })

    if (typeof tokenData !== 'object') {
      throw new ValidationError(ErrorsDictionary.InvalidToken)
    }

    this.key = token
    this.id = id
    this.role = role
    this.body = tokenData
    this.type = type
  }

  public static verify (token: TokenEntity['key']): boolean {
    if (typeof process.env.JWT_SECRET !== 'string') {
      throw new ConfigError(ErrorsDictionary.NoVariableEnv('JWT_SECRET'))
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    })

    if (typeof tokenData !== 'object') {
      return false
    }

    return true
  }

  public static create (
    id: TokenEntity['id'],
    type: TokenEntity['type'],
    role: TokenEntity['role'],
    expiresIn: TokenExpiration,
    body: TokenEntity['body'] = {}
  ): Token {
    if (typeof process.env.JWT_SECRET !== 'string') {
      throw new ConfigError(ErrorsDictionary.NoVariableEnv('JWT_SECRET'))
    }

    const createdJWT = jwt.sign(body, process.env.JWT_SECRET, {
      expiresIn,
      algorithm: 'HS256',
      issuer: TokenType[type],
      audience: role.value,
      subject: String(id.value)
    })

    return new Token({ token: createdJWT, id, type, role })
  }

  public getID (): TokenEntity['id'] {
    return this.id
  }

  public getRole (): TokenEntity['role'] {
    return this.role
  }

  public getData (): TokenEntity['body'] {
    return this.body
  }
}

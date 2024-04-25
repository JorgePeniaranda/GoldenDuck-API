import { applyDecorators, HttpCode, UseGuards, type Type } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiProduces,
  ApiResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Public } from './public.decorator'
import { Roles } from './roles.decorator'
import { type UserPrimitive } from '@/core/user/domain/user.primitive'
import { JwtAuthGuard } from '@/guard/jwt.guard'

export const ENDPOINT_INFO = ({
  auth = true,
  status = 200,
  description = 'Success',
  roles,
  response,
  body,
  isArray = false,
  produces = 'application/json'
}: {
  auth?: boolean
  status?: number
  description?: string
  roles?: Array<UserPrimitive['role']>
  response?: Type<unknown> | string
  body?: Type<unknown> | string
  isArray?: boolean
  produces?: string
}): any => {
  const decorators = []

  if (body !== undefined) {
    decorators.push(ApiBody({ type: body }))
  }

  if (auth) {
    decorators.push(ApiBearerAuth())
    decorators.push(UseGuards(JwtAuthGuard))
    decorators.push(
      ApiUnauthorizedResponse({
        description: 'No Authenticated'
      })
    )
  }

  if (!auth) {
    decorators.push(Public())
  }

  if (roles !== undefined && auth) {
    decorators.push(Roles(...roles))
    decorators.push(
      ApiForbiddenResponse({
        description: 'No Authorized'
      })
    )
  }

  decorators.push(ApiProduces(produces))
  decorators.push(ApiResponse({ status, description, type: response, isArray }))
  decorators.push(
    ApiNotFoundResponse({
      description: 'Not Found'
    })
  )
  decorators.push(HttpCode(status))

  return applyDecorators(...decorators)
}

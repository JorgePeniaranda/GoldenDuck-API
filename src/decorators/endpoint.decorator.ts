import { applyDecorators, HttpCode, type Type } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiProduces, ApiResponse } from '@nestjs/swagger'
import { Public } from './public.decorator'

export const ENDPOINT_INFO = ({
  auth = true,
  status = 200,
  description = 'Success',
  response,
  body,
  isArray = false,
  produces = 'application/json'
}: {
  auth?: boolean
  status?: number
  description?: string
  response?: Type<unknown> | string
  body?: Type<unknown> | string
  isArray?: boolean
  produces?: string
}): any => {
  const decorators = [HttpCode(status)]

  if (response !== undefined) {
    decorators.push(ApiProduces(produces))
    decorators.push(ApiResponse({ status, description, type: response, isArray }))
  }

  if (body !== undefined) {
    decorators.push(ApiBody({ type: body }))
  }

  if (auth) {
    decorators.push(ApiBearerAuth())
  }

  if (!auth) {
    decorators.push(Public())
  }

  return applyDecorators(...decorators)
}

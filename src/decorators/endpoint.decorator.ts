import { applyDecorators, HttpCode, type Type } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiProduces, ApiResponse } from '@nestjs/swagger'
import { Public } from './public.decorator'

export const ENDPOINT_INFO = ({
  auth = true,
  status = 200,
  description = 'Success',
  response = undefined,
  body = undefined,
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
  const Auth = auth ? ApiBearerAuth : Public

  return applyDecorators(
    Auth(),
    ApiProduces(produces),
    ApiResponse({ status, description, type: response ?? Object, isArray }),
    ApiBody({
      type: body ?? Object
    }),
    HttpCode(status)
  )
}

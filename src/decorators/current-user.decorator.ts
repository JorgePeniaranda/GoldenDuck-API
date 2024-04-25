import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentGQLUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().req.user
})

export const CurrentAPIUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user
})

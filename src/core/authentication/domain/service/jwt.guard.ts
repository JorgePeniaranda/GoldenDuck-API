import { IS_PUBLIC_ENDPOINT_KEY } from '@/constants/app'
import { type ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor (private readonly reflector: Reflector) {
    super()
  }

  override async canActivate (context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ENDPOINT_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (isPublic) {
      return true
    }
    return await super.canActivate(context)
  }
}

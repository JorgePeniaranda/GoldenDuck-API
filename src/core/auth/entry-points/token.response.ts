import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

export class TokenResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    type: String
  })
  @IsString()
  @Expose()
  readonly token: string
}

import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { SharpPipe } from '@/pipes/sharp.pipe'
import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { createReadStream } from 'fs'
import { join } from 'path'

@ApiTags('Profile-Picture')
@Controller('profile-picture')
export class ProfilePictureController {
  /* ---------- find ---------- */ // MARK: find
  @ENDPOINT_INFO({
    auth: true,
    produces: 'image/webp',
    status: 200
  })
  @Get('/:path')
  @UseInterceptors(FileInterceptor('file'))
  find (@Param('path') image: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'uploads/' + image + '.webp'))

    return new StreamableFile(file, {
      type: 'image/webp'
    })
  }

  /* ---------- upload ---------- */ // MARK: upload
  @ENDPOINT_INFO({
    auth: true,
    status: 201
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('profile-picture'))
  upload (@UploadedFile(SharpPipe) filename: string): { filename: string, path: string } {
    return {
      filename,
      path: `/profile-picture/${filename.split('.')[0]}`
    }
  }
}

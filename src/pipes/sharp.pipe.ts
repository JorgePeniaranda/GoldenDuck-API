import { Injectable, type PipeTransform } from '@nestjs/common'
import * as path from 'path'
import sharp from 'sharp'
import { v4 as UUID } from 'uuid'

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform (image: Express.Multer.File): Promise<string> {
    const uuid = UUID()
    const filename = uuid.replace(/-/g, '') + '.webp'

    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join('uploads', filename))

    return filename
  }
}

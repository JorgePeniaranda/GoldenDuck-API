import { Module } from '@nestjs/common'
import { ProfilePictureController } from './profile-picture.controller'

@Module({
  controllers: [ProfilePictureController]
})
export class ProfilePictureModule {}

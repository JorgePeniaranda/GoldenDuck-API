import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import './utils/fixes'
import { findAvailablePort } from './utils/server'

async function bootstrap (): Promise<void> {
  const appOptions = { cors: true }
  const app = await NestFactory.create(AppModule, appOptions)

  const config = new DocumentBuilder()
    .setTitle('Golden Duck')
    .setDescription('Online banking platform for money management, investments, and essential service payments.')
    .setVersion('3.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))

  await findAvailablePort(app, 3000)
}

bootstrap() // eslint-disable-line @typescript-eslint/no-floating-promises

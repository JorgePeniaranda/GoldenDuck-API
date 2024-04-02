import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { DEFAULT_APP_PORT } from './constants'
import './utils/fixes'
import { findAvailablePort, getEnvValue } from './utils/server'

const port = getEnvValue('APP_PORT', String(DEFAULT_APP_PORT))

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  /* configure project */
  app.enableCors()
  app.use(helmet())
  app.use(compression())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true
    })
  )

  /* add documentation */
  const config = new DocumentBuilder()
    .setTitle('Golden Duck')
    .setDescription(
      'Online banking platform for money management, investments, and essential service payments.'
    )
    .setVersion('3.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  /* start server */
  await findAvailablePort(app, port)
}

bootstrap() // eslint-disable-line @typescript-eslint/no-floating-promises

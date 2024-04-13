import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { APP_DESCRIPTION, APP_NAME, APP_VERSION, SWAGGER_PATH } from './constants'
import { env } from './constants/env'
import { AuthModule } from './core/authentication/auth.module'
import { JwtAuthGuard } from './guard/jwt.guard'
import './helpers/fixes'
import { findAvailablePort } from './helpers/server'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const guard = app.select(AuthModule).get(JwtAuthGuard)

  /* configure project */
  app.useGlobalGuards(guard)
  // app.enableCors()
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
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(APP_VERSION)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(SWAGGER_PATH, app, document)

  /* start server */
  await findAvailablePort(app, env.APP_PORT)
}

bootstrap() // eslint-disable-line @typescript-eslint/no-floating-promises

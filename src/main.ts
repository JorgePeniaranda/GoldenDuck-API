import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { UserModule } from './user/infraestructure/module/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap (): Promise<void> {
  const appOptions = { cors: true }
  const app = await NestFactory.create(UserModule, appOptions)

  const config = new DocumentBuilder()
    .setTitle('Golden Duck')
    .setDescription('Online banking platform for money management, investments, and essential service payments.')
    .setVersion('3.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

bootstrap() // eslint-disable-line @typescript-eslint/no-floating-promises

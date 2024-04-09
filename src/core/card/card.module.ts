import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { CardRepositoryPrismaMySQL } from './data-access/card-prisma-mysql.repository'
import { CardService } from './domain/service/card.service'
import { CardController } from './entry-points/card.controller'

@Module({
  controllers: [CardController],
  providers: [
    CardService,
    {
      provide: 'CardRepository',
      useClass: CardRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class CardModule {}

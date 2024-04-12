import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { AccountModule } from '../account/account.module'
import { CardRepositoryPrismaMySQL } from './data-access/card-prisma-mysql.repository'
import { ReadCardService } from './domain/service/read-card.service'
import { WriteCardService } from './domain/service/write-card.service'
import { CardController } from './entry-points/card.controller'

@Module({
  imports: [AccountModule],
  controllers: [CardController],
  providers: [
    WriteCardService,
    ReadCardService,
    {
      provide: 'CardRepository',
      useClass: CardRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadCardService]
})
export class CardModule {}

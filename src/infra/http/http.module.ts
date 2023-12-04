import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { ServiceModule } from '../services/service.module'
import { CreateTransactionController } from './controllers/create-transaction.controller'

@Module({
  imports: [DatabaseModule, ServiceModule],
  controllers: [CreateTransactionController],
  providers: [CreateTransactionUseCase],
})
export class HttpModule {}

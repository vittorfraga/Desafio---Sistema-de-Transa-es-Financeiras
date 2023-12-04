import { TransactionsRepository } from '@/domain/repositories/transaction-repository'
import { UsersRepository } from '@/domain/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaTransactionsRepository } from './prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-respository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, TransactionsRepository],
})
export class DatabaseModule {}

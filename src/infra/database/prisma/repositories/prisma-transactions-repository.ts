import { Transaction } from '@/domain/entities/transaction'
import { TransactionsRepository } from '@/domain/repositories/transaction-repository'
import { Injectable } from '@nestjs/common'
import { PrismaTransactionMapper } from '../../mappers/prisma-transaction-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
    })

    if (!transaction) return null

    return PrismaTransactionMapper.toDomain(transaction)
  }
  async create(transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction)

    await this.prismaService.transaction.create({ data })
  }
}

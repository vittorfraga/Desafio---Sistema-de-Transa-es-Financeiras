import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/entities/transaction'
import { Prisma, Transaction as PrismaTransaction } from '@prisma/client'

export class PrismaTransactionMapper {
  static toDomain(raw: PrismaTransaction): Transaction {
    return Transaction.create(
      {
        payerId: new UniqueEntityID(raw.payeeId),
        payeeId: new UniqueEntityID(raw.payeeId),
        value: raw.value,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    transaction: Transaction,
  ): Prisma.TransactionUncheckedCreateInput {
    return {
      id: transaction.id.toString(),
      payerId: transaction.payerId.toString(),
      payeeId: transaction.payeeId.toString(),
      value: transaction.value,
      createdAt: transaction.createdAt,
    }
  }
}

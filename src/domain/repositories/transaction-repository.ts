import { Transaction } from '../entities/transaction'

export abstract class TransactionsRepository {
  abstract findById(id: string): Promise<Transaction | null>
  abstract create(transaction: Transaction): Promise<void>
}

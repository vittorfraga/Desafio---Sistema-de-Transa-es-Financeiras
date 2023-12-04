import { Transaction } from '@/domain/entities/transaction'
import { TransactionsRepository } from '@/domain/repositories/transaction-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async findMany() {
    return null
  }

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id.toString() === id)
    if (!transaction) {
      return null
    }
    return transaction
  }

  async create(transaction: Transaction) {
    this.items.push(transaction)
  }
}

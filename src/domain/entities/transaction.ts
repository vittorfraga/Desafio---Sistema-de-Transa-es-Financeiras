import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface TransactionProps {
  payerId: UniqueEntityID
  payeeId: UniqueEntityID
  value: number
  createdAt: Date
}

export class Transaction extends Entity<TransactionProps> {
  get payerId(): string {
    return this.props.payerId.toString()
  }

  get payeeId(): string {
    return this.props.payeeId.toString()
  }

  get value(): number {
    return this.props.value
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  static create(props: TransactionProps, id?: UniqueEntityID): Transaction {
    const transaction = new Transaction({ ...props, createdAt: new Date() }, id)
    return transaction
  }
}

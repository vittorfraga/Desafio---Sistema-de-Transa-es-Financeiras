import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ExternalAuthorizationService } from '@/domain/services/external-authorization.service'
import { Injectable } from '@nestjs/common'
import { Transaction } from '../entities/transaction'
import { TransactionsRepository } from '../repositories/transaction-repository'
import { UsersRepository } from '../repositories/user-repository'
import { SendNotificationService } from '../services/send-notification.service'
import {
  BusinessUserTransactionError,
  InsufficientBalanceError,
  PayeeNotFoundError,
  PayerNotFoundError,
  UnauthorizedTransactionError,
} from './errors/errors'

export interface CreateTransactionUseCaseRequest {
  payerId: string
  payeeId: string
  value: number
}

export interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private transactionsRepository: TransactionsRepository,
    private authorizationService: ExternalAuthorizationService,
    private sendNotificationService: SendNotificationService,
  ) {}
  async execute({
    payerId,
    payeeId,
    value,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const payer = await this.usersRepository.findById(payerId)
    const payee = await this.usersRepository.findById(payeeId)

    if (!payer) throw new PayerNotFoundError()
    if (!payee) throw new PayeeNotFoundError()
    if (payer.balance < value) throw new InsufficientBalanceError()
    if (payer.userType === 'BUSINESS') throw new BusinessUserTransactionError()

    const newPayerBalance = payer.balance - value
    const newPayeeBalance = payee.balance + value
    const transaction = Transaction.create({
      payerId: new UniqueEntityID(payerId),
      payeeId: new UniqueEntityID(payeeId),
      value,
      createdAt: new Date(),
    })

    if (!(await this.authorizationService.isAuthorized()))
      throw new UnauthorizedTransactionError()

    payer.balance = newPayerBalance
    payee.balance = newPayeeBalance
    await this.usersRepository.save(payer)
    await this.usersRepository.save(payee)
    await this.transactionsRepository.create(transaction)

    await this.sendNotificationService.sendEmailNotification(payee.email)

    return {
      transaction,
    }
  }
}

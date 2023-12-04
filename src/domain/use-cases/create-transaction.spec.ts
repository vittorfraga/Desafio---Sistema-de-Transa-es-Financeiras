import { makeUser } from 'test/factories/make-user'
import { InMemoryTransactionsRepository } from 'test/in-memory-transaction-repository'
import { InMemoryUsersRepository } from 'test/in-memory-user-repository'
import { UserType } from '../entities/user'
import { ExternalAuthorizationService } from '../services/external-authorization.service'
import { SendNotificationService } from '../services/send-notification.service'
import {
  CreateTransactionUseCase,
  CreateTransactionUseCaseRequest,
} from './create-transaction'
import {
  BusinessUserTransactionError,
  InsufficientBalanceError,
  UnauthorizedTransactionError,
} from './errors/errors'

describe('CreateTransactionUseCase', () => {
  let usersRepository: InMemoryUsersRepository
  let transactionsRepository: InMemoryTransactionsRepository
  let authorizationService: ExternalAuthorizationService
  let sendNotificationService: SendNotificationService
  let sut: CreateTransactionUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    ;(authorizationService = {
      isAuthorized: vi.fn(() => Promise.resolve(true)),
    }),
      (sendNotificationService = {
        sendEmailNotification: vi.fn(() => Promise.resolve()),
      })
    sut = new CreateTransactionUseCase(
      usersRepository,
      transactionsRepository,
      authorizationService,
      sendNotificationService,
    )
  })

  it('should successfully create a transaction when authorized', async () => {
    const payer = makeUser({ balance: 100, userType: UserType.INDIVIDUAL })
    const payee = makeUser()
    usersRepository.create(payer)
    usersRepository.create(payee)

    const request: CreateTransactionUseCaseRequest = {
      payerId: payer.id.toString(),
      payeeId: payee.id.toString(),
      value: 50,
    }

    const response = await sut.execute(request)

    console.log(response)

    expect(response.transaction).toBeDefined()
    expect(payer.balance).toBe(50)
    expect(payee.balance).toBe(50)
  })

  it('should throw an error if the transaction is not authorized', async () => {
    const payer = makeUser({ balance: 100, userType: UserType.INDIVIDUAL })
    const payee = makeUser()
    usersRepository.create(payer)
    usersRepository.create(payee)

    authorizationService.isAuthorized = vi.fn(() => Promise.resolve(false))

    const request: CreateTransactionUseCaseRequest = {
      payerId: payer.id.toString(),
      payeeId: payee.id.toString(),
      value: 50,
    }

    await expect(sut.execute(request)).rejects.toThrow(
      UnauthorizedTransactionError,
    )
  })

  it('should throw an error if the payer has insufficient balance', async () => {
    const payer = makeUser({ balance: 30, userType: UserType.INDIVIDUAL })
    const payee = makeUser()
    usersRepository.create(payer)
    usersRepository.create(payee)

    const request: CreateTransactionUseCaseRequest = {
      payerId: payer.id.toString(),
      payeeId: payee.id.toString(),
      value: 50,
    }

    await expect(sut.execute(request)).rejects.toThrow(InsufficientBalanceError)
  })

  it('should throw an error if the payer type is business', async () => {
    const payer = makeUser({ balance: 100, userType: UserType.BUSINESS })
    const payee = makeUser()
    usersRepository.create(payer)
    usersRepository.create(payee)

    const request: CreateTransactionUseCaseRequest = {
      payerId: payer.id.toString(),
      payeeId: payee.id.toString(),
      value: 50,
    }

    await expect(sut.execute(request)).rejects.toThrow(
      BusinessUserTransactionError,
    )
  })
})

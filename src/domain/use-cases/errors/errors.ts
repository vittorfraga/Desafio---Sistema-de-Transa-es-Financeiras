export class PayerNotFoundError extends Error {
  constructor(message: string = 'Payer not found') {
    super(message)
    this.name = 'PayerNotFoundError'
  }
}

export class PayeeNotFoundError extends Error {
  constructor(message: string = 'Payee not found') {
    super(message)
    this.name = 'PayeeNotFoundError'
  }
}

export class InsufficientBalanceError extends Error {
  constructor(message: string = 'Insufficient balance') {
    super(message)
    this.name = 'InsufficientBalanceError'
  }
}

export class UnauthorizedTransactionError extends Error {
  constructor(message: string = 'Transaction not authorized') {
    super(message)
    this.name = 'UnauthorizedTransactionError'
  }
}

export class BusinessUserTransactionError extends Error {
  constructor(message: string = 'Business users cannot make transactions') {
    super(message)
    this.name = 'BusinessUserTransactionError'
  }
}

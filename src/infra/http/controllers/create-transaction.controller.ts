import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createTransactionBodySchema = z.object({
  value: z.number().positive(),
  payerId: z.string(),
  payeeId: z.string(),
})

type CreateTransactionBodySchema = z.infer<typeof createTransactionBodySchema>

@Controller('/transaction')
export class CreateTransactionController {
  constructor(private createTransaction: CreateTransactionUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTransactionBodySchema))
  async handle(@Body() body: CreateTransactionBodySchema) {
    const { value, payerId, payeeId } = body

    await this.createTransaction.execute({ value, payerId, payeeId })
  }
}

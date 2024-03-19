import { type Request, type Response } from 'express'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'
import { type TransactionUseCase } from '../../application/transactionUseCase'

export class TransactionController {
  constructor (private readonly transactionUseCase: TransactionUseCase) {}

  public createTransaction = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { from, to, amount, idCategory } = request.body

    const createdTransaction = await this.transactionUseCase.createTransaction({
      from: new ID(Number(from)),
      to: new ID(Number(to)),
      amount: new ValidBigInt(BigInt(String(amount))),
      idCategory:
        idCategory === null || idCategory === undefined
          ? null
          : new ID(Number(idCategory))
    })

    return response.json(createdTransaction).status(201)
  }

  public getAllTransaction = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { idAccount } = request.params

    const transactions = await this.transactionUseCase.getAllTransaction(
      idAccount === undefined ? undefined : new ID(Number(idAccount))
    )

    if (transactions === null) {
      response.status(404).send()
    }

    return response.json(transactions).status(200)
  }

  public findTransaction = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params

    const transaction = await this.transactionUseCase.findTransaction({
      id: new ID(Number(id))
    })

    if (transaction === null) {
      response.status(404).send()
    }

    return response.json(transaction).status(200)
  }

  public revertTransaction = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params

    await this.transactionUseCase.revertTransaction(new ID(Number(id)))

    return response.json().status(204)
  }
}

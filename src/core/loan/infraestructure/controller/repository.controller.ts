import { type Request, type Response } from 'express'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'
import { Int } from '@/valueObjects/number/Int/Int.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type LoanUseCase } from '../../application/repositoryUseCase'

export class LoanController {
  constructor (private readonly investmentUseCase: LoanUseCase) {}

  public createLoan = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id, number, cvv, expiration } = request.query

    const investment = await this.investmentUseCase.createLoan({
      idAccount: new ID(Number(id)),
      amount: new ValidBigInt(BigInt(String(number))),
      interest: new Int(Number(cvv)),
      dateEnd: new PastDate(String(expiration))
    })

    if (investment === null) {
      return response.status(404).send()
    }

    return response.json(investment?.id).status(200)
  }

  public getAllLoan = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const investments = await this.investmentUseCase.getAllLoan(
      new ID(Number(id))
    )

    if (investments === null) {
      return response.status(404).send()
    }

    const investmentsToJson = investments.map((investment) => {
      return { ...investment.toJSON(), amount: investment.amount.toString() }
    })

    return response.json(investmentsToJson).status(200)
  }

  public cancelLoan = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    await this.investmentUseCase.cancelLoan(new ID(Number(id)))

    return response.json().status(204)
  }

  public getLoan = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const investment = await this.investmentUseCase.findLoan({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined
    })

    if (investment === null) {
      return response.status(404).send()
    }

    return response.json(investment?.id).status(200)
  }
}

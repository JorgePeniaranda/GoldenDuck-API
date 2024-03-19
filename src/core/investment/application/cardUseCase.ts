import { RequestError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'
import { type InvestmentRepository } from '../domain/investment.repository'
import { type InvestmentEntity } from '../domain/investment.entity'
import { type Investment } from '../domain/investment.value'

export class InvestmentUseCase {
  constructor (private readonly investmentRepository: InvestmentRepository) {}

  public async createInvestment ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: InvestmentEntity['idAccount']
    amount: InvestmentEntity['amount']
    interest: InvestmentEntity['interest']
    dateEnd: InvestmentEntity['dateEnd']
  }): Promise<Investment> {
    const createdInvestment = await this.investmentRepository.createInvestment({
      idAccount,
      amount,
      interest,
      dateEnd
    })

    return createdInvestment
  }

  public async getAllInvestment (
    idAccount?: InvestmentEntity['idAccount']
  ): Promise<Investment[] | null> {
    const investments = await this.investmentRepository.getAllInvestment(
      idAccount
    )

    return investments
  }

  public async findInvestment (searchParams: {
    id?: InvestmentEntity['id']
  }): Promise<Investment | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const investment = await this.investmentRepository.findInvestment(searchParams)

    return investment
  }

  public async cancelInvestment (
    id: InvestmentEntity['id']): Promise<void> {
    await this.investmentRepository.cancelInvestment({ id })
  }
}

import { RequestError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'
import { type LoanEntity } from '../domain/loan.entity'
import { type LoanRepository } from '../domain/loan.repository'
import { type Loan } from '../domain/loan.value'

export class LoanUseCase {
  constructor (private readonly loanRepository: LoanRepository) {}

  public async createLoan ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: LoanEntity['idAccount']
    amount: LoanEntity['amount']
    interest: LoanEntity['interest']
    dateEnd: LoanEntity['dateEnd']
  }): Promise<Loan> {
    const createdLoan = await this.loanRepository.createLoan({
      idAccount,
      amount,
      interest,
      dateEnd
    })

    return createdLoan
  }

  public async getAllLoan (
    idAccount?: LoanEntity['idAccount']
  ): Promise<Loan[] | null> {
    const loans =
      await this.loanRepository.getAllLoan(idAccount)

    return loans
  }

  public async findLoan (searchParams: {
    id?: LoanEntity['id']
  }): Promise<Loan | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const loan =
      await this.loanRepository.findLoan(searchParams)

    return loan
  }

  public async cancelLoan (id: LoanEntity['id']): Promise<void> {
    await this.loanRepository.cancelLoan(id)
  }
}

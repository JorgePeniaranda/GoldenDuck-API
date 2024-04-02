import { PickType } from '@nestjs/swagger'
import { InvestmentDTO } from '../investment.dto'

export class CreateInvestmentDTO extends PickType(InvestmentDTO, ['idAccount', 'amount', 'interest', 'dateEnd']) { }

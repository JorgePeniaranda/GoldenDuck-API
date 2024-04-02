import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type CreateInvestmentDTO } from '../dto/create-loan'
import { type Investment } from '../investment.entity'
import { type InvestmentPrimitive } from '../investment.primitive'
import { InvestmentRepository } from '../investment.repository'

@Injectable()
export class InvestmentService {
  constructor (@Inject('InvestmentRepository') private readonly investmentRepository: InvestmentRepository) {}

  public async create (data: CreateInvestmentDTO): Promise<Investment> {
    return await this.investmentRepository.create(data)
  }

  public async getAll (id: AccountPrimitive['id']): Promise<Investment[] | null> {
    return await this.investmentRepository.getAll(id)
  }

  public async find (id: InvestmentPrimitive['id']): Promise<Investment | null> {
    return await this.investmentRepository.find(id)
  }

  public async delete (id: InvestmentPrimitive['id']): Promise<void> {
    await this.investmentRepository.delete(id)
  }
}

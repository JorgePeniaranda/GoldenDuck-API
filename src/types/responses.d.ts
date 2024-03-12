import { type User } from './entities'

export interface Token {
  token: string
}

export interface ErrorResponse {
  status: string
  error: Omit<ErrorInfo, 'status'>
}

export type ForgotResponse = Token &
Omit<User, 'createdAt' | 'updatedAt' | 'role'>

export type RegisterResponse = Token &
Omit<User, 'createdAt' | 'updatedAt' | 'role'>

export interface TransactionResponse {
  newBalance: string | number
  transaction: Transaction
}

export interface InvestmentResponse {
  newBalance: string | number
  investment: Investment
}

export interface LoanResponse {
  newBalance: string | number
  loan: Loan
}

export interface ReportError {
  id: number
  name: string
  message: string
  date: Date
}

import { type Response } from 'express'

export interface CustomResponse<ResBody> extends Response {
  json: (body?: ResBody) => Response
}

export interface ErrorResponse {
  status: string
  error: error
}

export interface error {
  type: string
  message: string
}

import { getEnvValue } from '../utils/server'
import { DEFAULT_APP_PORT } from './server'

export const env = {
  APP_PORT: getEnvValue('APP_PORT', String(DEFAULT_APP_PORT)),
  JWT_SECRET: getEnvValue('JWT_SECRET'),
  JWT_EXPIRATION_TIME: getEnvValue('JWT_EXPIRATION_TIME')
}
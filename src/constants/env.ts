import { APP_INFO } from '.'
import { getEnvValue } from '../helpers/server'

export const env = {
  APP_PORT: getEnvValue('APP_PORT', String(APP_INFO.DEFAULT_PORT)),
  JWT_EXPIRATION_TIME: getEnvValue('JWT_EXPIRATION_TIME'),
  JWT_SECRET: getEnvValue('JWT_SECRET')
} as const

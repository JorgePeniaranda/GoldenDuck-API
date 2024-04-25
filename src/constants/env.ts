import { APP_INFO } from '.'
import { getEnvValue } from '../helpers/server'

export const env = {
  APP_PORT: getEnvValue('APP_PORT', String(APP_INFO.DEFAULT_PORT)),
  JWT_EXPIRATION_MINUTES: getEnvValue('JWT_EXPIRATION_MINUTES'),
  JWT_SECRET: getEnvValue('JWT_SECRET'),
  CODE_EXPIRATION_MINUTES: getEnvValue('CODE_EXPIRATION_MINUTES')
} as const

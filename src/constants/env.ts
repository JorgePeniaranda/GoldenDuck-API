import { APP_INFO } from '.'
import { getEnvValue } from '../helpers/server'

export const env = {
  APP_PORT: getEnvValue('APP_PORT', String(APP_INFO.DEFAULT_PORT)),
  JWT_SECRET: 'asdasd',
  JWT_EXPIRATION_TIME: 'asdas'
} as const

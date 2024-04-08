import { type INestApplication, Logger } from '@nestjs/common'

export const getEnvValue = (envName: string, defaultValue?: string): string => {
  const envValue = process.env[envName]

  if (typeof envValue === 'string' && envValue.length > 0) {
    return envValue
  }

  if (typeof defaultValue === 'string') {
    return defaultValue
  }

  Logger.error('Improper configuration of environment variable: ' + envName)
  throw new Error('Improper configuration of environment variable: ' + envName)
}

export const findAvailablePort = async (
  server: INestApplication,
  port: number | string
): Promise<number> => {
  if (typeof port === 'string') {
    port = parseInt(port)
  }

  if (Number.isNaN(port) || port < 0) {
    Logger.error('Invalid port number', 'NestApplication')
    throw new Error('Invalid port number')
  }

  server
    .listen(port)
    .then(() => {
      Logger.log(`Running on port: ${port}`, 'NestApplication')
    })
    .catch(async (error) => {
      if (error.code === 'EADDRINUSE') {
        return await findAvailablePort(server, port + 1)
      }
      throw error
    })

  return port
}

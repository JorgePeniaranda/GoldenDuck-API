import { type INestApplication, Logger } from '@nestjs/common'

export const getEnvValue = (envName: string, defaultValue?: string): string => {
  const envValue = process.env[envName]

  if (typeof envValue === 'string' && envValue.length > 0) {
    return envValue
  }

  if (typeof defaultValue === 'string') {
    return defaultValue
  }

  throw new Error('env error config: ' + envName)
}

export const findAvailablePort = async (server: INestApplication, port: number): Promise<number> => {
  server.listen(port).catch(async (error) => {
    if (error.code === 'EADDRINUSE') {
      await findAvailablePort(server, port + 1).then((AvaliblePort) => {
        Logger.log(`Running on port ${AvaliblePort}`, 'NestApplication')
      })
    }
  })

  return port
}

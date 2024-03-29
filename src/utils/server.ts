import { type INestApplication, Logger } from '@nestjs/common'

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

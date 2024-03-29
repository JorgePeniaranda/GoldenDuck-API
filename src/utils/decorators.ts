import { Logger } from '@nestjs/common'

export const Tracking = (): (...args: any[]) => any => {
  return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const logger = new Logger(target.constructor.name)
    const targetFunc = descriptor.value

    descriptor.value = async function (...args: any[]) {
      logger.debug(`Executing ${propertyKey} function`)
      const start = Date.now()

      const data = await targetFunc.apply(this, args)

      const end = Date.now()
      logger.debug(`Finishing ${propertyKey} function in ${end - start}ms`)

      return data
    }
    return descriptor
  }
}

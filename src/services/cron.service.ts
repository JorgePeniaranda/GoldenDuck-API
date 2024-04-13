import { Logger } from '@nestjs/common'
import { type SchedulerRegistry } from '@nestjs/schedule'

export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor (
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  deleteCron (name: string): void {
    this.schedulerRegistry.deleteCronJob(name)
    this.logger.warn(`job ${name} deleted!`)
  }

  getCrons (): void {
    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach((value, key, _map) => {
      let next
      try {
        next = value.nextDate().toJSDate()
      } catch (e) {
        next = 'error: next fire date is in the past!'
      }
      this.logger.log(`job: ${key} -> next: ${next.toLocaleString()}`)
    })
  }

  addInterval (name: string, milliseconds: number): void {
    const callback = (): void => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`)
    }

    const interval = setInterval(callback, milliseconds)
    this.schedulerRegistry.addInterval(name, interval)
  }

  deleteInterval (name: string): void {
    this.schedulerRegistry.deleteInterval(name)
    this.logger.warn(`Interval ${name} deleted!`)
  }

  getIntervals (): void {
    const intervals = this.schedulerRegistry.getIntervals()
    intervals.forEach(key => { this.logger.log(`Interval: ${key}`) })
  }

  addTimeout (name: string, milliseconds: number): void {
    const callback = (): void => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`)
    }

    const timeout = setTimeout(callback, milliseconds)
    this.schedulerRegistry.addTimeout(name, timeout)
  }

  deleteTimeout (name: string): void {
    this.schedulerRegistry.deleteTimeout(name)
    this.logger.warn(`Timeout ${name} deleted!`)
  }

  getTimeouts (): void {
    const timeouts = this.schedulerRegistry.getTimeouts()
    timeouts.forEach(key => { this.logger.log(`Timeout: ${key}`) })
  }
}

import { ID } from '@/valueObjects/number/ID/ID.value'
import { type ErrorPrimitiveEntity, type ErrorEntity } from './error.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'

export class Error implements ErrorEntity {
  public readonly id: ErrorEntity['id']
  public name: ErrorEntity['name']
  public message: ErrorEntity['name']
  public date: ErrorEntity['date']
  public deleted: ErrorEntity['deleted']

  constructor (user: ErrorEntity) {
    this.id = user.id
    this.name = user.name
    this.message = user.message
    this.date = user.date
    this.deleted = user.deleted
  }

  public create (error: ErrorPrimitiveEntity): Error {
    return new Error({
      id: new ID(error.id),
      name: error.name,
      message: error.message,
      date: new PastDate(error.date),
      deleted: error.deleted
    })
  }

  public toJSON (): ErrorEntity {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      date: this.date,
      deleted: this.deleted
    }
  }
}

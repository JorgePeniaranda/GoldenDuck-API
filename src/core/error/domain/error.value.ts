import { ID } from '@/valueObjects/number/ID/ID.value'
import { type ErrorPrimitiveEntity, type ErrorEntity } from './error.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidString } from '@/valueObjects/string/string/String.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

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
      name: new ValidString(error.name),
      message: new ValidString(error.message),
      date: new PastDate(error.date),
      deleted: new ValidBoolean(error.deleted)
    })
  }

  public toJSON (): ErrorPrimitiveEntity {
    return {
      id: this.id.value,
      name: this.name.value,
      message: this.message.value,
      date: this.date.value,
      deleted: this.deleted.value
    }
  }
}

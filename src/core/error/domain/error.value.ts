import { ID } from '@/valueObjects/number/ID/ID.value'
import { type ErrorPrimitiveEntity, type ErrorEntity } from './error.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidString } from '@/valueObjects/string/string/String.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

const ObjectName = 'Error'

export class Error implements ErrorEntity {
  public readonly id: ErrorEntity['id']
  public name: ErrorEntity['name']
  public message: ErrorEntity['name']
  public createdAt: ErrorEntity['createdAt']
  public deleted: ErrorEntity['deleted']

  constructor (user: ErrorEntity) {
    this.id = user.id
    this.name = user.name
    this.message = user.message
    this.createdAt = user.createdAt
    this.deleted = user.deleted
  }

  public create (error: ErrorPrimitiveEntity): Error {
    return new Error({
      id: new ID(error.id, `${ObjectName} -> ID`),
      name: new ValidString(error.name, `${ObjectName} -> Name`),
      message: new ValidString(error.message, `${ObjectName} -> Message`),
      createdAt: new PastDate(error.createdAt, `${ObjectName} -> Date`),
      deleted: new ValidBoolean(error.deleted, `${ObjectName} -> Deleted`)
    })
  }

  public toJSON (): ErrorPrimitiveEntity {
    return {
      id: this.id.value,
      name: this.name.value,
      message: this.message.value,
      createdAt: this.createdAt.value,
      deleted: this.deleted.value
    }
  }
}

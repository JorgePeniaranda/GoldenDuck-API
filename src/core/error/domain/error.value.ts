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

  constructor (error: ErrorPrimitiveEntity) {
    this.id = new ID(error.id, `${ObjectName} -> ID`)
    this.name = typeof error.name !== 'string' ? null : new ValidString(error.name, `${ObjectName} -> Name`)
    this.message = typeof error.message !== 'string' ? null : new ValidString(error.message, `${ObjectName} -> Message`)
    this.createdAt = new PastDate(error.createdAt, `${ObjectName} -> Date`)
    this.deleted = new ValidBoolean(error.deleted, `${ObjectName} -> Deleted`)
  }

  public toJSON (): ErrorPrimitiveEntity {
    return {
      id: this.id.value,
      name: this.name?.value,
      message: this.message?.value,
      createdAt: this.createdAt.value,
      deleted: this.deleted.value
    }
  }
}

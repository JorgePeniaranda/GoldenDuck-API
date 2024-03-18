import { type ErrorEntity } from './error.entity'

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

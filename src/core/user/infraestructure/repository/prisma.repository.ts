import type UserEntity from '../../domain/user.entity'
import type UserRepository from '../../domain/user.repository'

export default class PrismaRepository implements UserRepository {
  public async saveUser (user: UserEntity): Promise<UserEntity> { return user }
  public async findUserByID (userID: number): Promise<number> { return userID }
  public async findUserByEmail (userID: number): Promise<number> { return userID }
  public async findUserByDNI (userDNI: number): Promise<number> { return userDNI }
  public async findUserByPhone (userPhone: number): Promise<number> { return userPhone }
}

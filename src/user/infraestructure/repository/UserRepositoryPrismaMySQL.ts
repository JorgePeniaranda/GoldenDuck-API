import { type UserRepository } from '@/user/domain/user.repository'
import { Injectable } from '@nestjs/common'

// const prisma = new PrismaClient()

@Injectable()
export class UserRepositoryPrismaMySQL implements UserRepository {
  public getHello (): string {
    return 'hola'
  }
  // public async createUser (user: {
  //   id: UserPrimitive['id']
  //   name: UserPrimitive['name']
  //   lastName: UserPrimitive['lastName']
  //   dni: UserPrimitive['dni']
  //   email: UserPrimitive['email']
  //   phoneNumber: UserPrimitive['phoneNumber']
  //   password: UserPrimitive['password']
  //   salt: UserPrimitive['salt']
  //   address: UserPrimitive['address']
  //   birthDate: UserPrimitive['birthDate']
  //   sex: UserPrimitive['sex']
  // }): Promise<UserPrimitive> {
  //   return await prisma.user.create({
  //     data: user
  //   })
  // }

  // public async updateUser (user: User): Promise<UserPrimitive> {
  //   const updatedUser = await prisma.user.update({
  //     where: {
  //       id: user.id?.value
  //     },
  //     data: user.toJSON()
  //   })

  //   return new User(updatedUser)
  // }

  // public async deleteUser (user: User): Promise<void> {
  //   await prisma.user.update({
  //     where: {
  //       id: user.id?.value
  //     },
  //     data: {
  //       deleted: true
  //     }
  //   })
  // }

  // public async findUser ({
  //   id,
  //   dni,
  //   email,
  //   phoneNumber
  // }: {
  //   id?: UserEntity['id']
  //   dni?: UserEntity['dni']
  //   email?: UserEntity['email']
  //   phoneNumber?: UserEntity['phoneNumber']
  // }): Promise<UserPrimitive | null> {
  //   const findUser = await prisma.user.findFirst({
  //     where: {
  //       OR: [
  //         { id: id?.value },
  //         { dni: dni?.value },
  //         { email: email?.value },
  //         { phoneNumber: phoneNumber?.value }
  //       ],
  //       deleted: false
  //     }
  //   })

  //   if (findUser === null) {
  //     return null
  //   }

  //   const user = new User(findUser)

  //   return user
  // }
}

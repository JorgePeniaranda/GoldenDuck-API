export default interface UserEntity {
  id: number
  name: string
  lastName: string
  dni: bigint
  email: string
  phoneNumber: bigint
  password: string
  address: string
  birthDate: Date
  sex: 'MALE' | 'FEMALE'
  updatedAt: Date
  createdAt: Date
  deleted: boolean
  role: 'ADMIN' | 'SUPPORT' | 'USER'
}

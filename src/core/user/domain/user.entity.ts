export interface UserEntity {
  id: number
  name: string
  lastName: string
  dni: number | bigint
  email: string
  phoneNumber: number | bigint
  password: string
  address: string
  birthDate: Date
  sex: 'MALE' | 'FEMALE'
  updatedAt: Date
  createdAt: Date
  deleted: boolean
  role: 'ADMIN' | 'SUPPORT' | 'USER'
}

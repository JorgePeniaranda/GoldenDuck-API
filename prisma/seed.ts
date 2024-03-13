import { PrismaClient } from '@prisma/client'
import { newUser } from './utils/newUser'
import { newSession } from './utils/newSession'
import { newAccount } from './utils/newAccount'
import { newMessage } from './utils/newMessage'
import { newNotification } from './utils/newNotification'
import { newCard } from './utils/newCard'
import { newCategory } from './utils/newCategory'
import { newTransaction } from './utils/newTransaction'
import { newLoan } from './utils/newLoan'
import { newInvestment } from './utils/newInvestment'
import { newError } from './utils/newError'

const prisma = new PrismaClient()

async function main (amount: number): Promise<void> {
  const users = await newUser(amount) // (#) -> number of users

  // create data for user
  const dataUser = users.map(async ({ id: idUser }) => {
    await newSession(idUser, 5) // (idUser, #) -> number of sessions per user
    const accounts = await newAccount(idUser, 2) // (idUser, #) -> number of accounts per user

    // create data for each account from user
    const dataAccount = accounts.map(async ({ id: idAccount }) => {
      await newMessage(idAccount, 5) // (idAccount, #) -> number of messages per account
      await newNotification(idAccount, 5) // (idAccount, #) -> number of messages per account
      await newCard(idAccount, 5) // (idAccount, #) -> number of cards per account
      await newTransaction(idAccount, 5) // (idAccount, #) -> number of transactions per account
      await newLoan(idAccount, 5) // (idAccount, #) -> number of loans per account
      await newInvestment(idAccount, 5) // (idAccount, #) -> number of investments per account
    })
    await Promise.all(dataAccount)
  })

  await Promise.all(dataUser)

  // create categories and errors messages
  await newCategory(5)
  await newError(5)
}

main(10)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
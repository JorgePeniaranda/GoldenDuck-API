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
import { newActivity } from './utils/newActivity'

const prisma = new PrismaClient()

async function main (amount: number): Promise<void> {
  const users = await newUser(amount) // (#) -> number of users

  // create data for user
  const dataUser = users.map(async (idUser) => {
    await newSession(idUser, 10) // (idUser, #) -> number of sessions per user
    const accounts = await newAccount(idUser, 3) // (idUser, #) -> number of accounts per user
    await newActivity(idUser, 10) // (idAccount, #) -> number of activity per account

    // create data for each account from user
    const dataAccount = accounts.map(async (idAccount) => {
      await newMessage(idAccount, 10) // (idAccount, #) -> number of messages per account
      await newNotification(idAccount, 10) // (idAccount, #) -> number of messages per account
      await newCard(idAccount, 10) // (idAccount, #) -> number of cards per account
      await newTransaction(idAccount, 10) // (idAccount, #) -> number of transactions per account
      await newLoan(idAccount, 10) // (idAccount, #) -> number of loans per account
      await newInvestment(idAccount, 10) // (idAccount, #) -> number of investments per account
    })
    await Promise.all(dataAccount)
  })

  await Promise.all(dataUser)

  // create categories and errors messages
  await newCategory(50)
  await newError(50)
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

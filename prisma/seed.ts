import { PrismaClient } from '@prisma/client'
import { PrismaAccount } from './entities/account'
import { PrismaActivity } from './entities/activity'
import { PrismaCard } from './entities/card'
import { PrismaCategory } from './entities/category'
import { PrismaError } from './entities/error'
import { PrismaInvestment } from './entities/investment'
import { PrismaLoan } from './entities/loan'
import { PrismaMessage } from './entities/message'
import { PrismaNotification } from './entities/notification'
import { PrismaSession } from './entities/session'
import { PrismaTransaction } from './entities/transaction'
import { PrismaUser } from './entities/user'
import { PrismaAmounts } from './PrismaParams'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await PrismaCategory.insert({ prisma, amount: PrismaAmounts.CATEGORY_AMOUNT })
  await PrismaError.insert({ prisma, amount: PrismaAmounts.ERROR_AMOUNT })
  const users = await PrismaUser.insert({ prisma, amount: PrismaAmounts.USER_AMOUNT })

  await Promise.all(
    users.map(async (user, _index, allUsers) => {
      const accounts = await PrismaAccount.insert({
        prisma,
        idUser: user.id,
        amount: PrismaAmounts.ACCOUNT_PER_USER
      })

      await PrismaSession.insert({ prisma, idUser: user.id, amount: PrismaAmounts.SESSION_PER_USER })
      await PrismaActivity.insert({ prisma, idUser: user.id, amount: PrismaAmounts.ACTIVITY_PER_USER })
      await PrismaNotification.insert({ prisma, idUser: user.id, amount: PrismaAmounts.NOTIFICATION_PER_USER })
      await PrismaMessage.insert({
        prisma,
        idSender: allUsers[Math.floor(Math.random() * allUsers.length)]?.id ?? user.id,
        idReceiver: user.id,
        amount: Math.floor(PrismaAmounts.MESSAGE_PER_USER / 2)
      })
      await PrismaMessage.insert({
        prisma,
        idSender: user.id,
        idReceiver: allUsers[Math.floor(Math.random() * allUsers.length)]?.id ?? user.id,
        amount: Math.floor(PrismaAmounts.MESSAGE_PER_USER / 2)
      })

      await Promise.all(
        accounts.map(async (account, _index, allAccounts) => {
          await PrismaCard.insert({
            prisma,
            idAccount: account.id,
            amount: PrismaAmounts.CARD_PER_ACCOUNT
          })
          await PrismaTransaction.insert({
            prisma,
            idSender: allAccounts[Math.floor(Math.random() * allAccounts.length)]?.id ?? user.id,
            idReceiver: account.id,
            amount: Math.floor(PrismaAmounts.INVESTMENT_PER_ACCOUNT / 2)
          })
          await PrismaTransaction.insert({
            prisma,
            idSender: account.id,
            idReceiver: allAccounts[Math.floor(Math.random() * allAccounts.length)]?.id ?? user.id,
            amount: Math.floor(PrismaAmounts.INVESTMENT_PER_ACCOUNT / 2)
          })
          await PrismaLoan.insert({
            prisma,
            idAccount: account.id,
            amount: PrismaAmounts.LOAN_PER_ACCOUNT
          })
          await PrismaInvestment.insert({
            prisma,
            idAccount: account.id,
            amount: PrismaAmounts.INVESTMENT_PER_ACCOUNT
          })
        })
      )
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

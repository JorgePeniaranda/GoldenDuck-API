import 'dotenv/config' // Load environment variables from a .env file into process.env
import express from 'express'
import 'express-async-errors' // This module monkey patches the built-in express error handler to support async/await
import morgan from 'morgan'
import helmet from 'helmet'
import hpp from 'hpp'
import passport from 'passport'
import session from 'express-session'
import { UserRouter } from './src/core/user/infraestructure/route/user.route'
import { ErrorHandler } from './src/middlewares/ErrorHandler'
import { AccountRouter } from '@/core/account/infraestructure/route/account.route'
import { AuthRouter } from '@/core/auth/infraestructure/route/auth.route'
import { CardRouter } from '@/core/card/infraestructure/route/card.route'
import { ErrorRouter } from '@/core/error/infraestructure/route/error.route'
import { CategoryRouter } from '@/core/category/infraestructure/route/category.route'
import { NotificationRouter } from '@/core/notification/infraestructure/route/notification.route'
import { MessageRouter } from '@/core/message/infraestructure/route/message.route'
import { InvestmentRouter } from '@/core/investment/infraestructure/route/investment.route'
import { SessionRouter } from '@/core/session/infraestructure/route/session.route'
import { TransactionRouter } from '@/core/transaction/infraestructure/route/transaction.route'
import { LoanRouter } from '@/core/loan/infraestructure/route/loan.route'

const app = express()
app.disabled('x-powered-by')

/* --- Get environment variables --- */
const port = process.env.PORT ?? 0

/* --- Middlewares --- */
app.use(morgan('dev')) // HTTP request logger middleware for node.js
app.use(helmet()) // Helmet helps you secure your Express apps by setting various HTTP headers
app.use(express.urlencoded({ extended: false })) // Used to parse URL-encoded bodies
app.use(express.json()) // Used to parse JSON bodies
app.use(hpp()) // HPP middleware to protect against HTTP Parameter Pollution attacks
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false
  })
) // Express session
app.use(passport.initialize()) // Initialize passport
app.use(passport.session()) // Initialize passport session

/* --- Routes --- */
app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/accounts', AccountRouter)
app.use('/cards', CardRouter)
app.use('/errors', ErrorRouter)
app.use('/categories', CategoryRouter)
app.use('/notifications', NotificationRouter)
app.use('/messages', MessageRouter)
app.use('/investments', InvestmentRouter)
app.use('/sessions', SessionRouter)
app.use('/transactions', TransactionRouter)
app.use('/loans', LoanRouter)

app.use((_req, res) => res.status(404).send()) // 404 Not Found
app.use(ErrorHandler) // Error handler

// Start the server
app.listen(port, () => {
  console.log('\n')
  console.log('        =-.                .--        ')
  console.log('       *+:=*+.    .     .+*=:*=       ')
  console.log('      .@    .** .%##* .*+.    @       ')
  console.log('      -#      :%##-=%*%:      @.      ')
  console.log('      .%        .#-=*         @       ')
  console.log('       .          ..          .       ')
  console.log('                                      ')
  console.log('      =:                      --      ')
  console.log(' :=--=@          #%%+         .@---=- ')
  console.log(':. .:=@          :@%.         .@--. .:')
  console.log(' ++:. =#:      :**.:*+.      -%- .:=+ ')
  console.log(' .      =*++++*=     .=*++++*-        ')
  console.log('\n')
  console.log('» Golden-Duck-API is running')
  console.log('» PORT: ' + port)
  console.log('» URL: http://localhost:' + port)
  console.log('\n')
})

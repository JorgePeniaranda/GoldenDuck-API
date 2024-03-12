import 'dotenv/config' // Load environment variables from a .env file into process.env
import express from 'express'
import 'express-async-errors' // This module monkey patches the built-in express error handler to support async/await
import helmet from 'helmet'
import hpp from 'hpp'
import { AccountsRouter, AuthRouter, CardsRouter, CategoriesRouter, ErrorsRouter, InvestmentsRouter, LoansRouter, MessagesRouter, NotificationsRouter, SessionsRouter, TransactionsRouter, UserRouter } from './src/routes'

const app = express()
app.disabled('x-powered-by')

/* --- Get environment variables --- */
const port = process.env.PORT ?? 0

/* --- Middlewares --- */
app.use(helmet()) // Helmet helps you secure your Express apps by setting various HTTP headers
app.use(hpp()) // HPP middleware to protect against HTTP Parameter Pollution attacks

/* --- Routes --- */
app.get('/auth', AuthRouter)
app.get('/user', UserRouter)
app.get('/accounts', AccountsRouter)
app.get('/errors', ErrorsRouter)
app.get('/categories', CategoriesRouter)
app.get('/notifications', NotificationsRouter)
app.get('/messages', MessagesRouter)
app.get('/investments', InvestmentsRouter)
app.get('/cards', CardsRouter)
app.get('/sessions', SessionsRouter)
app.get('/transactions', TransactionsRouter)
app.get('/loans', LoansRouter)

app.use((_req, res) => res.status(404).send()) // 404 Not Found

// Start the server
app.listen(port, () => {
  console.log('\n')
  console.log('» Golden-Duck-API is running')
  console.log('» PORT: ' + port)
  console.log('» URL: http://localhost:' + port)
  console.log('\n')
})

import 'dotenv/config' // Load environment variables from a .env file into process.env
import express from 'express'
import 'express-async-errors' // This module monkey patches the built-in express error handler to support async/await
import helmet from 'helmet'
import hpp from 'hpp'
import UserRouter from './src/core/user/infraestructure/route/user.route'
import ErrorHandler from './src/middlewares/ErrorHandler'

const app = express()
app.disabled('x-powered-by')

/* --- Get environment variables --- */
const port = process.env.PORT ?? 0

/* --- Middlewares --- */
app.use(helmet()) // Helmet helps you secure your Express apps by setting various HTTP headers
app.use(hpp()) // HPP middleware to protect against HTTP Parameter Pollution attacks

/* --- Routes --- */
// app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
// app.use('/accounts', AccountsRouter)
// app.use('/errors', ErrorsRouter)
// app.use('/categories', CategoriesRouter)
// app.use('/notifications', NotificationsRouter)
// app.use('/messages', MessagesRouter)
// app.use('/investments', InvestmentsRouter)
// app.use('/cards', CardsRouter)
// app.use('/sessions', SessionsRouter)
// app.use('/transactions', TransactionsRouter)
// app.use('/loans', LoansRouter)

app.use((_req, res) => res.status(404).send()) // 404 Not Found
app.use(ErrorHandler) // Error handler

// Start the server
app.listen(port, () => {
  console.log('\n')
  console.log('» Golden-Duck-API is running')
  console.log('» PORT: ' + port)
  console.log('» URL: http://localhost:' + port)
  console.log('\n')
})

import 'dotenv/config' // Load environment variables from a .env file into process.env
import express from 'express'
import 'express-async-errors' // This module monkey patches the built-in express error handler to support async/await
import helmet from 'helmet'
import hpp from 'hpp'

const app = express()
app.disabled('x-powered-by')

/* --- Get environment variables --- */
const port = process.env.PORT ?? 0

/* --- Middlewares --- */
app.use(helmet()) // Helmet helps you secure your Express apps by setting various HTTP headers
app.use(hpp()) // HPP middleware to protect against HTTP Parameter Pollution attacks

/* --- Routes --- */
app.use('/', (_req, res) => {
  res.status(418).send(new Date())
})

// Start the server
app.listen(port, () => {
  console.log('\n')
  console.log('            @@ %@@@#                        @@@@*@@             ')
  console.log('           @@       @@@       *@@        @@@      @@            ')
  console.log('           @@         (@@   @@ &//@    @@          @@           ')
  console.log('           @%           %@@.@     @@ @@            @@           ')
  console.log('           @@               @     @@               @@           ')
  console.log('           @@                @@@@@                 @@           ')
  console.log('                                                                ')
  console.log('                                                                ')
  console.log('                                                                ')
  console.log('          @@                                        @@          ')
  console.log('    *@@@@@@                 @@@@@@@                 %@@@@@@*    ')
  console.log('@&       @@                   @@@@                  *@(       @@')
  console.log('    (@@@@@@@                 @@@@@                  @@@@@@@(    ')
  console.log(' @@        @@             (@@     @@@             @@@        @@ ')
  console.log('             @@@@&   .@@@@           @@@@@    @@@@              ')
  console.log('\n')
  console.log('» Golden-Duck-API is running')
  console.log('» PORT: ' + port)
  console.log('» URL: http://localhost:' + port)
  console.log('\n')
})

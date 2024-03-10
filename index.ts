import 'dotenv/config' // Load environment variables from a .env file into process.env
import express from 'express'
import 'express-async-errors' // This module monkey patches the built-in express error handler to support async/await
import helmet from 'helmet'
import hpp from 'hpp'

// Get environment variables
const port = process.env.PORT ?? 0

// Create an Express application
const app = express()
app.disabled('x-powered-by')

// Middlewares
app.use(helmet()) // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(hpp()) // HPP middleware to protect against HTTP Parameter Pollution attacks

// Routes
app.use('/', (req, res) => {
  const name = req.query.name ?? 'World'
  res.send('Hello ' + String(name))
})

// Start the server
app.listen(3000, () => {
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

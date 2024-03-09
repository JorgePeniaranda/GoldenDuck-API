import express from 'express'

const app = express()
app.disabled('x-powered-by')

app.use('/', (req, res) => {
  const name = req.query.name ?? 'World'
  res.send('Hello ' + String(name))
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

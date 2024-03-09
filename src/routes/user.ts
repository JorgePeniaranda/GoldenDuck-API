import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  const name = req.query.name ?? 'World'
  res.send('Hello ' + String(name))
})

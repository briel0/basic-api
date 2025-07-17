import express from 'express'
import addEdgeRouter from './routes/addEdge.js'
import getEdgeRouter from './routes/getEdge.js'

const app = express()

app.use(express.json())

app.use(addEdgeRouter)

app.use(getEdgeRouter)

app.listen(3000)

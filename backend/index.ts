import express from 'express'

// constant
const PORT = 5000

const app = express()

//------------- middleware 
// body parser for json
app.use(express.json());

app.get('/', (req, res) => {
  return res.send("Hey")
})

app.get('/test', (req, res) => {
  return res.send("Test")
})

app.get('/test/:id', (req, res) => {
  const {id} = req.params
  return res.send(`test with Id: ${id}`)
})

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)
})

import express from 'express'
import cors from 'cors';

// constant
const PORT = 5000

const app = express()

//------------- middleware 
// body parser for json
app.use(express.json());
app.use(cors())
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

app.post('/task', (req,res)=> {
  const {task} = req.body
  console.log('Task received : ', task);
  if(!task){
    return res.status(400).send({error:'The request must include a task'})
  }

  return res.send("created");
})

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)
})

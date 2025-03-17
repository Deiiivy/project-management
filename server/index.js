import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import  { connect } from './database/dbConnection.js'
import router from './routes/routes.js'

dotenv.config();

const app = express();
const route = express.Router();

// middlewares

app.use(bodyParser.json());
app.use(cors());
app.use('/projectManagement', router)


// PORT
const PORT = process.env.PORT || 3000

let db;

connect().then(async (connection) => {
  db = connection;
  console.log('conect to database')
}).catch(err => {
  console.log("error to connect to database", err)
})

app.use('/projectManagement', router)

  
app.get('/', function() {
  res.send('hello word')
})

app.listen(PORT, () => {
  console.log(`server running in the port: ${PORT}` )
})

export default db;

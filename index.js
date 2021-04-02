//middleware imports
const cors = require('cors');
require('dotenv').config()

//variables for express
const express = require('express')
const app = express()
const port = 5000
//variables for mongodb
const pass = "YQ15cG41NBp2dSQP";
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.73puo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//use middleware
app.use(cors());
app.use(express.json());

//configure server with express
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//connect to mongodb
client.connect(err => {
  const books = client.db("full-stack").collection("books");
  console.log('connection to db successful')
  
//post data to mongodb
  app.post('/addBooks', (req, res) => {
    const newBook = req.body;
    console.log(newBook);
    books.insertOne(newBook)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })

  
//read data from mongodb
  app.get('/books', (req, res) => {
    books.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

});

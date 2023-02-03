require('dotenv').config({ path: './config.env' })

const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
const dbo = require('./db/conn')
const dbRoutes = require('./routes/record.js')

app.use(cors())
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: false }))
app.use('/', dbRoutes)

app.get('/hello', (req, res) => {
    res.json({msg: 'Hello, World!'})
})

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
	if (err) {
	  console.error(err);
	  process.exit();
	}
  
	// start the Express server
	app.listen(port, () => {
	  console.log(`Server is running on: http://localhost:${port}`)
	})
})

// const MongoClient = require('mongodb').MongoClient
// const url = process.env.ATLAS_URI

// // Connect to the MongoDB database
// MongoClient.connect(url, (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   // Connected successfully
//   console.log('Connected to MongoDB database');

//   // Get a reference to the todos collection
//   const todos = client.db('todo').collection('todo');

//   // Disconnect from the MongoDB database when the app closes
//   app.on('close', () => client.close());
// });

// app.listen(port, () => console.log(`Server is running on: http://localhost:${port}`))
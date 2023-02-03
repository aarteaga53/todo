require('dotenv').config({ path: '../config.env' })

const express = require("express")
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router()

// This will help us connect to the database
const dbo = require('../db/conn')

recordRoutes.route("/tasks").get(async function (req, res) {
    const dbConnect = await dbo.getDb()

    try {
      const collection = await dbConnect.collection('tasks')
      const tasks = await collection.find({}).toArray()
      res.json(tasks)
    } catch(err) {
      res.status(400).send('Error fetching tasks!')
    }
})

module.exports = recordRoutes
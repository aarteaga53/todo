require('dotenv').config({ path: '../config.env' })

const express = require("express")
const ObjectId = require('mongodb').ObjectId

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router()

// This will help us connect to the database
const dbo = require('../db/conn')

/**
 * task = {
 *  title: String,
 *  body: String,
 *  type: Number, [todo-0, inProgress-1, done-2]
 * }
 */

// read all tasks
recordRoutes.route("/tasks").get(async (req, res) => {
    const dbConnect = dbo.getDb()

    try {
      const collection = dbConnect.collection('tasks')
      const tasks = await collection.find({}).toArray()
      res.json(tasks)
    } catch(err) {
      res.status(400).send('Error fetching tasks!')
    }
})

// read all tasks of specified type
recordRoutes.route("/tasks/:type").get(async (req, res) => {
  const dbConnect = dbo.getDb()
  const type = { type: parseInt(req.params.type)}

  try {
    const collection = dbConnect.collection('tasks')
    const tasks = await collection.find(type).toArray()
    res.json(tasks)
  } catch(err) {
    res.status(400).send('Error fetching tasks!')
  }
})

// insert a task
recordRoutes.route("/tasks/insert").post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('tasks')
  const insertTask = {
    title: req.body.title,
    body: req.body.body,
    type: parseInt(req.body.type),
    date: new Date(),
  }

  const result = await collection.insertOne(insertTask)
  
  if(result.insertedId !== null) {
    res.json(result)
  } else {
    res.json({err: 'error'})
  }
})

// delete a task with given id
recordRoutes.route("/tasks/delete/:id").delete(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('tasks')
  const task = { _id: new ObjectId(req.params.id) }

  const result = await collection.deleteOne(task)

  if(result.deletedCount === 1) {
    res.json({ msg: 'success' })
  } else {
    res.json({ msg: 'error' })
  }
})

module.exports = recordRoutes
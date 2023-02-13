require('dotenv').config({ path: '../config.env' })

const express = require("express")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
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
 *  date: new Date()
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
    date: new Date(req.body.date),
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
  const taskId = { _id: new ObjectId(req.params.id) }

  const result = await collection.deleteOne(taskId)

  if(result.deletedCount === 1) {
    res.json({ msg: 'success' })
  } else {
    res.json({ msg: 'error' })
  }
})

// update contents of a task
recordRoutes.route("/tasks/update").post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('tasks')
  const updateTask = {
    title: req.body.title,
    body: req.body.body,
    type: parseInt(req.body.type),
    date: new Date(req.body.date)
  }
  
  try {
    const taskId = { _id: new ObjectId(req.body._id) }
    const result = await collection.updateOne(taskId, { $set: updateTask })
  
    if(result.matchedCount !== 0) {
      res.json({ msg: 'success' })
    } else {
      res.json({ msg: 'error' })
    }
  } catch(err) {
    console.log(err)
    res.json({ msg: 'error' })
  }

})

// verify user exists
recordRoutes.route("/verify").post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('tasks')
  const cred = { email: req.body.email }

  try {
    const user = await collection.findOne(cred)
    
    if(user !== null) {
      const isMatch = await bcrypt.compare(req.body.password, user.password)

      if(!isMatch) {
        res.json({ msg: 'error' })
        return
      }

      const token = jwt.sign(user, process.env.JWT_SECRET)
      // const verify = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(verify)

      res.json(token)
    } else {
      res.json({ msg: 'error' })
    }
  } catch(err) {
    res.json({ msg: 'error' })
  }
})

// register a new user
recordRoutes.route("/register").post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('tasks')
  const newUser = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password
  }

  try {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(newUser.password, salt)
    
    newUser.password = passwordHash
    const result = await collection.insertOne(newUser)
    
    if(result.insertedId !== null) {
      res.json(result)
    } else {
      res.json({ err: 'error' })
    }
  } catch(err) {
    res.json({ err: 'error' })
  }
})

recordRoutes.route('/user').post(async (req, res) => {
  const token = req.body.token.replace(/"/g, '')

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET)

    res.json(verify)
  } catch(err) {
    console.log(err)
    res.json({ msg: 'error' })
  }
})

module.exports = recordRoutes
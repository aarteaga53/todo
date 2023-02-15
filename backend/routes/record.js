require('dotenv').config({ path: '../config.env' })

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
 *  type: Number, (todo-0, inProgress-1, done-2)
 *  date: new Date()
 * }
 */

// read all tasks
recordRoutes.route('/tasks').post(async (req, res) => {
    const dbConnect = dbo.getDb()
    const id = req.body.tasks.map(task => {
      return { _id: new ObjectId(task) }
    })

    try {
      const collection = dbConnect.collection('tasks')
      const tasks = await collection.find({ $or: id }).toArray()

      res.json(tasks)
    } catch(err) {
      res.status(400).send('Error fetching tasks!')
    }
})

// read all tasks of specified type
recordRoutes.route('/tasks/:type').get(async (req, res) => {
  const dbConnect = dbo.getDb()
  const type = { type: parseInt(req.params.type) }
  // const type = { $or: [{ type: 0 }, { type: 1 }, { type: 2 }] }

  try {
    const collection = dbConnect.collection('tasks')
    const tasks = await collection.find(type).toArray()
    res.json(tasks)
  } catch(err) {
    res.status(400).send('Error fetching tasks!')
  }
})

// insert a task
recordRoutes.route('/tasks/insert').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('tasks')
  const user = req.body.user
  const insertTask = {
    title: req.body.task.title,
    body: req.body.task.body,
    type: parseInt(req.body.task.type),
    date: new Date(req.body.task.date)
  }

  const result = await collection.insertOne(insertTask)
  
  if(result.insertedId !== null) {
    if('tasks' in user) {
      user.tasks.push(result.insertedId.toString())
    } else {
      user.tasks = [result.insertedId.toString()]
    }

    await updateUser(user, user._id)

    res.json(result)
  } else {
    res.json({err: 'error'})
  }
})

let updateUser = async (user, id) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('users')

  delete user._id

  try {
    const userId = { _id: new ObjectId(id) }
    const result = await collection.updateOne(userId, { $set: user })
  
  } catch(err) {
    console.log(err)
  }
}

// delete a task with given id
recordRoutes.route('/tasks/delete/:id').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('tasks')
  const user = req.body.user
  const taskId = { _id: new ObjectId(req.params.id) }

  const result = await collection.deleteOne(taskId)

  if(result.deletedCount === 1) {
    user.tasks.splice(user.tasks.indexOf(req.params.id), 1)
    await updateUser(user, user._id, taskId)
    res.json({ msg: 'success' })
  } else {
    res.json({ msg: 'error' })
  }
})

// update contents of a task
recordRoutes.route('/tasks/update').post(async (req, res) => {
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
recordRoutes.route('/verify').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('users')
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
recordRoutes.route('/register').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('users')
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
    const dbConnect = dbo.getDb()
    const collection = dbConnect.collection('users')
    const user = await collection.findOne({ _id: new ObjectId(verify._id) })

    res.json(user)
  } catch(err) {
    console.log(err)
    res.json({ msg: 'error' })
  }
})

module.exports = recordRoutes
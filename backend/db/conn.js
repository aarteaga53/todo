const { MongoClient } = require("mongodb");
// Connection URI
const uri = process.env.ATLAS_URI;
// Create a new MongoClient
const client = new MongoClient(uri);

let dbConnection

module.exports = {
  connectToServer: async function (callback) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      const db = await client.connect()
      // Establish and verify connection
      dbConnection = await db.db("todo")
      console.log("Successfully connected to MongoDB.")

      return callback()
    } catch(err) {
      return callback(err)
    } 
    // finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
  },

  getDb: function () {
    return dbConnection
  }
}
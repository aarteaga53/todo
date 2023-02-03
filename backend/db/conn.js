const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.ATLAS_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

let dbConnection

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err)
      }

      dbConnection = db.db("todo")
      console.log("Successfully connected to MongoDB.")

      return callback()
    })
  },

  getDb: function () {
    return dbConnection
  },
}

// const { MongoClient } = require("mongodb");
// const connectionString = process.env.ATLAS_URI;
// const client = new MongoClient(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let dbConnection;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       if (err || !db) {
//         return callback(err);
//       }

//       dbConnection = db.db("todo");
//       console.log("Successfully connected to MongoDB.");

//       return callback();
//     });
//   },

//   getDb: function () {
//     return dbConnection;
//   },
// };
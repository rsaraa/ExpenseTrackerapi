const { MongoClient } = require('mongodb')
let db                                   //importing mongodb
function connectToDb(startServer) {                                                     //to connect mongodb//db stores the connection //instead of localhost give 127.0.0.1
    MongoClient.connect('mongodb+srv://saraa:Saraach2@cluster0.asr0tz9.mongodb.net/ExpenseTracker?retryWrites=true&w=majority').then(function (client) { //returns client -->async func as .then is used
        //connection establishment
        db = client.db()
        //starting the server                                  
        return startServer()
    }).catch(function (error) {               //handling the error, if error occurs then server won't start
        return startServer(error)             //captures error and sends to callback func
    })
}
function getDb() {
    return db
}
module.exports = { connectToDb, getDb }                                             //function is exported as 2 node files are used
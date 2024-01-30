const express = require('express')
const bodyParser = require('body-parser')
// importing required functions
const { connectToDb, getDb } = require('./db.cjs')
// const { ObjectId } = require('mongodb')


const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname))


let db
// Connecting to the DB
connectToDb(function (error) {              //error is passed
    if (!error) {    //not error
        // Starting the server                                   
        app.listen(8008)
        console.log('Listening on port 8000...')
        db = getDb()                       //connection establishment
    } else {
        // Server would not start
        console.log(error)
    }
})

//get entry
// app.get('/get-data', function (request, response) {
//     // console.log(request.body)
//     const entries = []             //empty array
//     db.collection('ExpenseData').find().forEach(entry => entries.push(entry)).then(function () {                   //returns a cursor which points to first entry and it keeps on iterating
//         response.status(200).json(entries)                                          //run a loop for find to iterate the cursor
//     }).catch(function (error) {                                                          //error handling
//         response.status(404).json({
//             'error': error
//         })
//     })
// })


//endpoints
//add entry
app.post('/add-entry', function (request, response) {
    // console.log(request.body)
    db.collection('ExpenseData').insertOne(request.body).then(function () {
        response.status(201).json({                                                     //new file successfully created-201
            'status': 'data successfull entered'
        })
    }).catch(function (error) {                                                          //error handling
        response.status(500).json({
            'error': error
        })
    })
})

//get entry
app.get('/get-data', function (request, response) {
    // console.log(request.body)
    const entries = []             //empty array
    db.collection('ExpenseData').find().forEach(entry => entries.push(entry)).then(function () {                   //returns a cursor which points to first entry and it keeps on iterating
        response.status(200).json(entries)                                          //run a loop for find to iterate the cursor
    }).catch(function (error) {                                                          //error handling
        response.status(404).json({
            'error': error
        })
    })
})


//delete entry
app.delete('/delete-entry', function (request, response) {
    if (ObjectId.isValid(request.body.id)) {
        db.collection('ExpenseData').deleteOne({
            _id: new ObjectId(request.body.id)
        }).then(function () {
            response.status(201).json({                                                     //new file successfully created-201
                'status': 'data successfull deleted'
            })
        }).catch(function (error) {                                                          //error handling
            response.status(500).json({                                                    //process incomplete ->500
                'error': error
            })
        })
    }
    else {
        response.status(500).json({
            'status': 'ObjectId not valid'
        })
    }
})


//update entry ->patch is used
app.patch('/update-entry', function (request, response) {
    if (ObjectId.isValid(request.body.id)) {
        db.collection('ExpenseData').updateOne(
            { _id: new ObjectId(request.body.id) },
            { $set: request.body.data }
        ).then(function () {
            response.status(201).json({
                'status': 'data successfully updated'
            })
        }).catch(function (error) {
            response.status(500).json({
                'error': error
            })
        })
    } else {
        response.status(500).json({
            'status': 'ObjectId not valid'
        })
    }
})
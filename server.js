//import express from 'express'
//import mongoose from 'mongoose'

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Cards = require('./dbCards')

//App config
const app = express()
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://admin:pftds9BkAh7BaB4X@cluster0.zeroi.mongodb.net/edatingdb?retryWrites=true&w=majority"

//MiddleWare
app.use(express.json())
app.use(cors())

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//API endpoints
app.get('/', (req, res) => {
    res.status(200)
    res.send("Hello")
})

app.post('/edating/cards', (req, res) => {
    const dbCard = req.body

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.status(201).send(data)

    })
})

app.get('/edating/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.status(200).send(data)

    })
})

//Listner
app.listen(port, () => {
    console.log(`listening on localhost: ${port}`)
})
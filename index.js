const express=require("express")
const mongodb=require("mongodb")
const cors=require("cors")
require("dotenv").config()

const mongoClient=mongodb.MongoClient
const objectId=mongodb.ObjectID

const app=express()

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017"

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


app.get("/roomDetails",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("HallBooking")
        let data = await db.collection("RoomDetails").find().toArray();
        res.status(200).json({data})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.get("/customerDetails",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("HallBooking")
        let data = await db.collection("CustomerDetails").find().toArray();
        res.status(200).json({data})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})


app.get("/getRoomPrice/:rName",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("HallBooking")
        let data = await db.collection("RoomDetails").find({roomName : { $eq : req.params.rName }}).toArray();
        res.status(200).json({data})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.post("/createNewRoom",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("HallBooking")
        let data = await db.collection('RoomDetails').insertOne(req.body)
        res.status(200).json({message : "Room created"})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.post("/bookroom",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("HallBooking")
        let data = await db.collection('CustomerDetails').insertOne(req.body)
        res.status(200).json({message : "Room booked"})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})


app.listen(port,()=>{
    console.log("App started at port :",port)
})
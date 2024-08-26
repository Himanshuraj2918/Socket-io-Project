const express = require("express")
const app = express();

const http = require("http")
const socket = require("socket.io")
const server = http.createServer(app)
const io = socket(server)

app.get("/",(req,res)=>{
    res.send("hey")
})

server.listen(8000,()=>{
    console.log("Srever Started.........");
    
})
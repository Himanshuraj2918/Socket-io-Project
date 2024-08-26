const express = require("express")
const path = require('path')
const app = express();

const http = require("http")
const socket = require("socket.io")
const server = http.createServer(app)
const io = socket(server)

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    console.log("connected");
    
})
app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(8000,()=>{
    console.log("Srever Started.........");
    
})
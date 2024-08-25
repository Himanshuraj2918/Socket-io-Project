// import React from 'react'
import {io} from "socket.io-client"
import {useEffect, useMemo, useState} from "react";
import {Box, Container, Stack} from '@mui/material';
import Typography from '@mui/material/Typography'
import { Button, TextField } from "@mui/material";
const App = () => {

  const socket = useMemo(()=>io("http://localhost:3000/")
  ,[]);

  const [message,setMessage] = useState("")
  const [room,setRoom] = useState("")
  const [socketID,setSocketID] = useState("")
  const [messages,setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  
  
  const handleSubmit = (e)=>{
        e.preventDefault();
        socket.emit("message",{message,room})
        setMessage("")
  }

  useEffect(()=>{
    socket.on("connect",()=>{
      setSocketID(socket.id)
      console.log("Connected");
      console.log(socket.id);
    })
    
    socket.on("received-message",(data,id)=>{
      console.log(`${data} -By ${id.slice(-4)}`);
      setCurrentUser((currentUser)=>[...currentUser,id.slice(-4)])
      setMessages((messages)=>[...messages,data])
      
    })
    socket.on("welcome",(message)=>{
      console.log(message);
      
    })
    
    return ()=>{
      socket.disconnect()
    }
  },[socket])
  return (
    <Container maxWidth = "sm" sx={{p:5}} >
      <Typography variant="h3" component="div" >
        Welcome to Socket.io
      </Typography>

      <Typography variant="h6" component="div" sx={{ mt: 2 }} color="red">
      {socketID}
      </Typography >
      <Box sx={{p:5}}/>
      <form onSubmit={handleSubmit} >
        <TextField  value={message}
        onChange={e=>setMessage(e.target.value)}
         id="outlined-basic" 
         
         label="Message" 
         variant="outlined" />

        <TextField  value={room}
        onChange={e=>setRoom(e.target.value)}
         id="outlined-basic" 
         label="Room" 
         variant="outlined" />

        <Button type="submit" variant="contained" color="primary" sx={{ ml:2,p:1 }}>Send</Button>
      </form>

      <Stack sx={{ mt: 2 }}>
          {
            messages.map((m,i)=>(
              <Typography key={i} variant="h6" component="span" sx={{ mr:4 }}  gutterBottom>
                {m}
                {currentUser[i] && (
              <Typography variant="h6" color="green" component="span" sx={{ p: 4 }} gutterBottom>
                - By {currentUser[i]}
              </Typography>
            )}
              </Typography>
            ))
          }
      </Stack>
    </Container>
  )
}

export default App

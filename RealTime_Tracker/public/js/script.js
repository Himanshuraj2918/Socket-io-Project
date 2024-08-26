const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((poistion)=>{
            const {latitude,longitude} = poistion.coords;
            socket.emit("send-location",{latitude,longitude})
    }, (error)=>{
        console.error(error);
        
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0,
    })
}

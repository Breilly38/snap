function send(text){
            if(text==""){  
               // there is no message, so don't bother sending nothing 
               return ;  
            }  
            try{   
               socket.send(text);  
            } catch(exception){  
               alert("WebSocket Excpetion from websocket.js in send()"); 
            }  
} 
         
function connect(addr){
            try{
                        var host = "ws://" + addr + ":40111";
                        socket = new WebSocket(host);  
                       
                        socket.onopen = function(){
                                    // if we make it here the socket is open
                        }
                        socket.onmessage = function(msg) {
                                    // we've received a message from the server
                                    // message('<p class="event">Received: '+msg.data);
                        }  
                        socket.onclose = function(){  
                                    // we've successfully disconnected  
                        }  
            } catch(exception){  
                     alert("WebSocket exception from websocket.js in connect()");
            }  
}


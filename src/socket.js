import { io } from "socket.io-client";

export const useSocketIO = () => {
  const socket = io('https://notes-api.it:8443',{
    forceNew:true
  })
  return {
      socket,
  }
}

// const tryReconnect = () => {
//     setTimeout(() => {
//       socket.connect()
//     }, 3000);
//   }

//socket.io.on("close", tryReconnect);
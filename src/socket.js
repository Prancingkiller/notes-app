import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  NotesEvents: []
});

export const socket = io("https://notes-api.it:8443",{
    reconnection: false,
    forceNew: true
    });

socket.on("connect", () => {
  state.connected = true;
  socket.emit('subscribe', localStorage.getItem("unique_id"));
});

socket.on("disconnect", () => {
  state.connected = false;
});

const tryReconnect = () => {
    setTimeout(() => {
      socket.connect()
    }, 3000);
  }

//socket.io.on("close", tryReconnect);
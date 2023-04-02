import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  NotesEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io("https://notes-api.it:8443",{
    reconnection: false
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

socket.io.on("close", tryReconnect);
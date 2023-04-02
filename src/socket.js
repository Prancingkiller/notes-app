import { reactive } from "vue";
import { Manager  } from "socket.io-client";

export const state = reactive({
  connected: false,
  NotesEvents: []
});

const manager = new Manager("https://notes-api.it:8443",{
    reconnection: false,
    forceNew: true
    });
export const socket = manager.socket("/");

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
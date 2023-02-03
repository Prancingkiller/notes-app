# notes pwa
It's a simple multi-user PWA for storing notes and create events on a calendar, based on groups of users.<br>
Vue3 PWA with indexeddb for background sync, <br>
it's hosted here https://whimsical-belekoy-5565ca.netlify.app <br>
if you want to try with the api i configured you can access with login "user" and "userPassword123" <br>
if i did set cors correctly (hopefully..) you shouldn't be able to use the api from a different domain than the one i linked above,<br>

You can post notes and test the offline functionality,<br>
if you're offline your notes will be saved in indexeddb and the background sync should post them on the server when your connection is back up, the indexeddb will be always empty for normal online usage, in case of offline navigation the notes displayed are from both the cached request and the indexeddb data, there is a visual difference between the notes from the server (cached or not) and the offline notes waiting to be sent to server.<br>
Same thing for the calendar page, you can create events and it should work same as the notes for the offline and background sync.<br>

The notes page connects to a websocket in order to receive in real time updates, for now the websocket only triggers the fetch call.

Every time you login you receive an http only cookie with a new key that will allow the requests to be verified from the api, you also receive a cookie with a code that will be linked with the user and only the device with that code can login with that user, logging out will un-link the user from that code.
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

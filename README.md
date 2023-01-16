# note-app-sw
Vue3 PWA with indexeddb for background sync, <br>
it's hosted here https://whimsical-belekoy-5565ca.netlify.app <br>
if you want to try with the api i configured you can access with login "user" and "userPassword123" <br>
if i did set cors correctly (hopefully..) you shouldn't be able to use the api from a different domain than the one i linked above,<br>

You can post notes and test the offline functionality,<br>
if you're offline your notes will be saved in indexeddb and the background sync should post them on the server when your connection is back up,<br>
same thing for the calendar page, you can create events and it should work same as the notes for the offline and background sync.
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

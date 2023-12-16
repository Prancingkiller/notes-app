
module.exports = {
  pwa: {
    themeColor: '#639bb4', //not required for service worker, but place theme color here if manifest.json doesn't change the color
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: '/src/sw.js',
      swDest: '/src/firebase-messaging-sw.js',
      // ...other Workbox options...
    },
  },
}

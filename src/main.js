import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'
import VCalendar from 'v-calendar'
import App from '~/components/App'
import firebase from 'firebase'
import AxiosPlugin from 'vue-axios-cors'
import vuetify from '~/plugins/vuetify'

import '~/plugins'
import '~/components'

Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
Vue.use(AxiosPlugin);

Vue.config.productionTip = false

// const firebaseConfig = {
//   apiKey: "AIzaSyAVM0jywSgPdhNXCWbKei_7yPCQv1ukpko",
//   authDomain: "vrmba-9a9a7.firebaseapp.com",
//   projectId: "vrmba-9a9a7",
//   storageBucket: "vrmba-9a9a7.appspot.com",
//   messagingSenderId: "268613309424",
//   appId: "1:268613309424:web:536e25d84f438691de4335",
//   measurementId: "G-2EPN5KXG82"
// };

//
// Blaze plan
//

const firebaseConfig = {
  apiKey: "AIzaSyCefQBjANQeIf6bzq1Ssh2vTWLPtXeZNYk",
  authDomain: "bonvr-39527.firebaseapp.com",
  projectId: "bonvr-39527",
  storageBucket: "bonvr-39527.appspot.com",
  messagingSenderId: "1022714790252",
  appId: "1:1022714790252:web:7f2cb6dd7b2432b986b349",
  measurementId: "G-7YZ4FWMV7V"
};

//
// Test with Firebase Auth emulator
//

firebase.initializeApp(firebaseConfig)
navigator.serviceWorker.register('firebase-messaging-sw.js', {scope: 'firebase-cloud-messaging-push-scope'})
  .then((registration) => {
    const messaging = firebase.messaging()
    messaging.useServiceWorker(registration)
  }).catch(err => {
    console.log(err)
  })

//
// Integrate with emulators
//
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();
auth.useEmulator("http://localhost:9099");
db.useEmulator('localhost', 8080);
functions.useEmulator('localhost', 5001);

/* eslint-disable no-new */
// new Vue({
//   render: h => h(App)
// })

new Vue({
  i18n,
  store,
  router,
  vuetify,
  ...App
})

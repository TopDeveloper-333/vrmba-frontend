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

const firebaseConfig = {
  apiKey: "AIzaSyAVM0jywSgPdhNXCWbKei_7yPCQv1ukpko",
  authDomain: "vrmba-9a9a7.firebaseapp.com",
  projectId: "vrmba-9a9a7",
  storageBucket: "vrmba-9a9a7.appspot.com",
  messagingSenderId: "268613309424",
  appId: "1:268613309424:web:536e25d84f438691de4335",
  measurementId: "G-2EPN5KXG82"
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

const auth = firebase.auth();
auth.useEmulator("http://localhost:9099");

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

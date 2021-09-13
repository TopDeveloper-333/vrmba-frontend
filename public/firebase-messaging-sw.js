importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js')

// const firebaseConfig = {
//   apiKey: "AIzaSyAVM0jywSgPdhNXCWbKei_7yPCQv1ukpko",
//   authDomain: "vrmba-9a9a7.firebaseapp.com",
//   projectId: "vrmba-9a9a7",
//   storageBucket: "vrmba-9a9a7.appspot.com",
//   messagingSenderId: "268613309424",
//   appId: "1:268613309424:web:536e25d84f438691de4335",
//   measurementId: "G-2EPN5KXG82"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCefQBjANQeIf6bzq1Ssh2vTWLPtXeZNYk",
  authDomain: "bonvr-39527.firebaseapp.com",
  projectId: "bonvr-39527",
  storageBucket: "bonvr-39527.appspot.com",
  messagingSenderId: "1022714790252",
  appId: "1:1022714790252:web:7f2cb6dd7b2432b986b349",
  measurementId: "G-7YZ4FWMV7V"
};


try {
  firebase.initializeApp(firebaseConfig)

  const messaging = firebase.messaging()
  messaging.setBackgroundMessageHandler(function (payload) {
    const title = payload.data.username
    const options = {
      body: payload.data.message,
      icon: 'public/img/account-1.png'
    }
    
    return self.registration.showNotification(title, options)
  })
}
catch(err) {
  console.log(err)
}
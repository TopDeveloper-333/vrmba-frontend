importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: "AIzaSyAVM0jywSgPdhNXCWbKei_7yPCQv1ukpko",
  authDomain: "vrmba-9a9a7.firebaseapp.com",
  projectId: "vrmba-9a9a7",
  storageBucket: "vrmba-9a9a7.appspot.com",
  messagingSenderId: "268613309424",
  appId: "1:268613309424:web:536e25d84f438691de4335",
  measurementId: "G-2EPN5KXG82"
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
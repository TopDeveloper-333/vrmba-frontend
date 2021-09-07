import firebase from 'firebase'
// import 'firebase/firestore'
// import 'firebase/database'
// import 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyAVM0jywSgPdhNXCWbKei_7yPCQv1ukpko",
//   authDomain: "vrmba-9a9a7.firebaseapp.com",
//   projectId: "vrmba-9a9a7",
//   storageBucket: "vrmba-9a9a7.appspot.com",
//   messagingSenderId: "268613309424",
//   appId: "1:268613309424:web:536e25d84f438691de4335",
//   measurementId: "G-2EPN5KXG82"
// };

// firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storageRef = firebase.storage().ref()

export const usersRef = db.collection('User')
export const roomsRef = db.collection('ChatRooms')
export const messagesRef = roomId => roomsRef.doc(roomId).collection('messages')

export const filesRef = storageRef.child('files')

export const dbTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const deleteDbField = firebase.firestore.FieldValue.delete()
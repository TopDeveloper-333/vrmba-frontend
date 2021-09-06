<template>
  <div class="grid-container">
		<form v-if="addNewRoom" style="padding:10px 10px 0px 20px; background:#181a1b" @submit.prevent="createRoom">
			<label class="col-form-label">User: </label>
			<input v-model="addRoomUsername" style="margin-left:10px;background-color:transparent;color:white;height:36px" 
					type="text" placeholder="Add e-mail address" />
			<button type="submit" class="btn btn-primary" style="margin-left:10px" :disabled="disableForm || !addRoomUsername">
				Create Room
			</button>
			<button class="btn btn-cancel" style="margin-left:10px" @click="addNewRoom = false">
				Cancel
			</button>
		</form>
		<form v-if="inviteRoomId" style="padding:10px 10px 0px 20px; background:#181a1b" @submit.prevent="addRoomUser">
			<label class="col-form-label">User: </label>
			<input v-model="invitedUsername"  style="margin-left:10px;background-color:transparent;color:white;height:36px" 
					type="text" placeholder="Add e-mail address" />
			<button type="submit" class="btn btn-primary" style="margin-left:10px" :disabled="disableForm || !invitedUsername">
				Add User
			</button>
			<button class="btn btn-cancel" style="margin-left:10px" @click="inviteRoomId = null">
				Cancel
			</button>
		</form>

		<form v-if="removeRoomId" style="padding:10px 10px 0px 20px; background:#181a1b" @submit.prevent="deleteRoomUser">
			<select v-model="removeUserId" style="margin-left:10px;background-color:transparent;color:white;height:36px;min-width:200px">
				<option default value="">
					Select User
				</option>
				<option v-for="user in removeUsers" :key="user._id" :value="user._id">
					{{ user.username }}
				</option>
			</select>
			<button type="submit" class="btn btn-primary" style="margin-left:10px" :disabled="disableForm || !removeUserId">
				Remove User
			</button>
			<button class="btn btn-cancel" style="margin-left:10px" @click="removeRoomId = null">
				Cancel
			</button>
		</form>

    <chat-window
      :current-user-id="currentUserId"
      :messages="messages"
      :theme="theme"
      :height="height"
      :room-id="roomId"
      :rooms="loadedRooms"
			:loading-rooms="loadingRooms"
			:messages-loaded="messagesLoaded"
			:rooms-loaded="roomsLoaded"
			:room-actions="roomActions"
			:menu-actions="menuActions"
			:room-message="roomMessage"
			@fetch-more-rooms="fetchMoreRooms"
			@fetch-messages="fetchMessages"
			@send-message="sendMessage"
			@edit-message="editMessage"
			@delete-message="deleteMessage"
			@open-file="openFile"
			@open-user-tag="openUserTag"
			@add-room="addRoom"
			@room-action-handler="menuActionHandler"
			@menu-action-handler="menuActionHandler"
			@send-message-reaction="sendMessageReaction"
			@typing-message="typingMessage"
			@toggle-rooms-list="$emit('show-demo-options', $event.opened)"
    />
  </div>
</template>
<style scoped>
.grid-container {
  padding-left: 65px;
  height: 100vh;
}
</style>
<script>
import { mapState } from 'vuex'
import store from '~/store'
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'
import firebase from 'firebase'
import 'firebase/messaging'

export default {
  middleware: 'auth',
  components: {
    ChatWindow
  }, 
  emits: ['show-demo-options'],
  data() {    
    return {
			messaging: firebase.messaging(),
      roomsPerPage:15,
      rooms:[],
      roomId: '',
      startRooms: null,
      endRooms: null,
      roomsLoaded: false,
      loadingRooms:true,
      allUsers: [],
      loadingLastMessageByRoom: 0,
      roomsLoadedCount:false,
      selectedRoom: null,
      messagesPerPage: 20,
      messages:[],
      messagesLoaded:false,
      roomMessage: '',
      startMessages: null,
      endMessages: null,
      roomsListeners: [],
      listeners: [],
      typingMessageCache: '',
      disableForm: false,
      addNewRoom: null,
      addRoomUsername: '',
      inviteRoomId: null,
      invitedUsername: '',
      removeRoomId: null,
      removeUserId: '',
      removeUsers: [],
      roomActions: [
        { name: 'inviteUser', title: 'Invite User'},
        { name: 'removeUser', title: 'Remove User'},
        { name: 'deleteRoom', title: 'Delete Room'}
      ],
      menuActions: [
        { name: 'inviteUser', title: 'Invite User'},
        { name: 'removeUser', title: 'Remove User'},
        { name: 'deleteRoom', title: 'Delete Room'}
      ],
      theme:"dark",
      height:"100vh",      
    }
  },
  setup() {
  
  },
	created() {
		this.receieveMessage()
	},
  computed: {
    ...mapState({
      currentUserId: state => state.auth.user.uid
    }),
    loadedRooms() {
      return this.rooms.slice(0, this.roomsLoadedCount)
    },
  },
  mounted() {
    this.fetchRooms()
    this.updateUserOnlineStatus()
  },
  methods: {
		receieveMessage() {
			try {
				console.log('receivemessage() is called')
				this.messaging.onMessage((payload) => {
					debugger
					console.log(payload)
				})
			}
			catch (e) {
				console.log(e)
			}
		},
    async test() {
      alert('test button is clicked')
      // const data = await store.dispatch('message/getRooms', { startRooms: 0, roomsPerPage: 15})
      // const data = await store.dispatch('auth/getUser', 'ZL4e4PPbWqF2tNtZosJUB366z1wm')
      // const data = await store.dispatch('message/createRoom', ['ZL4e4PPbWqF2tNtZosJUB366z1wm'])
      // const data = await store.dispatch('auth/getUserId', 'test1@gmail.com')
      console.log('Test Data: ', data)
    },
    updateUserOnlineStatus() {

    },
		async createRoom() {
			this.disableForm = true
			const { id } = await store.dispatch('auth/getUserId', this.addRoomUsername)
      const { roomId } = await store.dispatch('message/createRoom', [id])

      console.log('room ID : ', roomId)

			this.addNewRoom = false
			this.addRoomUsername = ''
			this.fetchRooms()
		},

    fetchRooms() {
      this.resetRooms()
      this.fetchMoreRooms()
    },
    resetRooms(){
      this.loadingRooms = true
      this.loadingLastMessageByRoom = 0
      this.roomsLoadedCount = 0
      this.rooms = []
      this.roomsLoaded = true
      this.startRooms = null
      this.endRooms = null
      this.roomsListeners.forEach(listener => listener())
      this.roomsListeners = []
      this.resetMessages()
    },
    resetMessages() {
      this.messages = []
      this.messagesLoaded = false
      this.startMessages = null
      this.endMessages = null
      this.listeners.forEach(listener => listener())
      this.listeners = []
    },
    async fetchMoreRooms() {
      if (this.endRooms && !this.startRooms)
        return (this.roomsLoaded = true)

      const rooms = await store.dispatch('message/getRooms', { startRooms: this.startRooms, roomsPerPage: this.roomsPerPage})
      if (rooms.length == 0)
        this.roomsLoaded = true
      else 
        this.roomsLoaded = (rooms.length < this.roomsPerPage)

			if (this.startRooms) 
        this.endRooms = this.startRooms

      if (rooms.length > 0)
			  this.startRooms = rooms[rooms.length - 1]

			const roomUserIds = []
			rooms.forEach(room => {
				room.users.forEach(userId => {
					const foundUser = this.allUsers.find(user => user?._id === userId)
					if (!foundUser && roomUserIds.indexOf(userId) === -1) {
						roomUserIds.push(userId)
					}
				})
			})

			const rawUsers = []
			roomUserIds.forEach(userId => {
				const promise = store.dispatch('auth/getUser', userId)
				rawUsers.push(promise)
			})

			this.allUsers = [...this.allUsers, ...(await Promise.all(rawUsers))]
      
      const roomList = {}
			rooms.forEach(room => {
				roomList[room.id] = { ...room, users: [] }
				room.users.forEach(userId => {
					const foundUser = this.allUsers.find(user => user?._id === userId)
					if (foundUser) roomList[room.id].users.push(foundUser)
				})
			})

      const formattedRooms = []
			Object.keys(roomList).forEach(key => {
				const room = roomList[key]
				const roomContacts = room.users.filter(
					user => user._id !== this.currentUserId
				)
				room.roomName = roomContacts.map(user => user.username).join(', ') || 'Myself'

				const roomAvatar =
					roomContacts.length === 1 && roomContacts[0].avatar
						? roomContacts[0].avatar
						: '/black/img/no-avatar.png'

				formattedRooms.push({
					...room,
					roomId: key,
					avatar: roomAvatar,
					index: room.lastUpdated, // room.lastUpdated._seconds,
					lastMessage: {
						content: 'Room created',
						timestamp: this.formatTimestamp(new Date(room.lastUpdated), room.lastUpdated)
					}
				})
			})

			this.rooms = this.rooms.concat(formattedRooms)
			formattedRooms.map(room => this.listenLastMessage(room))

			if (!this.rooms.length) {
				this.loadingRooms = false
				this.roomsLoadedCount = 0
			}
      
			// this.listenUsersOnlineStatus(formattedRooms)
			// this.listenRooms(query)
    },
		formatTimestamp(date, timestamp) {
			const timestampFormat = this.isSameDay(date, new Date()) ? 'HH:mm' : 'DD/MM/YY'
			const result = this.parseTimestamp(timestamp, timestampFormat)
			return timestampFormat === 'HH:mm' ? `Today, ${result}` : result
		},
		async listenLastMessage(room) {
      console.log('listenLastMessage() is called')

      const lastMessage = await store.dispatch('message/getLastMessage', room.roomId)
      const roomIndex = this.rooms.findIndex(
        r => room.roomId === r.roomId
      )

			lastMessage.timestamp = this.formatTimestamp(new Date(lastMessage.lastUpdated), lastMessage.lastUpdated)
      this.rooms[roomIndex].lastMessage = lastMessage
      this.rooms = [...this.rooms]

      if (this.loadingLastMessageByRoom < this.rooms.length) {
        this.loadingLastMessageByRoom++
        if (this.loadingLastMessageByRoom === this.rooms.length) {
          this.loadingRooms = false
          this.roomsLoadedCount = this.rooms.length
        }
      }
      
    },
    async fetchMessages({room, options={}}) {
      console.log('fetchMessages() is called: ')
			
			this.$emit('show-demo-options', false)

			if (options.reset) {
				this.resetMessages()
				this.roomId = room.roomId
			}

			if (this.endMessages && !this.startMessages) {
				return (this.messagesLoaded = true)
			}

      const messages = await store.dispatch('message/getMessages', 
					{ roomId: room.roomId, startMessage : this.startMessages, messagesPerPage: this.messagesPerPage })

			this.selectedRoom = room.roomId

			if (messages.length <= 0) 
				this.messagesLoaded = true

			if (this.startMessages) 
				this.endMessages = this.startMessages
			
			this.startMessages = messages[messages.length - 1]

			if (options.reset) this.messages = []
			messages.forEach(message => {
				const formattedMessage = this.formatMessage(room, message)
				this.messages.unshift(formattedMessage)
			})

			console.log('Messages: ', messages)

			// const listener = listenerQuery.onSnapshot(snapshots => {
			// 	// this.incrementDbCounter('Listen Room Messages', snapshots.size)
			// 	this.listenMessages(snapshots, room)
			// })
			// this.listeners.push(listener)

    },
		formatMessage(room, message) {
			const senderUser = room.users.find(
				user => message.sender_id === user._id
			)
			const { timestamp } = message
			const formattedMessage = {
				...message,
				...{
					senderId: message.sender_id,
					_id: message.id,
					seconds: timestamp.seconds,
					timestamp: this.parseTimestamp(timestamp, 'HH:mm'), 
					date: this.parseTimestamp(timestamp, 'DD MMMM YYYY'),
					username: senderUser ? senderUser.username : null,
					// avatar: senderUser ? senderUser.avatar : null,
					distributed: true
				}
			}
			if (message.replyMessage) {
				formattedMessage.replyMessage = {
					...message.replyMessage,
					...{
						senderId: message.replyMessage.sender_id
					}
				}
			}
			return formattedMessage
		},		
    async sendMessage({content, roomId, files, replyMessage}) {
      console.log('sendMessage():', roomId, 'content:', content, 'replyMessage:', replyMessage, 'files:', files)

			const message = {
				sender_id: this.currentUserId,
				content,
				timestamp: new Date()
			}

			if (files) {
				message.files = this.formattedFiles(files)
			}

			if (replyMessage) {
				message.replyMessage = {
					_id: replyMessage._id,
					content: replyMessage.content,
					sender_id: replyMessage.senderId
				}
				if (replyMessage.files) {
					message.replyMessage.files = replyMessage.files
				}
			}

      const data = await store.dispatch('message/sendMessage', { roomId: roomId, message: message})

			if (files) {
				for (let index = 0; index < files.length; index++) {
					await this.uploadFile({ file: files[index], messageId: id, roomId })
				}
			}

    },
    async editMessage({messageId, newContent, roomId, files}) {
      console.log('editMessage() is called')

			const newMessage = { edited: new Date() }
			newMessage.content = newContent

			if (files) {
				newMessage.files = this.formattedFiles(files)
			} else {
				newMessage.files = ""
			}

			const data = await store.dispatch('message/editMessage', {roomId: roomId, messageId: messageId, message: newMessage})
				
			if (files) {
				for (let index = 0; index < files.length; index++) {
					if (files[index]?.blob) {
						await this.uploadFile({ file: files[index], messageId, roomId })
					}
				}
			}

		},
    async deleteMessage({message, roomId}) {
      console.log('deleteMessage() is called')

			const data = await store.dispatch('message/deleteMessage', {roomId: roomId, messageId: message._id})

			// const { files } = message

			// if (files) {
			// 	files.forEach(file => {
			// 		const deleteFileRef = filesRef
			// 			.child(this.currentUserId)
			// 			.child(message._id)
			// 			.child(`${file.name}.${file.extension || file.type}`)
			// 		deleteFileRef.delete()
			// 	})
			// }

    },
    formattedFiles(files) {
      console.log('formattedFiles() is called')
    },
    uploadFile({file, messageId, roomId}) {
      console.log('uploadFile() is called')
    },
    openFile({file}) {
      console.log('openFile() is called')
    },
    openUserTag({user}) {
      console.log('openUserTag() is called')
    },
		listenUsersOnlineStatus(rooms) {
			rooms.map(room => {
				room.users.map(user => {

          user.status = true
          const roomIndex = this.rooms.findIndex(
            r => room.roomId === r.roomId
          )
          this.rooms[roomIndex] = room
          this.rooms = [...this.rooms]
				})
			})
		},
    addRoom() {
  		this.resetForms()
			this.addNewRoom = true
    },
    menuActionHandler({action, roomId}) {
			switch (action.name) {
				case 'inviteUser':
					return this.inviteUser(roomId)
				case 'removeUser':
					return this.removeUser(roomId)
				case 'deleteRoom':
					return this.deleteRoom(roomId)
			}
    },
		inviteUser(roomId) {
			this.resetForms()
			this.inviteRoomId = roomId
		},
		removeUser(roomId) {
			this.resetForms()
			this.removeRoomId = roomId
			this.removeUsers = this.rooms.find(room => room.roomId === roomId).users
		},
		async deleteRoom(roomId) {
			const room = this.rooms.find(r => r.roomId === roomId)
			const data =await store.dispatch('message/deleteRoom', roomId)
			this.fetchRooms()
		},
    sendMessageReaction({reaction, remove, messageId, roomId}) {
      console.log('sendMessageReaction() is called')
    },
    typingMessage({message, roomId}) {
      console.log('typingMessage() is called')
    },
  	resetForms() {
			this.disableForm = false
			this.addNewRoom = null
			this.addRoomUsername = ''
			this.inviteRoomId = null
			this.invitedUsername = ''
			this.removeRoomId = null
			this.removeUserId = ''
		},
		parseTimestamp(timestamp, format = ''){
			if (!timestamp) return

			const date = new Date(timestamp)

			if (format === 'HH:mm') {
				return `${this.zeroPad(date.getHours(), 2)}:${this.zeroPad(date.getMinutes(), 2)}`
			} else if (format === 'DD MMMM YYYY') {
				const options = { month: 'long', year: 'numeric', day: 'numeric' }
				return `${new Intl.DateTimeFormat('en-US', options).format(date)}`
			} else if (format === 'DD/MM/YY') {
				const options = { month: 'numeric', year: 'numeric', day: 'numeric' }
				return `${new Intl.DateTimeFormat('en-US', options).format(date)}`
			} else if (format === 'DD MMMM, HH:mm') {
				const options = { month: 'long', day: 'numeric' }
				return `${new Intl.DateTimeFormat('en-US', options).format(
					date
				)}, ${this.zeroPad(date.getHours(), 2)}:${this.zeroPad(date.getMinutes(), 2)}`
			}

			return date
		},
		zeroPad(num, pad){
			return String(num).padStart(pad, '0')
		},

		isSameDay(d1, d2){
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate()
			)
		},

  }
}
</script>

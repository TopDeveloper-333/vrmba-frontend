<template>
  <div class="grid-container">
    <button v-on:click="test">Test button</button>
		<form v-if="addNewRoom" @submit.prevent="createRoom">
			<input v-model="addRoomUsername" type="text" placeholder="Add username" />
			<button type="submit" style="margin-left:10px" :disabled="disableForm || !addRoomUsername">
				Create Room
			</button>
			<button class="button-cancel" style="margin-left:10px" @click="addNewRoom = false">
				Cancel
			</button>
		</form>
		<form v-if="inviteRoomId" @submit.prevent="addRoomUser">
			<input v-model="invitedUsername" type="text" placeholder="Add username" />
			<button type="submit" :disabled="disableForm || !invitedUsername">
				Add User
			</button>
			<button class="button-cancel" @click="inviteRoomId = null">
				Cancel
			</button>
		</form>

		<form v-if="removeRoomId" @submit.prevent="deleteRoomUser">
			<select v-model="removeUserId">
				<option default value="">
					Select User
				</option>
				<option v-for="user in removeUsers" :key="user._id" :value="user._id">
					{{ user.username }}
				</option>
			</select>
			<button type="submit" :disabled="disableForm || !removeUserId">
				Remove User
			</button>
			<button class="button-cancel" @click="removeRoomId = null">
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

export default {
  middleware: 'auth',
  components: {
    ChatWindow
  }, 
  data() {    
    return {
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
  computed: {
    ...mapState({
      currentUserId: state => state.auth.user.uid
    }),
    loadedRooms() {
      return this.rooms.slice(0, this.roomsLoadedCount)
    },
  },
  mounted() {
    console.log(this.user)
    this.fetchRooms()
    this.updateUserOnlineStatus()
  },
  methods: {
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
					const foundUser = this.allUsers.find(user => user?.uid === userId)
					if (foundUser) roomList[room.id].users.push(foundUser)
				})
			})

      const formattedRooms = []
			Object.keys(roomList).forEach(key => {
				const room = roomList[key]
				const roomContacts = room.users.filter(
					user => user.uid !== this.currentUserId
				)
				room.roomName = roomContacts.map(user => user.displayName).join(', ') || 'Myself'

				const roomAvatar =
					roomContacts.length === 1 && roomContacts[0].avatar
						? roomContacts[0].avatar
						: require('@/assets/logo.png')

				formattedRooms.push({
					...room,
					roomId: key,
					avatar: roomAvatar,
					index: room.lastUpdated._seconds,
					lastMessage: {
						content: 'Room created',
						timestamp: room.lastUpdated
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
    listenLastMessage(room) {
      console.log('listenLastMessage() is called')

      this.loadingRooms = false
      this.roomsLoadedCount = this.rooms.length
    },
    fetchMessages({room, options={}}) {
      console.log('fetchMessages() is called')
    },
    sendMessage({content, roomId, files, replyMessage}) {
      console.log('sendMessage() is called')
    },
    editMessage({messageId, newContent, roomId, files}) {
      console.log('editMessage() is called')
    },
    deleteMessage({message, roomId}) {
      console.log('deleteMessage() is called')
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
      console.log('menuActionHandler() is called')
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
		}
  }
}
</script>

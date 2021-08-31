<template>
  <div class="grid-container">
    <button v-on:click="test">Test button</button>
		<form v-if="addNewRoom" @submit.prevent="createRoom">
			<input v-model="addRoomUsername" type="text" placeholder="Add username" />
			<button type="submit" :disabled="disableForm || !addRoomUsername">
				Create Room
			</button>
			<button class="button-cancel" @click="addNewRoom = false">
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
      currentUserId:4321,
      theme:"dark",
      height:"100vh",      
    }
  },
  setup() {
    
  },
  computed: {
    loadedRooms() {
      return this.rooms.slice(0, this.roomsLoadedCount)
    },
  },
  mounted() {
    this.fetchRooms()
    this.updateUserOnlineStatus()
  },
  methods: {
    async test() {
      alert('test button is clicked')
      const data = await store.dispatch('message/getRooms', 15)
    },
    updateUserOnlineStatus() {

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

      // here i am


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
    addRoom() {
      console.log('addRoom() is called')
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

  }
}
</script>

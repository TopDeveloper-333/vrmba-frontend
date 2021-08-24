<template>
  <div class="grid-container">
    <chat-window
      :current-user-id="currentUserId"
      :rooms="rooms"
      :messages="messages"
      :theme="theme"
      :height="height"
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
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  middleware: 'auth',
  components: {
    ChatWindow
  }, 
  data() {    
    return {
      rooms:[
          {
            roomId: 1,
            roomName: 'John Doe',
            avatar: 'black/img/account-1.png',
            unreadCount: 1,
            lastMessage: {
              content: 'Last message received',
              senderId: 1234,
              username: 'John Doe',
              timestamp: '10:20',
              saved: true,
              distributed: false,
              seen: false,
              new: true
            },
            users: [
              {
                _id: 1234,
                username: 'John Doe',
                avatar: 'black/img/account-1.png',
                status: {
                  state: 'online',
                  lastChanged: 'today, 14:30'
                }
              },
              {
                _id: 4321,
                username: 'John Snow',
                avatar: 'assets/imgs/snow.png',
                status: {
                  state: 'offline',
                  lastChanged: '14 July, 20:00'
                }
              }
            ],
            typingUsers: [ 4321 ]
          }
      ],
      messages:[
        {
          _id: 7890,
          indexId: 12092,
          content: 'Message 1',
          senderId: 1234,
          username: 'John Doe',
          avatar: 'black/img/account-1.png',
          date: '13 November',
          timestamp: '10:20',
          system: false,
          saved: true,
          distributed: true,
          seen: true,
          deleted: false,
          disableActions: false,
          disableReactions: false,
          files: [
          ],
          reactions: {
          },
          replyMessage: {
            content: 'Reply Message',
            senderId: 4321,
            files: [
            ]
          },
        }        
      ],
      currentUserId:4321,
      theme:"dark",
      height:"100vh",      
    }
  },
  setup() {
    
  },
  methods: {
    fetchMoreRooms() {
      console.log('fetchMoreRooms() is called')
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

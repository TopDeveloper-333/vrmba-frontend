import axios from 'axios'
import * as types from '../mutation-types'
import config from "../../../config"

// state
export const state = {
  rooms: []
}

// getters
export const getters = {

}

// mutations 
export const mutations = {
  [types.GET_ROOMS_SUCCESS] (state, data) {
    state.rooms.push(data)
  },
  [types.GET_ROOMS_FAILURE] (state) {
    
  }
}

// actions
export const actions = {
  
  async getRooms({commit}, payload) {
    try {
      console.log('getRooms: ', payload.startRooms, payload.roomsPerPage)

      if (payload.startRooms == undefined)
        payload.startRooms = 0

      const { data } = await axios.get(config.apiPath + 'rooms', { params: 
        { roomsPerPage: payload.roomsPerPage, 
          startRooms: payload.startRooms } 
      })
      return data
    }
    catch(e) {
      return []
    }
  },

  async createRoom({commit}, users){
    try {
      const {data} = await axios.post(config.apiPath + 'room', {users: users})
      return data
    }
    catch(e) {
      return {}
    }
  },

  async sendMessage({commit}, message) {
    try {
      message.sender_fullname = 'Test Fullname'
      message.recipient_id = 'CPt2sktOHo5bmdTRSBFN0Sm6ntIV' // test1@gmail.com
      message.recipient_fullname = 'Test1 Account'
      message.text = 'This is test message'
      message.channel_type = 'direct'
      message.attributes = ''
      message.type = 'text'

      const { data } = await axios.post(config.apiPath + 'message', message)
      console.log(data)
      commit(types.SEND_MESSAGE_SUCCESS, {})
    }
    catch (e) {
      commit(types.SEND_MESSAGE_FAILURE)
    }
  },

  async deleteMessage({commit}, recipient_id, message_id) {
    try {
      const { data } = await axios.delete(config.apiPath + `messages/${recipient_id}/${message_id}`)
      commit(types.DELETE_MESSAGE_SUCCESS, {})
    }
    catch(e) {
      commit(types.DELETE_MESSAGE_FAILURE)
    }
  }
  
}
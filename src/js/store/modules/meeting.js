import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'
import config from "../../../config"

// state
export const state = {
    meetings: null,
}

// getters
export const getter = {
  meetings: state => state.meetings
}

// mutations
export const mutations = {
  [types.SCHEDULE_MEETING_SUCCESS] (state, {}) {

  },
  [types.SCHEDULE_MEETING_FAILURE] (state) {

  },

}

// actions
export const actions = {

  async fetchAll({ commit }) {
    try {
      const { data } = await axios.get( config.apiPath + 'meeting')

    } catch (e) {

    }
  },

  async schedule({ commit }, meeting) {
    try {
      console.log('Action: meeting/schedule is called: ' + config.apiPath + 'meeting')
      
      const { data } = await axios.post( config.apiPath + 'meeting', meeting)

      console.log(data)

    } catch (e) {

    }
  }

}
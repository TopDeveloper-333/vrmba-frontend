import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'
import config from "../../../config"

// state
export const state = {
    meetings: null,
}

// getters
export const getters = {
  meetings: state => state.meetings
}

// mutations
export const mutations = {
  [types.SCHEDULE_MEETING_SUCCESS] (state, {}) {

  },
  [types.SCHEDULE_MEETING_FAILURE] (state) {

  },
  [types.GET_MY_MEETINGS_SUCCESS] (state, data) {
    state.meetings = data
  },
  [types.GET_MY_MEETINGS_FAILURE] (state) {

  }

}

// actions
export const actions = {

  async fetchAll({ commit }) {
    try {
      const { data } = await axios.get( config.apiPath + 'meeting')
      commit(types.GET_MY_MEETINGS_SUCCESS, data)
    } catch (e) {
      commit(types.GET_MY_MEETINGS_FAILURE)
    }
  },

  async schedule({ commit }, meeting) {
    try {
      const { data } = await axios.post( config.apiPath + 'meeting', meeting)
      commit(types.SCHEDULE_MEETING_SUCCESS, {})
    } catch (e) {
      commit(types.SCHEDULE_MEETING_FAILURE)
    }
  }

}
import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'
import config from "../../../config"

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// state
export const state = {
  user: null,
  token: Cookies.get('token')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, user }) {
    state.token = token
    state.user = user
    Cookies.set('token', token, { expires: 1/48 })
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    console.log('PASS FETCH_USER_SUCCESS')
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    Cookies.remove('token')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null

    Cookies.remove('token')
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  fetchUser ({ commit }) {
    axios.post(config.apiPath + 'user')
      .then((response) => {
        commit(types.FETCH_USER_SUCCESS, { user: response.data })
      }, (err) =>{
        commit(types.FETCH_USER_SUCCESS, { user: null })
      });    
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async getUser({commit}, userId) {    
    try {
      const { data } = await axios.get(config.apiPath + 'user', { params: { userId:userId } })
      return data
    }
    catch(err) {
      return {}
    }
  },

  async getUserId({commit}, email) {
    try {
      const { data } = await axios.post(config.apiPath + 'userid', {email: email})
      console.log('getUserId: ', data)
      return data
    }
    catch(err) {
      return ''
    }

  },

  async logout ({ commit }) {
    commit(types.LOGOUT)
  },

}

import Vuex from 'vuex'
import Vue from 'vue'
// import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    activeTab: '',
    userdialog: false,
    userform: {}
  },
  mutations: {
    setUser: (state, data) => {
      state.user = data.user;
    },
    setActiveTab: (state, data) => {
      state.activeTab = data;
    },
    setUserForm: (state,data) => {
        state.userform = data;
    },
    clearUserForm: (state) => {
        state.userform = {};
    },
    openUserDialog: (state) => {
        state.userdialog = true;
    },
    closeUserDialog: (state) => {
       state.userdialog = false; 
    },
  }
})

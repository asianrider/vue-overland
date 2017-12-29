import Vue from 'vue'
import uuidv4 from 'uuid/v4'

import 'babel-polyfill'

const state = {
  all: {},
  allIds: [],
  allMsgIds: []
}

const mutations = {
  SET_COUNTRY (state, { country }) {7
    const data = country.data()
    console.log("Setting country " + data.name)
    state.all = {
      ...state.all,
      [country.id]: { name: data.name, adm0_a3: data.adm0_a3 }
    }
    state.allIds.push(country.id)
  }

}

const actions = {
  seed ({ rootState }) {
    let convoRef = rootState.db.collection('conversations')

    convoRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_b'],
      messages: [
        { id: uuidv4(), text: 'Hi there', sender: 'mr_a', created: Date.now() },
        { id: uuidv4(), text: 'Hi to you too!', sender: 'mr_b', created: Date.now() }
      ]
    })

    convoRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_c'],
      messages: []
    })
  },

  async get ({ commit, rootState }) {
    console.log("Fetching all countries")
    let convoRef = rootState.db.collection('countries')
    let countries = await convoRef.get()

    countries.forEach(country => commit('SET_COUNTRY', { country }))
  }
}

export default { namespaced: true, state, mutations, actions }

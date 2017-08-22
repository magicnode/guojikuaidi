import { query } from '../../services/boot'

export const state = {
  data: {},
  query: {
  }
}

// getters
export const getters = {
}

// actions
export const actions = {
  async getBoot ({ commit }, { serialnumber }) {
    const data = await query({serialnumber})
    return data
  }
}

export const mutations = {
}

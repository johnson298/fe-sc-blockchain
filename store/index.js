import { NETWORKS } from '@/const/chain';
import _ from 'lodash'

export const strict = false;

export const state = () => ({
    currentNetwork: 0,
    symbolCoin: '...',
    currentNetworkItems: null
})

export const getters = {
    getCurrentNetwork: state => state.currentNetwork,
    getSymbolCoin: state => state.symbolCoin,
    getCurrentNetworkItems: state => state.currentNetworkItems
}

export const mutations = {
    SET_CURRENT_NETWORK(state, value) {
        state.currentNetwork = value
        const index = _.findIndex(NETWORKS, item => item.value == value)
        if (index > -1) {
            state.symbolCoin = NETWORKS[index].symbol
            state.currentNetworkItems = NETWORKS[index]
        }
    }
}

export const actions = {
    setCurrentNetwork({ commit }, payload) {
        commit('SET_CURRENT_NETWORK', payload)
    }
}

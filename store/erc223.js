import Web3 from "web3"
import _ from 'lodash';

const state = () => ({
  currentToken: '',
  createTokenState: {
    confirm: null,
    transactionHash: '',
    receipt: null,
    error: null
  },
  serviceType: 1
})

// getters
const getters = {
  getCurrentToken: state => state.currentToken,
  getConfirmStatus: state => state.createTokenState.confirm,
  getTransactionHash: state => state.createTokenState.transactionHash,
  getReceiptStatus: state => state.createTokenState.receipt,
  getErrorStatus: state => state.createTokenState.error,
  getCurrentFactory: (state, getters, rootState) => rootState.chain.currentFactory,
  getCurrentWallet: (state, getters, rootState) => rootState.chain.wallet,
}


// mutations
const mutations = {
  async CREATE_TOKEN(state, { params, getters, rootState }) {

    try {
      const web3 = new Web3(window.ethereum);

      let contract = new web3.eth.Contract(getters.getCurrentFactory.contractAbi, getters.getCurrentFactory.contractAddress)

      let paramsContract = params.formData
      let serviceFee = params.serviceFee
      // set service type
      state.serviceType = paramsContract[0];

      await contract.methods.createERC223Types(...paramsContract)
        .send({
          from: getters.getCurrentWallet.account, gasLimit: 40000, gas: 3000000,
          value: web3.utils.toWei(String(serviceFee), 'ether')
        })
        .on('transactionHash', function(transactionHash){
          state.createTokenState.transactionHash = transactionHash;
        })
        .on('receipt', function(receipt) {
          state.currentToken = receipt.events[0].address
          state.createTokenState.receipt = receipt;
        })
        .on('error', function(error, receipt) {
          console.log('errorrrr')
          state.createTokenState.error = {
            error
          };
        });
    } catch (error) {
      console.log('error create token', error);
    }

  },

  RESET_STATUS_CREATE_TOKEN (state) {
    state.createTokenState = {
      confirm: null,
      transactionHash: '',
      receipt: null,
      error: null
    };
    state.currentToken = ''
  }

}

// actions
const actions = {
  createToken({ commit, getters, rootState }, params) {
    commit('CREATE_TOKEN', {params, getters, rootState})
  },

  queryToken({ commit }) {
    commit('QUERY_TOKEN')
  },

  resetStatusCreateToken({ commit }) {
    commit('RESET_STATUS_CREATE_TOKEN');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

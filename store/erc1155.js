import Web3 from "web3";
import _ from 'lodash';

const state = () => ({
  currentToken: '',
  transactionHash: '',
  currentChildToken: '',
  createTokenState: {
    confirm: null,
    transactionHash: '',
    receipt: null,
    error: null
  },
  createTokenChildState: {
    confirm: null,
    transactionHash: '',
    receipt: null,
    error: null
  },
  serviceType: 1
})

// getters
const getters = {
  //Token Parent
  getCurrentToken: state => state.currentToken,
  getConfirmStatus: state => state.createTokenState.confirm,
  getTransactionHash: state => state.transactionHash,
  getReceiptStatus: state => state.createTokenState.receipt,
  getErrorStatus: state => state.createTokenState.error,

  getFormData: state => state.formData,
  getCurrentFactory: (state, getters, rootState) => rootState.chain.currentFactory,
  getCurrentWallet: (state, getters, rootState) => rootState.chain.wallet,

  //Token Child
  getCurrentTokenChild: state => state.currentChildToken,
  getConfirmStatusChild: state => state.createTokenChildState.confirm,
  getTransactionHashChild: state => state.createTokenChildState.transactionHash,
  getReceiptStatusChild: state => state.createTokenChildState.receipt,
  getErrorStatusChild: state => state.createTokenChildState.error,
}


// mutations
const mutations = {

  async CREATE_TOKEN(state, { params, getters, rootState }) {

    try {
      const web3 = await new Web3(window.ethereum);

      const contract = new web3.eth.Contract(getters.getCurrentFactory.contractAbi, getters.getCurrentFactory.contractAddress)
      const { type, name, symbol, serviceFee, description, amount, metadataUrl } = params;
      await contract.methods.createChildERC1155(type, name, symbol, description, amount, metadataUrl)
        .send({ from: getters.getCurrentWallet.account, value: (serviceFee*1000000000000000000) })
        .on('transactionHash', function(transactionHash){
          state.transactionHash = transactionHash;
          console.log('state transactionHash', state.transactionHash);
        })
        .on('receipt', function(receipt) {
          console.log('state receipt', receipt);
            if (type == 0) {
              state.currentToken = receipt.events.ChildCreatedERC1155Mint.returnValues.childAddress
            } else {
              state.currentToken = receipt.events.ChildCreatedERC1155Mint.returnValues.childAddress
            } 

          state.createTokenState.receipt = receipt;
        })
        .on('error', function(error, receipt) {
          console.log('error', error)
          state.createTokenState.error = {
            error
          };
        });

    } catch (error) {
      console.log('error create token', error);
      state.createTokenState.error = {
        error
      };
    }
  },

  RESET_STATUS_CREATE_TOKEN (state) {
    state.createTokenState = {
      confirm: null,
      receipt: null,
      error: null
    }
    state.transactionHash = ''
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

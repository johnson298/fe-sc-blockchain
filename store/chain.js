import Web3 from "web3"
import CONTRACT_FACTORY from '@/const/contractFactory';
import _ from 'lodash';

const state = () => ({
  isConnection: false,
  isConnectFail: false,
  isShowModal: false,
  isShowNetworkFail: false,
  currentTypeFactory: {},
  currentFactory: {},
  wallet: {
    account: null,
    balance: null,
    chainId: '0x4'
  }
})

const getBalanceOf = async (state) => {
  const web3 = new Web3(window.ethereum);
  if (state.wallet.account) {
    await web3.eth.getBalance(state.wallet.account, function (err, result) {
      if (err) {
        state.wallet.balance = 0;
      } else {
        state.wallet.balance = web3.utils.fromWei(result, "ether");
      }
    })
  } else state.wallet.balance = 0;
}

const handleNewAccounts = (acc, state) => {
  console.log('handleNewAccounts:', acc);
  if (!acc.length) {
    localStorage.removeItem('wallet');
    state.wallet = {
      account: null,
      balance: null,
      chainId: '0x4'
    }
    state.isConnection = false;
    return;
  }
  let user = state.wallet.account;

  if (acc.length) {
    if (user !== null) {
      if (user === acc[0]) {
        console.log('handleNewAccounts no changes');
        return;
      } else {
        state.wallet.account = acc[0];
        console.log('handleNewAccounts changes');
      }
    }
  }
}

// getters
const getters = {
  getCurrentFactory: state => state.currentFactory,
  getCurrentToken: state => state.currentToken,
  getFormData: state => state.formData,
  wallet: state => state.wallet,
  isConnection: state => state.isConnection,
  isShowModal: state => state.isShowModal,
  isConnectFail: state => state.isConnectFail,
  isShowNetworkFail: state => state.isShowNetworkFail
}

// mutations
const mutations = {
  SWITCH_FACTORY_TYPE (state) {
    state.currentFactory = {}
     // Lọc Factory theo router path
     const pathName = $nuxt.$route.name
     const indexFactory = _.findIndex(CONTRACT_FACTORY, item => item.path == pathName)

     if (indexFactory > -1) {
       state.currentTypeFactory = CONTRACT_FACTORY[indexFactory]['address']
       if (state.wallet.chainId) {
        state.currentFactory = _.find(state.currentTypeFactory, item => item.chainId == state.wallet.chainId)
      }
     } else {
       // Nếu không có factory thì stop
       return
     }
  },

  SHOW_METAMASK_MODAL (state) {
    state.isShowModal = !state.isShowModal
  },

  SHOW_NETWORK_FAIL(state) {
    state.isShowNetworkFail = !state.isShowNetworkFail
  },

  async CONNECT_METAMASK(state) {
    // console.log('object', $nuxt.$store.state.erc20.currentToken);
    state.isConnectFail = false
    // Kết nối ví Metamask
    if (window.ethereum) {
      try {
        // Request account access if needed
        state.wallet.chainId = window.ethereum.chainId;

        window.ethereum.request({ method: 'eth_requestAccounts' }).then(newAccounts => {
          if(newAccounts){
            state.isConnection = true;
            // update wallet info
            state.wallet.account = newAccounts[0];
            state.wallet.chainId = window.ethereum.chainId;

            localStorage.setItem('wallet', JSON.stringify(state.wallet));

            // handle change network
            window.ethereum.on('chainChanged', (chainId) => {
              state.wallet.chainId = chainId;
              getBalanceOf(state);
              state.currentFactory = _.find(state.currentTypeFactory, item => item.chainId == state.wallet.chainId)
            })

            if (state.wallet.chainId) {
              state.currentFactory = _.find(state.currentTypeFactory, item => item.chainId == state.wallet.chainId)
            }

            window.ethereum.on('accountsChanged', newAccounts => {
              handleNewAccounts(newAccounts, state)
              getBalanceOf(state);
            })
            getBalanceOf(state);
          }
        }).catch(e => {
          console.log('e', e);
          if (e.code != -32002) {
            state.isConnectFail = true
          }
        });
          // const x = await web3.eth.accounts.sign('johnson', "");
      } catch (error) {
        console.error(error);
      }
    } else {
      window.open('https://metamask.io/download', '_blank')
    }

  },

  GET_BALANCE(state) {
    const web3 = new Web3(window.ethereum);
    web3.eth.getBalance(state.wallet.account, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        const balance = web3.utils.fromWei(result, "ether");
        state.wallet.balance = balance;
      }
    })
  },

  UPDATE_WALLET(state, payload) {
    state.wallet = payload;
  },
  UPDATE_CONNECTION(state, payload) {
    state.isConnection = payload;
  },
}

// actions
const actions = {
  showMetaMaskModal({ commit }) {
    commit('SHOW_METAMASK_MODAL')
  },

  switchTypeFactory({ commit }) {
    commit('SWITCH_FACTORY_TYPE')
  },

  connectMetaMask({ commit }) {
    commit('CONNECT_METAMASK')
  },

  getBalance({ commit }) {
    commit('GET_BALANCE')
  },

  updateWallet({ commit }, payload){
    commit('UPDATE_WALLET', payload)
  },

  updateConnection({ commit }, payload) {
    commit('UPDATE_CONNECTION', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

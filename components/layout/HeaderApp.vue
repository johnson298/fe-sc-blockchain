<template>
  <el-header class="header-app">
    <el-row :gutter="20">
      <el-col :xs="12" :sm="10" :md="8" :lg="8" :offset="16" class="d-flex">
        <template v-if="isConnection">
          <div class="head-item ml-0">0 CTR</div>
          <div class="head-item info-wallet">
            <span class="balance">{{balance}} {{symbolCoin}}</span>
            <div class="id-wallet center-box">
              <el-image :src="require('@/assets/images/icon/metamask.svg')" class="icon" /> {{accountId}}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="head-item bg-transparent">&nbsp;</div>
          <div class="head-item connect-wallet"
            @click="showMetaMaskModal">Connect Wallet</div>
        </template>
      </el-col>
    </el-row>
    <metamask-modal></metamask-modal>
    <network-fail></network-fail>
  </el-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatAddressAccount, formatDecimal } from '@/utils/helpers';
import MetamaskModal from '../metamask/MetamaskModal.vue';

export default {
  components: { MetamaskModal },
  data() {
    return {
      symbolCoin: 'ETH',
    }
  },

  mounted() {
    try {
      const wallet = window.localStorage.getItem('wallet');
      if(wallet){
        this.updateWallet(JSON.parse(wallet));
        this.updateConnection(true);
        this.connectMetaMask();
      }
      this.switchTypeFactory()
    } catch (e){}
  },
  computed: {
    ...mapGetters('chain', ['wallet', 'isConnection']),

    accountId() {
      return formatAddressAccount(this.wallet.account);
    },
    balance() {
      return formatDecimal(this.wallet.balance);
    }
  },
  methods: {
    ...mapActions('chain', [
      'showMetaMaskModal',
      'switchTypeFactory',
      'connectMetaMask',
      'updateWallet',
      'updateConnection'
    ]),
  },
  watch: {
    wallet: {
      deep: true,
      handler(oldValue, newValue) {
        if(newValue.chainId === '0x61' || newValue.chainId === '0x38'){
          this.symbolCoin = 'BNB';
        } else {
          this.symbolCoin = 'ETH';
        }
      }
    },
    '$route' (val) {
      if (val) {
        this.switchTypeFactory()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .header-app {
    .connect-wallet{
      background: #3A1A53 !important;
      cursor: pointer;
    }
    .head-item {
      min-width: 100px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border-radius: 10px;
      color: #fff;
      font-size: 14px;
      background: #1A2748;
      margin-left: 20px;
      padding: 0 15px;
    }
    .info-wallet{
      display: flex;
      padding-right: 0;
      background: #2F2640;
      .balance{
        padding-right: 10px;
      }
      .id-wallet{
        background: #221933;
        border-radius: 10px;
        padding: 10px;
        .icon{
          margin-right: 10px;
          display: inherit;
          transform: translateY(-3px);
        }
      }
    }
  }
</style>

<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible="isShow"
    width="370px"
    custom-class="modal-dark"
    @close="handleCancel"
    centered>
    <div class="text-center">
      <div class="mb-1">
        <h1 class="title-head">Transaction success</h1>
        <p class="text-16 mt-1">Token created successfully!</p>
      </div>
      <div>
        <img src="@/assets/images/icon/check-success.svg" width="50" />
      </div>
      <div>
        <el-button type="info" class="add-CTR mb-2 mt-2" @click="addSymbol">
          <div v-if="!isAdded" class="d-flex items-center">
            <img src="@/assets/images/icon/metamask.svg" v-loading="busy">
            <span class="ml-1">Add {{ tokenSymbol }} to Metamask</span>
          </div>
          <div v-else class="d-flex items-center">
            <img src="@/assets/images/icon/checked.png">
            <span class="ml-1">Added {{ tokenSymbol }}</span>
          </div>
        </el-button>
      </div>
      <div>
        <el-button
          type="primary"
          class="radius-10 fw-600"
          size="medium"
          @click="explorer">View on explorer</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    logoLink: {
      type: String,
      default: 'https://ipfs.io/ipfs/QmdAruvmyiLnNUGy3zHEnB481pU51ph47KVSRWUncYgXSa'
    },
    type: {
      type: String,
      required: true
    },
    tokenSymbol: {
      type: String,
      default: null
    },

    tokenDecimal: {
      type: [Number, String],
      default: null
    },

    getCurrentToken: {
      type: String,
      default: null
    },

    getTransactionHash: {
      type: String,
      default: null
    },

    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAdded: false,
      busy: false
    }
  },

  computed: {
    ...mapGetters('chain', [
      'getCurrentFactory'
    ]),
  },

  mounted() {
  },

  methods: {
    async addSymbol() {
      this.busy = true
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: this.type, // Initially only supports ERC20, but eventually more!
            options: {
              address: this.getCurrentToken, // The address that the token is at.
              symbol: this.tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: this.tokenDecimal, // The number of decimals in the token
              image: this.logoLink, // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          console.log('Thanks for your interest!');
          this.isAdded = true
        } else {
          console.log('Your loss!');
        }
        this.busy = false
      } catch (error) {
        this.busy = false
        console.log(error);
      }
    },
    handleCancel() {
      this.isAdded = false
      this.$emit('onClose', false);
    },
    explorer() {
      window.open(this.getCurrentFactory.contractUrl + this.getCurrentToken, '_blank')
    }
  },

  watch: {

  }
}

</script>

<style lang="scss">
  .add-CTR {
    border-radius: 29px;
  }

</style>

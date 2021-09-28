<template>
  <div class="creator-form-group mt-1">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      :validate-on-rule-change="false"
      label-position="top">

      <el-form-item label="Network" prop="network">
        <select-network></select-network>
      </el-form-item>

      <el-form-item label="Select ERC20 Token Factory" class="mb-0" prop="type">
        <el-checkbox-group v-model="selectFactory">
          <el-checkbox label="mintable">Mintable Token</el-checkbox>
          <el-checkbox label="burnable">Burnable Token</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="Logo" required>
        <template #label>
          <label-tooltip
            label="Logo"
            content="Used to define the token’s name, which other contracts and applications can identify"
            ></label-tooltip>
        </template>
        <file-upload
          v-model="form.bufferMedia"
          textAccept="Image of at least 400x400"
          :messError="$t('MSG_015')"
          :customErrorMess="customErrorMess"
          :isImage="true"
          accept="image/*"
          @onReject="customErrorMess = ''"
        ></file-upload>
      </el-form-item>

      <el-form-item prop="tokenName">
        <template slot="label">
          <label-tooltip
            label="Token Name"
            content="Used to define the token’s name, which other contracts and applications can identify"
          ></label-tooltip>
        </template>
        <el-input v-valid-regex="/^[a-zA-Z0-9-_ ]*$/" v-model="form.tokenName" placeholder="New Token"></el-input>
      </el-form-item>

      <el-form-item prop="tokenSymbol">
        <template slot="label">
          <label-tooltip
            label="Token Symbol"
            content="Used to define token’s shorthand name or symbol"
          ></label-tooltip>
        </template>
        <el-input v-model="form.tokenSymbol" v-valid-regex="/^[a-zA-Z0-9 ]*$/" placeholder="STD"></el-input>
      </el-form-item>

      <el-form-item prop="tokenDecimals">
        <template slot="label">
          <label-tooltip
            label="Token Decimals"
            :content="`Number of decimal digits used in the amounts (e.g. 18 for ${getSymbolCoin})`"
          ></label-tooltip>
        </template>
        <number-input v-model="form.tokenDecimals" placeholder="18" :max-value="18"></number-input>
        <el-input style="display: none" :value="form.tokenDecimals"></el-input>
      </el-form-item>

      <el-form-item prop="tokenSupply">
        <template slot="label">
          <label-tooltip
            label="Initial Supply"
            content="The number of tokens created when this contract is deployed. In this case, the number is arbitrary"
          ></label-tooltip>
        </template>
        <number-input v-model="form.tokenSupply" placeholder="1,000" :max-value="Math.pow(10,15)"></number-input>
        <el-input style="display: none" :value="form.tokenSupply"></el-input>
      </el-form-item>

      <el-form-item v-if="hasMintable" prop="supplyCap">
        <template slot="label">
          <label-tooltip
            required
            label="Supply Cap"
            content="This token's supply will grow until the cap is reached. After that, no more tokens can be minted"
          ></label-tooltip>
        </template>
        <number-input v-model="form.supplyCap" placeholder="1,000" :max-value="Math.pow(10,15)"></number-input>
      </el-form-item>

      <el-form-item size="large" class="text-center mt-2">
        <el-button v-if="!isValidNetwork(getCurrentNetwork, false)" 
          type="primary" class="radius-10 fw-600"
          @click="scrollToNetwork">Wrong Network</el-button>
        <el-button v-else-if="isConnection" type="primary" class="radius-10 fw-600" @click="onSubmit">Submit</el-button>
        <el-button v-else type="primary" class="radius-10 fw-600" @click="connectWallet">Connect to a wallet</el-button>
      </el-form-item>
    </el-form>

    <div class="form-group-message">
      <p v-show="isConnection && !getTransactionHash">You have not created any token contracts yet!</p>
      <p v-show="!isConnection">You are not using an Ethereum compatible browser. Try Metamask!</p>
    </div>
    <confirm-modal
      :isShow="isShownConfirm"
      :formData="form"
      :currentTypeFee="currentTypeFee"
      @onClose="isShownConfirm = false"
      @onSuccess="handleSuccess"
    >
    </confirm-modal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Web3 from 'web3'
import ConfirmModal from '@/components/erc20/ConfirmModal.vue';
import _ from 'lodash'
import { NETWORKS, SERVICE_TYPE_ERC } from '@/const/chain';
import { TIME_RESET_TOKEN } from '@/const/common';
import ErcRules from '@/mixins/ercRules'

export default {
  components: {
    ConfirmModal
  },

  props: {
    currentTypeFee: Object
  },

  mixins: [ErcRules],

  data() {
    return {
      NETWORKS,
      keyUpdateUpload: new Date().toString(),
      hasMintable: false,
      isShownConfirm: false,
      errorLogo: false,
      selectFactory: [],
      customErrorMess: '',
      timeOut: TIME_RESET_TOKEN,
      form: {
        serviceType: 1,
        bufferMedia: null,
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: null,
        tokenSupply: null,
        supplyCap: null,
        serviceFee: 0
      },
    };
  },

  mounted() {
    this.formValidate = this.form
  },

  computed: {
    ...mapGetters(['getCurrentNetwork']),

    ...mapGetters('erc20', [
      'getCurrentToken',
      'getTransactionHash',
      'getReceiptStatus',
      'getErrorStatus',
      'getCurrentFactory'
    ]),

    ...mapGetters('chain', ['wallet', 'isConnection']),

    SERVICE_TYPE_ERC() {
      return SERVICE_TYPE_ERC
    }
  },

  watch: {
    getCurrentNetwork() {
      this.getTotalServiceFee(this.selectFactory)
    },

    selectFactory (values) {
      this.getTotalServiceFee(values)
    }
  },

  methods: {
    ...mapActions({
      connectWallet: "chain/showMetaMaskModal",
      resetStatusCreateToken: "erc20/resetStatusCreateToken",
    }),

    getTotalServiceFee(items) {
      this.hasMintable = false;
      if (!items.length) {
        this.form.serviceFee = this.currentTypeFee.serviceFee
      }
      this.form.serviceType = SERVICE_TYPE_ERC.default

      _.forEach(items, value => {
        if (value == 'mintable') {
          this.form.serviceFee = parseFloat(this.currentTypeFee.mintableFee).toFixed(2);
          this.form.serviceType = SERVICE_TYPE_ERC.mintable
          this.hasMintable = true;
        }
        if (value == 'burnable') {
          this.form.serviceFee = parseFloat(this.currentTypeFee.burnableFee).toFixed(3)
          this.form.serviceType = SERVICE_TYPE_ERC.burnable
        }
      })
      if (items.length == 2) {
        this.form.serviceFee = parseFloat(this.currentTypeFee.mintableFee + this.currentTypeFee.burnableFee).toFixed(3)
        this.form.serviceType = SERVICE_TYPE_ERC.mintableBurnable
      }
      this.$emit('onServiceFee', this.form.serviceFee)
    },

    resetForm() {
      this.form = {
        serviceType: SERVICE_TYPE_ERC.default,
        bufferMedia: null,
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: null,
        tokenSupply: null,
        supplyCap: null,
        serviceFee: this.currentTypeFee.serviceFee
      }
      this.selectFactory = []
      this.formValidate = this.form
      setTimeout(() => { this.resetStatusCreateToken() }, this.timeOut);
    },

    async onSubmit() {

      this.resetStatusCreateToken();
      this.timeOut = TIME_RESET_TOKEN

      let web3Accounts = [];
      if (!this.selectFactory.includes('mintable')) this.form.supplyCap = null
      const web3 = new Web3(Web3.givenProvider)
      await web3.eth.getAccounts().then((accounts) => {
        web3Accounts = accounts
      })

      if (web3Accounts.length == 0) {
        this.notifyMessage('MetaMask is unlocked. Please locked!', 'warning')
        return false
      }

      if(!this.form.bufferMedia){
        this.customErrorMess = this.$t('MSG_015');
      }

      this.$refs.form.validate(valid => {

        if(this.errorLogo || !this.form.bufferMedia){
          return;
        }

        if (valid) {
          this.customErrorMess = '';
          this.isShownConfirm = true;
          return false;
        } else {
          return false;
        }
      });
    },

    handleSubmit() {
      this.isShownConfirm = false
    },

    handleClose() {
      this.isShownConfirm = false
    },

    handleSuccess() {
      if (this.getTransactionHash) {
        this.resetForm()
        this.$refs.form.resetFields()
      }
    },
  },
};

</script>

<style>
</style>

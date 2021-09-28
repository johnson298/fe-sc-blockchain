<template>
  <fragment>
    <el-dialog :visible.sync="isShow" custom-class="modal-light-blue confirm-modal" width="540px" top="5vh"
      :before-close="handleClose" :close-on-click-modal="false">
      <div class="has-wallet">
        <div class="text-center">
          <h2 class="title-head">Launching Your Token: {{ formData.tokenName }}</h2>
          <p class="advisor"></p>
          <p class="sub-title">You are about to launch your token contract using:</p>
        </div>
        <div v-if="formData.tokenName" class="modal-content mt-2">
          <div class="card">
            <span class="">Please make sure all of your settings are correct. Many settings are not adjustable after
              launch.</span>
          </div>
          <br />
          <div class="card">
            <p class="card-title">Your Token Settings:</p>
            <el-row>
              <el-col :span="12">Token Type:</el-col>
              <el-col :span="12">ERC-20</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">Token Name:</el-col>
              <el-col :span="12">{{formData.tokenName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">Token Symbol:</el-col>
              <el-col :span="12">{{formData.tokenSymbol}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">Token Decimals:</el-col>
              <el-col :span="12">{{formData.tokenDecimals}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">Inital Supply:</el-col>
              <el-col :span="12">{{ (formData.tokenSupply) }}</el-col>
            </el-row>
            <el-row v-show="formData.supplyCap">
              <el-col :span="12">Supply Cap:</el-col>
              <el-col :span="12">{{ (formData.supplyCap) }}</el-col>
            </el-row>
          </div>
          <br />
          <div class="card">
            <el-row>
              <el-col :span="12"><span style="font-weight: 600">Service fee:</span></el-col>
              <el-col :span="12">{{ formData.serviceFee }} {{getSymbolCoin}}</el-col>
            </el-row>
            <p>&nbsp;</p>
          </div>
          <div class="card">
            <p class="fw-600" style="line-height: 20px;">Gas fee:</p>
            <span>Default Gas cost is 30 GWei but may be changed for each transaction.
              <br />5 to 30 GWei is a good range for Gas cost and higher if you want the transaction to complete faster.
              You may have to wait a very long time if you pick a Gascost less than 5 GWei.</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer text-center">
        <el-button type="primary" class="radius-10 fw-600" size="medium" @click="onSubmit">Confirm</el-button>
      </span>
    </el-dialog>
    <loading-modal :isShow="isShownLoading" @onClose="isShownLoading = false"></loading-modal>
    <transaction-success type="ERC20" :isShow="isShownSuccess" :tokenSymbol="formData.tokenSymbol"
      :tokenDecimal="formData.tokenDecimals" :getCurrentToken="getCurrentToken" :getTransactionHash="getTransactionHash"
      :logoLink="logoLink" @onClose="handleSuccessClose">
    </transaction-success>
    <error-modal :transaction-hash="getTransactionHash" :isShow="isShownError" @onClose="handleErrorClose" />
  </fragment>
</template>

<script>
import LoadingModal from '../common/LoadingModal.vue';
import TransactionSuccess from '../common/TransactionSuccess.vue';
import { mapActions, mapGetters } from 'vuex';
import ErrorModal from '../common/ErrorModal.vue';
import { SERVICE_TYPE_ERC } from '@/const/chain'

export default {
  components: {
    LoadingModal,
    TransactionSuccess,
    ErrorModal
  },
  props: {
    currentTypeFee: Object,
    formData: {
      type: Object,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false,
      isShownLoading: false,
      isShownSuccess: false,
      isShownError: false,
      SERVICE_TYPE_ERC,
      logoLink: ''
    }
  },

  computed: {
    ...mapGetters(['getCurrentNetwork']),

    ...mapGetters('erc20', [
      'getConfirmStatus',
      'getCurrentToken',
      'getTransactionHash',
      'getReceiptStatus',
      'getErrorStatus',
    ])
  },

  mounted() {},

  methods: {
    ...mapActions({
      createToken: 'erc20/createToken'
    }),

    handleClose() {
      this.$emit('onClose')
    },

    handleSuccessClose() {
      this.isShownSuccess = false
      this.$emit('onSuccess')
    },

    handleErrorClose() {
      this.isShownError = false
      this.$emit('onSuccess')
    },

    async onSubmit() {
      if (!this.isValidNetwork(this.getCurrentNetwork)) return

      this.$emit('onClose')
      this.isShownLoading = true

      this.createToken({
        formData: [
          this.formData.serviceType,
          this.formData.tokenName,
          this.formData.tokenSymbol,
          this.parseNumber(this.formData.tokenDecimals),
          this.parseNumber(this.formData.tokenSupply),
          this.formData.supplyCap ? this.parseNumber(this.formData.supplyCap) : 1
        ],
        serviceFee: this.formData.serviceFee
      })
    },
  },

  watch: {
    isShow(val) {
      this.visible = val
    },

    getTransactionHash(val) {
      if (val) {
        this.$emit('close', false);
      }
    },

    async getReceiptStatus(val) {
      if (val) {
        this.isShownLoading = false;
        if (val.status) {
          this.isShownSuccess = true;
          if (this.formData.bufferMedia) {
            this.logoLink = await this.uploadImageByIpfs(this.formData.bufferMedia);
          }
        } else {
          this.isShownError = true
        }
      }
    },

    getErrorStatus(val) {
      if (val) {
        this.isShownLoading = false
        this.isShownError = true
      }
    }
  }
}

</script>

<style>

</style>

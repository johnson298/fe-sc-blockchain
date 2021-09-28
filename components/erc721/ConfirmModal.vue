<template>
  <div>
    <el-dialog
      class="modal-light-blue"
      :visible.sync="isShow"
      top="5vh"
      width="30%"
      custom-class="modal-light-blue confirm-modal"
      :before-close="handleClose"
      :close-on-click-modal="false">
      <span
        class="back-step"
        v-if="stepFormNumber === 2"
        @click="backStep">
        <img src="@/assets/images/icon/prev.svg" alt="">
      </span>
      <div class="confirm-card">
        <div class="text-center">
          <h2 v-if="stepFormNumber === 1" class="title-head">Launching Your Token: {{ formData.name }}</h2>
          <h2 v-else class="title-head">Launching Your NFT: {{ formData.name }}</h2>
          <p class="advisor"></p>
        </div>

        <div v-show="stepFormNumber === 1" class="modal-content mt-2">
          <div class="card">
            <p class="sub-title text-center">You are about to launch your token contract using:</p>
            <p class="mt-1 mb-2">Please make sure all of your settings are correct. Many settings are not adjustable after launch.</p>
          </div>
          <br/>
          <div class="card">
            <p class="card-title">Your Token Settings:</p>
            <el-row>
              <el-col :span="12">Token Type:</el-col>
              <el-col :span="12">ERC-721</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">Token Name:</el-col>
              <el-col :span="12">{{ formData.name }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">Token Symbol:</el-col>
              <el-col :span="12">{{ formData.symbol }}</el-col>
            </el-row>
            <el-row style="margin-top: 50px;" class="mb-2">
              <el-col :span="12">Token Description:</el-col>
              <el-col :span="12">{{ formData.description }}</el-col>
            </el-row>
          </div>
        </div>

        <div v-show="stepFormNumber === 2" class="modal-content mt-2">
          <div class="card">
            <p class="sub-title text-center">You are about to launch your NFT using:</p>
            <p class="mt-1 mb-2">Please make sure all of your settings are correct. Many settings are not adjustable after launch.</p>
          </div>
          <br/>
          <div class="card">
            <p class="card-title">Your NFT Settings:</p>
            <el-row>
              <el-col :span="12">Name:</el-col>
              <el-col :span="12">{{ formMetadata.name }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">Description:</el-col>
              <el-col :span="12">{{ formMetadata.description }}</el-col>
            </el-row>
          </div>
          <br/>
          <div class="card" style="margin-top: 30px;">
            <el-row>
              <el-col :span="12"><span class="fw-600">Service fee:</span></el-col>
              <el-col :span="12"><span class="fw-600">{{ formData.serviceFee }} {{getSymbolCoin}}</span></el-col>
            </el-row>
            <p>&nbsp;</p>
          </div>
          <div class="card" style="margin-top: 30px;">
            <p  class="fw-600" style="line-height: 20px;">Gas fee:</p>
            <p>Default Gas cost is 30 GWei but may be changed for each transaction.</p>
            <p>5 to 30 GWei is a good range for Gas cost and higher if you want the transaction to complete faster. You
              may have to wait a very long time if you pick a Gascost less than 5 GWei.</p>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer text-center">
          <el-button
            v-show="stepFormNumber === 1"
            type="success"
            class="radius-10 fw-600"
            size="medium"
            @click="nextStep">Next step</el-button>
          <el-button
            v-show="stepFormNumber === 2"
            type="success"
            class="radius-10 fw-600 w-11"
            size="medium"
            @click="onSubmit">Confirm</el-button>
      </span>
    </el-dialog>

    <loading-modal :isShow="isShownLoading" @onClose="handleLoadingClose"/>

    <transaction-success
      type="ERC721"
      :isShow="isShownSuccess"
      :logoLink="logoLink"
      :tokenSymbol="formData.symbol"
      :tokenDecimal="1"
      :getCurrentToken="getCurrentToken"
      :getTransactionHash="getTransactionHash"
      @onClose="handleSuccessClose"/>

    <error-modal
      :transaction-hash="getTransactionHash"
      :isShow="isShownError"
      @onClose="handleErrorClose"/>
  </div>
</template>

<script>
import LoadingModal from '../common/LoadingModal.vue';
import TransactionSuccess from '../common/TransactionSuccess.vue';
import {mapActions, mapGetters} from 'vuex';
import ErrorModal from '../common/ErrorModal.vue';
import {uploadMetaDataToIpfs, generateImageByIpfs} from '@/utils/helpers';
import fee from '@/const/fee'

const STEP_FORM = {
  token: 1,
  metadata: 2
}
export default {
  components: {
    LoadingModal,
    TransactionSuccess,
    ErrorModal
  },
  props: {
    formData: {
      type: Object,
      default: null
    },
    formMetadata: {
      type: Object,
      default: null
    },
    currentTypeFee: {
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
      stepFormNumber: STEP_FORM.token,
      logoLink: null,
      visible: false,
      isShownLoading: false,
      isShownSuccess: false,
      isShownError: false,
    }
  },

  computed: {
    ...mapGetters(['getCurrentNetwork']),

    ...mapGetters('erc721', [
      'getConfirmStatus',
      'getTransactionHash',
      'getReceiptStatus',
      'getErrorStatus',
      'getCurrentToken',
    ]),
  },

  methods: {
    ...mapActions({
      createToken: 'erc721/createToken'
    }),

    handleClose() {
      this.stepFormNumber = STEP_FORM.token
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

    handleLoadingClose() {
      this.isShownLoading = false
    },

    backStep() {
      this.stepFormNumber = STEP_FORM.token;
    },

    nextStep() {
      this.stepFormNumber = STEP_FORM.metadata;
    },

    async onSubmit() {
      if(!this.isValidNetwork(this.getCurrentNetwork)) return

      this.$emit('onClose')
      this.isShownLoading = true
      this.stepFormNumber = STEP_FORM.token;

      const metadataHash = await uploadMetaDataToIpfs(this.formMetadata)
      const metadataUrl = `https://ipfs.io/ipfs/${metadataHash._baseCache.get("z")}/metadata.json`

      const {type, name, symbol, serviceFee, description} = this.formData;
      this.createToken({
        type: type ? 1 : 0,
        name,
        symbol,
        serviceFee,
        description,
        metadataUrl
      });

    },
  },

  watch: {

    isShow(val) {
      this.visible = val
    },

    async getReceiptStatus(val) {
      if (val) {
        this.isShownLoading = false;
        this.isShownSuccess = true;
      }
    },

    getErrorStatus(val) {
      if (val) {
        this.isShownLoading = false
        this.isShownError = true
      }
    },
  }
}
</script>

<style>

</style>

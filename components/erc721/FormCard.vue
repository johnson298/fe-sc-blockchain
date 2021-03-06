<template>
  <div class="creator-form-group mt-1">
    <div v-show="stepFormNumber === 1">
      <el-form
        ref="form"
        :validate-on-rule-change="false"
        :rules="rules"
        :model="formData"
        label-width="120px"
        label-position="top">

        <el-form-item label="Network" prop="network">
          <select-network></select-network>
        </el-form-item>

        <el-form-item label="Select ERC721 Token Factory" class="mb-0" prop="type">
          <el-checkbox-group v-model="formData.type">
            <el-checkbox label="Burnable Token" name="type"></el-checkbox>
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
            v-model="formData.bufferMedia"
            textAccept="Image of at least 400x400"
            :messError="$t('MSG_015')"
            :customErrorMess="errLogoMess"
            :isImage="true"
            accept="image/*"
            @onReject="errLogoMess = ''"
          ></file-upload>
        </el-form-item>

        <el-form-item label="Token Name" prop="name">
          <template slot="label">
            <label-tooltip
              label="Token Name"
              content="Used to define the token’s name, which other contracts and applications can identify"
            ></label-tooltip>
          </template>
          <el-input v-valid-regex="/^[a-zA-Z0-9-_ ]*$/" v-model="formData.name" placeholder="New Token" name="name"></el-input>
        </el-form-item>

        <el-form-item label="Token Symbol" prop="symbol">
          <template slot="label">
            <label-tooltip
              label="Token Symbol"
              content="Used to define token’s shorthand name or symbol"
            ></label-tooltip>
          </template>
          <el-input v-model="formData.symbol" placeholder="STD" name="symbol"></el-input>
        </el-form-item>

        <el-form-item label="Token Description"  prop="description">
          <template slot="label">
            <label-tooltip
              label="Token Description"
              content="Describes the asset to which this token represents"
            ></label-tooltip>
          </template>
          <el-input
            :rows="6"
            type="textarea"
            v-model="formData.description"
            controls-position="right"
            placeholder="Describes the asset to which this token represents"></el-input>
        </el-form-item>

        <el-form-item size="large" class="text-center mt-2">
          <template v-if="isConnection">
            <el-button v-if="!isValidNetwork(getCurrentNetwork, false)"
                       type="primary" class="radius-10 fw-600"
                       @click="scrollToNetwork">
              Wrong Network</el-button>
            <el-button
              type="success"
              class="radius-10 fw-600 w-11"
              @click="nextToMetadataStep"
              v-else-if="isConnection">
              Next Step</el-button>
          </template>

          <template v-else>
            <el-button type="success" class="radius-10 fw-600" @click="connectWallet">Connect to a wallet</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>

    <div v-show="stepFormNumber === 2">
      <el-form
        ref="formMetadata"
        :validate-on-rule-change="false"
        :rules="rules"
        :model="formMetadata"
        label-width="120px"
        label-position="top">

        <p class="mb-1">Metadata</p>
        <el-form-item label="Image" :class="{'mb-0': errorImage}" required>
          <file-upload
            v-model="formMetadata.bufferMedia"
            textAccept="PNG, GIF, WEBP, MP4 or MP3. Max 100mb"
            :customErrorMess="errImageMess"
            :messError="$t('MSG_012')"
            :isImage="false"
            accept="*"
            @onReject="errImageMess = ''"
          ></file-upload>
        </el-form-item>

        <el-form-item label="Name" prop="name">
          <template slot="label">
            <label-tooltip
              label="Name"
              content="Used to define the token’s name, which other contracts and applications can identify"
            ></label-tooltip>
          </template>
          <el-input v-valid-regex="/^[a-zA-Z0-9-_ ]*$/" v-model="formMetadata.name" placeholder="New Token" name="name"></el-input>
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <template slot="label">
            <label-tooltip
              label="Description"
              content="Describes the asset to which this NFT represents"
            ></label-tooltip>
          </template>
          <el-input
            :rows="6"
            type="textarea"
            v-model="formMetadata.description"
            controls-position="right"
            placeholder="Describes the asset to which this NFT represents"></el-input>
        </el-form-item>
        <div class="advanced-attr-txt"
          @click="formMetadata.isAdvance = !formMetadata.isAdvance">
          {{ formMetadata.isAdvance ? 'Hide' : 'Show' }} advanced attributes
        </div>
        <el-collapse-transition>
          <div class="advanced-attr" v-show="formMetadata.isAdvance">
            <p class="fw-normal">Attributes</p>
            <div class="attr-new">
              <div class="attr-new__header">
                <h5>Properties</h5>
                <p class="mb-0 text-gray">Properties show up underneath your item.</p>
                <span class="action" @click="isAddProperties = true"><img src="@/assets/images/icon/plus.svg" class="is-circle" width="16px" height="16px"></span>
              </div>
              <div class="attr-new__content">
                <div
                  class="attr-new__content-item"
                  :key="`props_${index}`"
                  v-for="(item, index) in formMetadata.attributes.properties">
                  <p class="text-overflow" :title="item.type">{{item.type}}</p>
                  <span  class="text-overflow" :title="item.name">{{ item.name }}</span>
                </div>
              </div>
            </div>
            <div class="attr-new">
              <div class="attr-new__header">
                <h5>Levels</h5>
                <p class="mb-0 text-gray">Levels show up underneath your item.</p>
                <span class="action" @click="isAddLevels = true"><img src="@/assets/images/icon/plus.svg" class="is-circle" width="16px" height="16px"></span>
              </div>
              <div class="attr-new__content">
                <div class="attr-new__content-item attr-new__content-item--with" v-for="(level, index) in formMetadata.attributes.levels" :key="`level_${index}`">
                  <div class="level">
                    <span class="name" :title="level.name">{{ level.name }}</span>
                    <span class="a-process"><span class="a-val" :title="toExponential(level.value)">{{ toExponential(level.value) }}</span> <span class="mx-5px">of</span> <span class="a-maxVal" :title="toExponential(level.maxValue)">{{ toExponential(level.maxValue) }}</span></span>
                  </div>
                  <div class="progress-bar">
                    <div class="bar" :style="{width: `${(level.value / level.maxValue)*100}%`}"></div>
                  </div>
                </div>
              </div>

            </div>
            <div class="attr-new">
              <div class="attr-new__header">
                <h5>Stats</h5>
                <p class="mb-0 text-gray">Stats show up underneath your item.</p>
                <span class="action" @click="isAddStats = true"><img src="@/assets/images/icon/plus.svg" class="is-circle" width="16px" height="16px"></span>
              </div>
              <div class="attr-new__content">
                <div class="attr-new__content-item" v-for="(stat, index) in formMetadata.attributes.stats" :key="`state_${index}`">
                  <p class="text-overflow" :title="stat.name">{{ stat.name }}</p>
                  <span class="a-process a-process-stat"><span class="a-val" :title="stat.value">{{ stat.value }}</span> <span class="mx-5px">of</span> <span class="a-maxVal" :title="stat.maxValue">{{ stat.maxValue }}</span></span>
                </div>
              </div>

            </div>
          </div>
        </el-collapse-transition>


        <el-form-item size="large" class="text-center mt-2">
          <el-button
            type="primary"
            class="radius-10 fw-600 btn-default"
            @click="backToFormToken"
            v-if="isConnection">Back</el-button>
          <el-button
            type="success"
            class="radius-10 fw-600 w-11"
            @click="onSubmit"
            v-if="isConnection">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="form-group-message">
      <p v-show="isConnection && !getTransactionHash" class="mt-0">You have not created any token contracts yet!</p>
      <p v-show="!isConnection">You are not using an Ethereum compatible browser. Try Metamask!</p>
    </div>

    <confirm-modal
      :isShow="isShownConfirm"
      :formData="formData"
      :formMetadata="formMetadata"
      :currentTypeFee="currentTypeFee"
      @onClose="isShownConfirm = false"
      @onSuccess="handleSuccess"
    />

    <!--add new properties-->
    <add-modal
      v-if="isAddProperties"
      :title="'Add Properties'"
      :data="formMetadata.attributes.properties"
      :type="'properties'"
      :isShown="isAddProperties"
      @close="isAddProperties = $event"
      @onSubmit="addNewProperties($event)" />

    <!--add new levels-->
    <add-modal
      v-if="isAddLevels"
      :title="'Add Levels'"
      :data="formMetadata.attributes.levels"
      :type="'levels'"
      :isShown="isAddLevels"
      @close="isAddLevels = $event"
      @onSubmit="addNewLevels($event)" />

    <!--add new properties-->
    <add-modal
      v-if="isAddStats"
      :title="'Add Stats'"
      :data="formMetadata.attributes.stats"
      :type="'stats'"
      :isShown="isAddStats"
      @close="isAddStats = $event"
      @onSubmit="addNewStats($event)" />

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ConfirmModal from './ConfirmModal.vue';
import AddModal from "../common/AddModal";
import { TIME_RESET_TOKEN } from '@/const/common';

import rules from "./rules";

const STEP_FORM = {
  token: 1,
  metadata: 2
}
import ErcRules from '@/mixins/ercRules721'
export default {
  components: { ConfirmModal, AddModal },

  props: {
    currentTypeFee: Object
  },
  mixins: [ErcRules],

  data() {
    return {
      errImageMess: '',
      errLogoMess: '',
      stepFormNumber: STEP_FORM.token,
      isAddProperties: false,
      isAddLevels: false,
      isAddStats: false,
      isShownCap: false,
      isShownConfirm: false,
      isActive: false,
      isConfirmed: false,
      errorImage: false,
      timeOut: TIME_RESET_TOKEN,
      errorLogo: false,
      formData: {
        network: '2',
        type: false,
        name: '',
        symbol: '',
        bufferMedia: null,
        description: '',
        serviceFee: 0
      },
      formMetadata: {
        name: '',
        bufferMedia: null,
        description: '',
        isAdvance: false,
        attributes: {
          properties: [],
          levels: [],
          stats: []
        }
      },
    };
  },

  computed: {
    ...mapGetters(['getCurrentNetwork']),

    account() {
      return this.$store.state.chain.account
    },

    ...mapGetters('erc721', [
      'getCurrentToken',
      'getTransactionHash',
      'getReceiptStatus',
      'getErrorStatus',
      'getCurrentFactory',
      //child
      'getTransactionHashChild'
    ]),

    ...mapGetters('chain', [
      'isConnection'
    ])

  },

  watch: {
    getCurrentNetwork() {
      this.getTotalServiceFee(this.formData.type)
    },

    'formData.type' (val) {
      this.getTotalServiceFee(val)
    }
  },

  methods: {
    ...mapActions({
      connectWallet: "chain/showMetaMaskModal",
      createToken: "erc721/createToken",
      resetStatusCreateToken: "erc721/resetStatusCreateToken",
    }),

    getTotalServiceFee(val) {
      this.formData.serviceFee = this.currentTypeFee.serviceFee
      if (val) {
        this.formData.serviceFee += this.currentTypeFee.burnableFee
      }
      this.$emit('getServiceFee', this.formData.serviceFee)
    },

    addNewProperties(data) {
      this.formMetadata.attributes.properties = data.filter(item => item.type && item.name);
    },
    addNewLevels(data) {
      this.formMetadata.attributes.levels = data.filter(item => item.name && item.value && item.maxValue);
    },
    addNewStats(data) {
      this.formMetadata.attributes.stats = data.filter(item => item.name && item.value && item.maxValue);
    },

    initFormData() {
      this.formData = {
        network: '2',
        type: false,
        name: '',
        symbol: '',
        bufferMedia: null,
        description: '',
        serviceFee: this.currentTypeFee.serviceFee
      }
    },

    initFormMetadata() {
      this.formMetadata = {
        name: '',
        bufferMedia: null,
        description: '',
        serviceFee: this.currentTypeFee.serviceFee,
        isAdvance: false,
        attributes: {
          properties: [],
          levels: [],
          stats: []
        }
      }
    },

    nextToMetadataStep() {
      if (!this.formData.type) {
        this.formData.serviceFee = this.currentTypeFee.serviceFee
      }

      if(!this.formData.bufferMedia){
        this.errLogoMess = this.$t('MSG_015');
      }

      this.$refs['form'].validate(valid => {
        if(this.errorLogo || !this.formData.bufferMedia){
          return;
        }
        if(valid){
          this.errLogoMess = '';
          // this.isShownConfirm = true;
          this.stepFormNumber = STEP_FORM.metadata;
        }
      })
    },

    backToFormToken() {
      this.stepFormNumber = STEP_FORM.token;
    },

    onSubmit() {
      this.resetStatusCreateToken();
      this.timeOut = TIME_RESET_TOKEN
      if(!this.formMetadata.bufferMedia){
        this.errImageMess = this.$t('MSG_012');
      }

      this.$refs['formMetadata'].validate(valid => {
        if(this.errorImage || !this.formMetadata.bufferMedia){
          return;
        }
        if(valid){
          this.errImageMess = '';
          this.isShownConfirm = true;
        }
      })
    },

    handleSubmit() {
      this.isShownConfirm = false
    },

    handleClose() {
      this.isShownConfirm = false
    },

    handleSuccess() {
      if (this.getTransactionHash) {
        this.initFormData()
        this.initFormMetadata()
        this.stepFormNumber = STEP_FORM.token;
        this.$refs.form.resetFields()
        this.$refs.formMetadata.resetFields()
        setTimeout(() => {this.resetStatusCreateToken();}, this.timeOut);
      }
    },
  },
};

</script>

<style scoped lang="scss">
.btn-default{
  border: 2px solid #A535E5;
  background-color: transparent;
  &:hover{
    background-color: transparent !important;
  }
}
.error-label {
  font-size: 10px;
  color: #F56C6C;
}
.advanced-attr-txt{
  text-decoration: underline;
  text-align: right;
  color: #4AA7FA;
  cursor: pointer;
  margin-bottom: 15px;
}

</style>

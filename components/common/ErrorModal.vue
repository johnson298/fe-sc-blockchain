<template>
  <el-dialog centered :visible="isShow" width="370px" custom-class="modal-light-blue" :close-on-click-modal="false" @close="handleClose">
    <div  class="text-center">
      <div class="mb-1">
        <h1  class="title-head">Transaction error</h1>
        <p class="text-16 mt-1">Your transaction failed!</p>
      </div>
      <div class="mb-2">
        <img src="@/assets/images/icon/erorr-status.svg" width="50" />
      </div>
      <el-button :disabled="!transactionHash"
        type="primary" class="radius-10 fw-600"
        size="medium" @click="viewExplorer">View transaction</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    transactionHash: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters('chain', [
      'getCurrentFactory'
    ]),
  },

  methods: {
    handleClose() {
      this.$emit('onClose')
    },
    viewExplorer() {
      window.open(this.getCurrentFactory.transactionUrl + this.transactionHash, '_blank')
    }
  },
}
</script>

<style lang="scss">
.modal-r20-success {
  .ant-modal{
    width: 367px !important;
  }
  .ant-modal-content {
    background: #4C3A77;

    .ant-modal-close-x {
      color: #FFFFFF;
    }

    .title-head {
      color: #FFFFFF;

      h1 {
        color: #FFF;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;

    .add-CTR {
        display: flex;
        align-items: center;
        margin-top: 20px;
        background: #F2A8FF;
        border-radius: 29px;
        color: #C211A1;
        padding: 10px 20px;
        font-size: 12px;

        img {
            width: 13px;
            height: 12px;
            margin-right: 5px;
        }
    }

    .view-explorer {
        background: #C211A1;
        color: #FFFFFF;
        margin-top: 25px;
        border-radius: 10px;
        width: 203px;
        height: 48px;
        font-weight: 600;
        line-height: 48px;
        font-size: 18px;
    }
  }
}
</style>

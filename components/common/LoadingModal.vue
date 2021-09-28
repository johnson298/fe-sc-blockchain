<template>
  <el-dialog
    centered
    class="modal-center"
    :visible="isShow"
    width="370px"
    :before-close="handleClose"
    :close-on-click-modal="false"
    custom-class="modal-light-blue">
    <div class="text-center">
      <div class="title-head mb-1">
        <h1 class="saving">Loading<span>.</span><span>.</span><span>.</span></h1>
      </div>
      <div class="content">
        <img src="@/assets/images/icon/loading.svg" width="50" />
        <p class="text-16 mt-1">Your token is deploying</p>
      </div>
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
    }
  },
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters('erc721', [
      'getConfirmStatus',
      'getTransactionHash',
    ])
  },

  methods: {
    handleClose() {
      this.$emit('onClose')
    }
  },
}
</script>

<style lang="scss">
@keyframes blink {
  /**
   * At the start of the animation the dot
   * has an opacity of .2
   */
  0% {
    opacity: .2;
  }
  /**
   * At 20% the dot is fully visible and
   * then fades out slowly
   */
  20% {
    opacity: 1;
  }
  /**
   * Until it reaches an opacity of .2 and
   * the animation can start again
   */
  100% {
    opacity: .2;
  }
}

.saving span {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.saving span:nth-child(2) {
  animation-delay: .2s;
}

.saving span:nth-child(3) {
  animation-delay: .4s;
}
</style>

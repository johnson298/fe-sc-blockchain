<template>
  <div class="erc">
    <div class="erc__header">
      <h5 class="erc__header-title">
        <span>{{title}}</span>
        <el-image
          class="logo cursor-pointer"
          :src="setupIcon"
          @click="showTransactionSetting" />
      </h5>
    </div>
    <div class="erc__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
import setupIcon from "@/assets/images/icon/setup.svg";
import { mapGetters } from 'vuex'

export default {
  name: "ERC",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      setupIcon
    }
  },

  computed: {
    ...mapGetters(['getCurrentNetwork']),
  },

  mounted() {
    setTimeout(() => {
      this.isValidNetwork(this.getCurrentNetwork)
    }, 1000)
  },

  methods: {
    showTransactionSetting() {
      this.$emit('onShow')
    }
  },
}
</script>

<style lang="scss" scoped>
.erc {
  background: #231B34;
  padding: 40px 70px;
  border-radius: 10px;
  &__header{
    &-title{
      display: flex;
      justify-content: center;
      align-content: center;
      font-size: 20px;
      line-height: 28px;
      font-weight: 400;
      span{
        margin-right: 8px;
      }
    }
  }
}
</style>

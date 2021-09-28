<template>
  <el-row :gutter="24">
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="12">
      <ERC :title="'Create an ERC-223 Token'" @onShow="showTransactionSetting = true">
        <template slot="body">
          <form-card
            :currentTypeFee="currentTypeFee"
            @onServiceFee="getServiceFee">
          </form-card>
        </template>
      </ERC>
    </el-col>
    <el-col :span="6">
      <InfoRight :serviceFee="currentServiceFee" type="ERC-223" />
    </el-col>
    <transaction-setting
      :isShow="showTransactionSetting"
      @onClose="showTransactionSetting = false">
    </transaction-setting>
  </el-row>
</template>

<script>
import InfoRight from "../components/InfoRightERC";
import FormCard from '@/components/erc223/FormCard.vue'
import ConfigFee from '@/mixins/configFee'

export default {
  components: { FormCard, InfoRight },

  mixins: [ConfigFee],

  data() {
    return {
      serviceFee: null,
      showTransactionSetting: false
    }
  },

  computed: {
    currentServiceFee() {
      return this.serviceFee || this.currentTypeFee.serviceFee
    }
  },

  methods: {
    getServiceFee(value) {
      this.serviceFee = value
    }
  },
}
</script>

<style lang="scss">

</style>

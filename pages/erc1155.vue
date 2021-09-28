<template>
  <el-row :gutter="24">
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="12">
      <client-only>
        <ERC :title="'Create an ERC-1155 Token'"  @onShow="showTransactionSetting = true">
          <template slot="body">
            <form-card 
              :currentTypeFee="currentTypeFee"
              @getServiceFee="getServiceFee" />
          </template>
        </ERC>
      </client-only>
    </el-col>
    <el-col :span="7">
      <InfoRight :serviceFee="currentServiceFee" type="ERC-1155"/>
    </el-col>
    <transaction-setting
      :isShow="showTransactionSetting"
      @onClose="showTransactionSetting = false">
    </transaction-setting>
  </el-row>
</template>

<script>
import InfoRight from "../components/InfoRightERC";
import FormCard from '@/components/erc1155/FormCard.vue'
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

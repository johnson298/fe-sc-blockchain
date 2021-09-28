<template>
  <div class="wrapper-info">
    <div class="right-item">
      <ul class="right-content">
        <li>Get your customized {{type}} Token without any programming skills</li>
        <li>Service fee: {{ serviceFee }} {{getSymbolCoin}}</li>
      </ul>
      <div class="item-footer">
        <p class="text">{{ type }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoRightERC.vue",
  props: {
    serviceFee: {
      required: true
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>

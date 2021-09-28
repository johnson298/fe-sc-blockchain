<template>
  <nuxt-link to="/">
    <el-image
      class="logo"
      :src="logo" />
  </nuxt-link>
</template>

<script>
import Logo from '@/assets/images/logo.png';
export default {
  name: "LogoApp.vue",
  data() {
    return {
      logo: Logo
    }
  }
}
</script>

<style scoped>

</style>

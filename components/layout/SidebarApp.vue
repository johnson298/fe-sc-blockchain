<template>
  <el-menu
    ref="menu"
    :unique-opened="true"
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="smart-contract" class="p-menu">
      <template slot="title">
        <img src="@/assets/images/icon/sidebar/Smart-Contract.svg">
        <span>Smart Contract</span>
      </template>
      <el-submenu index="standard" class="v-submenu">
        <template slot="title">Standard</template>
        <el-menu-item index="erc20"><nuxt-link to="/erc20">ERC-20</nuxt-link></el-menu-item>
        <el-menu-item index="erc721"><nuxt-link to="/erc721">ERC-721</nuxt-link></el-menu-item>
        <el-menu-item index="erc777"><nuxt-link to="/erc777">ERC-777</nuxt-link></el-menu-item>
        <el-menu-item index="erc827"><nuxt-link to="/erc223">ERC-223</nuxt-link></el-menu-item>
        <el-menu-item index="erc1155"><nuxt-link to="/erc1155">ERC-1155</nuxt-link></el-menu-item>
      </el-submenu>
      <el-submenu index="business" class="v-submenu">
        <template slot="title">Business</template>
        <el-menu-item index="1-2-1"><nuxt-link to="/erc20">ERC-20</nuxt-link></el-menu-item>
      </el-submenu>
      <el-submenu index="1-3" class="v-submenu">
        <template slot="title">Custom</template>
        <el-menu-item index="1-3-1"><nuxt-link to="/erc20">ERC-20</nuxt-link></el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="share">
      <img src="@/assets/images/icon/sidebar/Share.svg">
      <span>Share</span>
    </el-menu-item>
    <el-menu-item index="instructions">
      <img src="@/assets/images/icon/sidebar/Instructions.svg">
      <span>Instructions</span>
    </el-menu-item>
    <el-menu-item index="setting">
      <img src="@/assets/images/icon/sidebar/Setting.svg">
      <span>Setting</span>
    </el-menu-item>
    <el-menu-item index="api">
      <img src="@/assets/images/icon/sidebar/API.svg">
      <span>API</span>
    </el-menu-item>
    <el-menu-item index="request-audit">
      <img src="@/assets/images/icon/sidebar/Request-Audit.svg">
      <nuxt-link to="/request-audit">Request Audit</nuxt-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "SidebarApp",
  data() {
    return {
      activeMenu: 'index'
    }
  },

  created() {

  },

  mounted() {
    this.getActiveMenu()
  },

  methods: {
    getActiveMenu() {
      const pathName = this.$route.name

      const isActive = ['erc20', 'erc721', 'erc1155', 'erc223', 'erc777'].includes(pathName)

      this.activeMenu = !isActive ? pathName : 'smart-contract';

      if (isActive) {
        this.$refs.menu.close('standard')
      } else {
        this.$refs.menu.close('smart-contract')
      }
    },

    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    }
  },

  watch: {
    '$route'(val) {
      this.getActiveMenu()
    }
  }
}
</script>

<style scoped>

</style>

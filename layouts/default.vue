<template>
  <el-container id="layout">
    <el-aside width="200px" :class="`sidebar-left page-${pageName}`">
      <LogoApp/>
      <SidebarApp />
      <ChangeLanguage/>
      <span class="copy-right">© 2021 Creator Platform</span>
    </el-aside>
    <el-container id="main-content">
      <HeaderApp />
      <el-main>
        <nuxt />
      </el-main>
<!--      <el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
</template>

<script>
import LogoApp from "@/components/layout/LogoApp";
import SidebarApp from "@/components/layout/SidebarApp";
import HeaderApp from "@/components/layout/HeaderApp";
import ChangeLanguage from "@/components/layout/ChangeLanguage";
export default {
  head () {
    return this.$nuxtI18nHead()
  },
  components: {
    SidebarApp,
    HeaderApp,
    LogoApp,
    ChangeLanguage
  },

  computed: {
    pageName() {
      return this.$route.name;
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

</style>

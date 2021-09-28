<template>
  <el-dropdown trigger="click" class="change-lang">
      <span class="el-dropdown-link change-lang-txt">
        <el-image :src="require('@/assets/images/icon/lang.svg')" class="icon" /> EN
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>English</el-dropdown-item>
      <el-dropdown-item>Viet Nam</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "ChangeLanguage.vue"
}
</script>

<style scoped lang="scss">
.change-lang{
  margin-top: 100px;
  padding-left: 22px;
  &-txt{
    display: flex;
    align-content: center;
    justify-content: center;
    background: #2F2640;
    padding: 16px 15px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    .icon {
      width: 24px;
      margin-right: 5px;
    }
  }
}
</style>

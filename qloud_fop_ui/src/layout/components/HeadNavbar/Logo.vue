<template>
  <div class="sidebar-logo-container">
    <router-link key="expand" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  data() {
    return {
      title: 'qloud_ssp',
      logo: require("@/assets/images/logo/logo_large.jpg")
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
.sidebar-logo-container {
  background: $menuBg;
  text-align: center;
  overflow: hidden;
  width: 210px;
  height: 56px;
  box-sizing: border-box;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    & .sidebar-logo {
      width: 180px;
      height: 50px;
    }
  }
}
</style>

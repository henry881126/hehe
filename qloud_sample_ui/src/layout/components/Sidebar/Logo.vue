<template>
  <div class="sidebar-logo-container" v-if="!meunHeadStyle" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    meunAsideStyle:{
      type:Boolean,
      default:false
    },
    meunHeadStyle:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      title: 'qloud_ssp',
    }
  },
  computed:{
    logo(){
      if(this.collapse){
        return require("@/assets/images/logo/logo_small.jpg")
      }else{
        return require("@/assets/images/logo/logo_large.jpg")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: $menuBg;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 180px;
      height: 50px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      text-indent: -2000px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
      width: 54px;
      height: 50px;
    }
  }
}
</style>

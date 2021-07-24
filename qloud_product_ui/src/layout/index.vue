<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <head-navbar v-if="meunHeadStyle&&meunAsideStyle"
      :meunAsideStyle="meunAsideStyle"
      :meunHeadStyle="meunHeadStyle"
     />
    <sidebar v-if="meunAsideStyle"
     :style="asideStyle"
     :meunAsideStyle="meunAsideStyle"
     :meunHeadStyle="meunHeadStyle"
     class="sidebar-container" />

     <div class="main-container" v-if="meunHeadStyle&&meunAsideStyle">
       <div v-if="meunHeadStyle&&meunAsideStyle" :class="{'fixed-header':fixedHeader}">
         <navbar
          :meunAsideStyle="meunAsideStyle"
          :meunHeadStyle="meunHeadStyle" />
       </div>
       <app-main v-if="meunHeadStyle&&meunAsideStyle" />
     </div>

    <div v-if="!meunHeadStyle&&meunAsideStyle" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar :meunAsideStyle="meunAsideStyle"
      :meunHeadStyle="meunHeadStyle" />
      </div>
      <app-main v-if="!meunHeadStyle&&meunAsideStyle" />
    </div>

    <div v-if="meunHeadStyle&&!meunAsideStyle">
      <head-navbar v-if="meunHeadStyle&&!meunAsideStyle"
      :meunAsideStyle="meunAsideStyle"
      :meunHeadStyle="meunHeadStyle"
       />
       <div v-if="meunHeadStyle&&!meunAsideStyle" :class="{'fixed-header':fixedHeader}">
         <navbar
          :meunAsideStyle="meunAsideStyle"
          :meunHeadStyle="meunHeadStyle" />
       </div>
      <app-main v-if="meunHeadStyle&&!meunAsideStyle" />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, HeadNavbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    HeadNavbar
  },
  mixins: [ResizeMixin],
  data() {
    return {
      meunAsideStyle: true,
      meunHeadStyle: false
    }
  },
  computed: {
    asideStyle(){
      let obj = {};
      if(this.meunAsideStyle&&this.meunHeadStyle){
        obj = {
          top:"56px",
          height:"calc(100% - 56px)"
        }
      }else{
        obj = {}
      }
      return obj;
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>

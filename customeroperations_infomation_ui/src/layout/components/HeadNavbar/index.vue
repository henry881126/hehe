<template>
  <div class="g-h_container" :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" />
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="horizontal"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Bus from '@/bus';

export default {
  components: { SidebarItem, Logo },
  props:{
    meunAsideStyle:{
      type:Boolean,
      default:false
    },
    meunHeadStyle:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      menuList:[]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      if(this.meunAsideStyle && this.meunHeadStyle){
        return this.menuList
      }else{
        return this.$router.options.routes
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
  },
  created(){
    Bus.$on("renderMenu",data=>{
      this.menuList = data;
    })
  }
}
</script>
<style scoped="scoped" lang="scss">
  @import "../../../styles/variables.scss";
  .g-h_container{
    display: flex;
    justify-content:flex-start;
    width: 100%;
    background-color: $menuBg;
    ::v-deep .el-menu{
      &.el-menu--horizontal{
        border: 0;
      }
    }
  }
</style>

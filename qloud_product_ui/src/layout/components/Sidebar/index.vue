<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :meunAsideStyle="meunAsideStyle" :meunHeadStyle="meunHeadStyle" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';
import Bus from '@/bus';
export default {
  components: { SidebarItem, Logo },
  props: {
    meunAsideStyle: {
      type: Boolean,
      default: false
    },
    meunHeadStyle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      let ARR = [],
        ROUTES = this.$router.options.routes;
      // 仅显示左侧菜单
      if (this.meunAsideStyle && !this.meunHeadStyle) {
        ARR = ROUTES;
      }
      // 左侧和顶部菜单同时显示
      if (this.meunAsideStyle && this.meunHeadStyle) {
        let newObj = {};
        ROUTES.forEach(function(item, i) {
          for (var key in item) {
            if (key != 'children') {
              newObj[key] = item[key];
            }
          }
          ARR.push(newObj);
          newObj = {};
        });
      }
      return ARR;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      let ROUTES = this.$router.options.routes;
      if(this.meunAsideStyle && this.meunHeadStyle){
        if(meta.activeMenu){
          let arr = ROUTES.filter(item => item.path!=="/"&&meta.activeMenu.startsWith(item.path));
          if(Object.prototype.hasOwnProperty.call(arr[0],"children")&&arr[0].children.length>0){
            Bus.$emit('renderMenu',arr[0].children);
          }
        }else{
          let arr = ROUTES.filter(item => item.path!=="/"&&path.startsWith(item.path));
          if(Object.prototype.hasOwnProperty.call(arr[0],"children")&&arr[0].children.length>0){
            Bus.$emit('renderMenu',arr[0].children);
          }
        }
        if (meta.activeMenu) {
          return `/meta.activeMenu.split("/")[1]`;
        }
        return `/${path.split("/")[1]}`;
      }else{
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  beforeDestory(){
    Bus.$off("renderMenu")
  }
};
</script>

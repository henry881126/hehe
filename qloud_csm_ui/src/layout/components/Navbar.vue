<template>
  <div class="navbar">
    <hamburger
    v-if = "meunAsideStyle&&meunHeadStyle||meunAsideStyle&&!meunHeadStyle"
    :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <a href="javascript:;" class="screen" :class="isFullscreen ? 'exit-screen' : 'full-screen'" :title="isFullscreen ? $t('public.exitFullScreen') : $t('public.screen')" @click="handleScreen">
        {{ isFullscreen ? $t('public.exitFullScreen') : $t('public.screen') }}
      </a>
			<div class="m-dropdown">
				<el-dropdown @command="handleLang">
				  <span class="el-dropdown-link">
				    {{ curlang }}
				    <i class="el-icon-arrow-down el-icon--right" />
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item
						v-for="(item, index) in langlist"
						:key="index"
						:command="item.id">
						{{ item.name }}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
      <div class="m-dropdown">
        <i class="m-photo el-icon-user-solid" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in droplist" :key="index" :command="item.command">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import screenfull from 'screenfull'
import Cookies from 'js-cookie'
import { getLanguage } from "@/lang"
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
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
  data() {
    return {
      iconClass: 'el-icon-s-fold',
      isFullscreen: false,
			curlang:Cookies.get('language') === "en" ? this.$t('public.en') : this.$t('public.cn'),
			langlist:[
				{
					name: this.$t('public.cn'),
					id:"zh"
				},
				{
					name:this.$t('public.en'),
					id:"en"
				}
			],
      droplist: [{ name: this.$t('public.changePassword'), command: 'password' }, { name: this.$t('public.exit'), command: 'exit' }]
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    //语言切换
    handleLang(command){
      Cookies.set('language', command);
      history.go(0)
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
    handleIcon() {
      if (this.iconClass === 'el-icon-s-fold') {
        this.iconClass = 'el-icon-s-unfold'
        // todo...
      } else {
        this.iconClass = 'el-icon-s-fold'
        // todo...
      }
    },
    handleScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
		justify-content: flex-start;
		align-items: center;
    padding-right: 15px;
    &:focus {
      outline: none;
    }

    a {
      &.screen {
        width: 16px;
        height: 16px;
        color: #333;
        text-indent: -20000px;
        &.exit-screen {
          background: url(../../assets/images/exit_screen.png) no-repeat center center;
          background-size: contain;
        }
        &.full-screen {
          background: url(../../assets/images/full_screen.png) no-repeat center center;
          background-size: contain;
        }
      }
    }
    .m-dropdown {
      margin-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .m-photo {
        margin-right: 5px;
        color: #409eff;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>

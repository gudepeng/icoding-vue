<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <img src="static/images/logo.svg" class="navbar-logo">
        </div>
        <div class="navbar-menu">
          <div>
            <span @click="$router.push('/')" class="navbar-slogan">首页</span>
            <span @click="$router.push('/opensource')" class="navbar-slogan">开源项目</span>
            <span class="navbar-slogan" title="暂未开放">分享资源</span>
            <span class="navbar-slogan" title="暂未开放">视频教程</span>
            <span @click="$router.push('/contactus')" class="navbar-slogan">联系我们</span>
          </div>
        </div>
        <div class="navbar-longin">
          <div v-if="userInfo==null">
            <span @click="worsarticle(0)" class="navbar-slogan">写文章</span>
            <span class="navbar-slogan">&</span>
            <span @click="worsarticle(1)" class="navbar-slogan">分享文章</span>
            <span class="navbar-slogan">|</span>
            <span class="navbar-slogan" @click="login(0)">登录</span>
            <span class="navbar-slogan">&</span>
            <span class="navbar-slogan" @click="login(1)">注册</span>
          </div>
          <div v-if="userInfo!=null">
            <span @click="$router.push('/publish')" class="navbar-slogan">写文章</span>
            <span class="navbar-slogan">&</span>
            <span @click="$router.push('/share')" class="navbar-slogan">分享文章</span>
            <span class="navbar-slogan">|</span>
            <el-dropdown @command="handleCommand">
              <template v-if="userInfo.userImageUrl">
                <img style="width: 36px;height: 36px" @click="$router.push('/mycenter/me')"
                     :src="userInfo.userImageUrl"/>
              </template>
              <template v-else>
                <img style="width: 36px;height: 36px" @click="$router.push('/mycenter/me')"
                     src="https://gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg"/>
              </template>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/publish">写文章</el-dropdown-item>
                <el-dropdown-item command="/share">分享文章</el-dropdown-item>
                <el-dropdown-item divided command="/mycenter/me">我的主页</el-dropdown-item>
                <el-dropdown-item command="/mycenter/like">我喜欢的</el-dropdown-item>
                <el-dropdown-item command="/setting">设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </nav>
    <popup-modal ref="loginmodel">
    </popup-modal>
  </header>
</template>

<script>
  import PopupModal from './login_modal'

  export default {
    name: 'indexheader',
    data() {
      return {}
    },
    async mounted() {
      await this.$store.dispatch('loadAdminInfo')
    },
    computed: {
      userInfo() {
        return this.$store.state.login.authUser
      }
    },
    methods: {
      login(data) {
        this.$store.dispatch('SHOWLONGINTYPE', data)
      },
      worsarticle(type) {
        if (this.userInfo) {
          if (type == 0) {
            this.$router.push('/publish')
          } else if(type == 1){
            this.$router.push('/share')
          }

        } else {
          this.$store.dispatch('SHOWLONGINTYPE', 0)
        }
      },
      handleCommand(command){
        if (command == "logout") {
          this.$store.dispatch('logout')
          this.$router.push('/')
        } else {
          this.$router.push(command)
        }
      }
    },
    components: {
      PopupModal
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/mixins';
  @import '../../assets/sass/variables';

  .header {

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: $header-height;
      background-color: $module-bg;
      z-index: 999;
      box-shadow: 0 1px 3px 0 rgba(0, 34, 77, .1);

      .navbar-container {
        height: $header-height;
        display: flex;

        .navbar-header {
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          justify-content: space-between;

          .navbar-logo {
            width: 10em;
          }

          .navbar-link {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
        .navbar-menu {
          flex: 1;
          align-items: center;
          display: flex;
          position: relative;
          padding-left: 3em;

          .navbar-slogan {
            color: $primary;
            font-family: DINRegular, CenturyGothic;
            padding: 1em;
            &:hover {
              color: #000000;
              cursor: pointer;
            }
          }
        }
        .navbar-longin {
          align-items: center;
          display: flex;
          position: relative;
          padding-left: 3em;

          .navbar-slogan {
            cursor: pointer;
            padding: 0.3em;
            color: $primary;
            &:hover {
              color: #000000;
            }
          }
          img {
            margin-left: .3em;
            border-radius: 50%;
          }
        }
      }
      > .pre-load {
        visibility: hidden;
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
  }
</style>

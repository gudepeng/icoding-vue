<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <img src="static/images/logo.svg" class="navbar-logo">
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/">首页</el-dropdown-item>
            <el-dropdown-item command="/opensource">开源项目</el-dropdown-item>
            <el-dropdown-item command="/contactus">联系我们</el-dropdown-item>
            <el-dropdown-item disabled>登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
  </header>
</template>

<script>

  export default {
    name: 'mobileheader',
    data() {
      return {}
    },
    async mounted() {
    },
    computed: {},
    methods: {
      handleCommand(command){
        this.$router.push(command)
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/mixins';
  @import '../../assets/sass/variables';

  .el-dropdown {
    position: absolute;
    right: 1em;
    top: 1.5em;
    > .el-dropdown-link {
      cursor: pointer;
      color: $primary;
    }
    > .el-icon-arrow-down {
      font-size: 12px;
    }
  }

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

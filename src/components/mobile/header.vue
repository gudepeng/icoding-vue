<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <img src="static/images/logo.svg" class="navbar-logo">
        </div>
      </div>
    </nav>
  </header>
</template>

<script>

  export default {
    name: 'mobileheader',
    data() {
      return {

      }
    },
    async mounted() {
    },
    computed: {
    },
    methods: {
    },
    components: {
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

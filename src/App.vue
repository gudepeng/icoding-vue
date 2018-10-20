<template>
  <div id="app" v-cloak>
    <div id="app-main">
      <header-view v-if="!mobileLayout"></header-view>
      <mobile-header v-if="mobileLayout"></mobile-header>
      <main id="main" :class="{ 'mobile': mobileLayout, [$route.name]: true }">
        <router-view/>
      </main>
      <tool-view v-if="!mobileLayout && !['app', 'music', 'service'].includes($route.name)"></tool-view>
      <footer-view v-if="!mobileLayout"></footer-view>
    </div>
  </div>
</template>

<script>
  import MobileHeader from '@/components/mobile/header.vue'
  import HeaderView from '@/components/layout/header.vue'
  import ToolView from '@/components/layout/tool.vue'
  import FooterView from '@/components/layout/footer.vue'
  export default {
    name: 'App',
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    computed: {
      openWebrtc() {
        return this.$store.state.option.openWebrtc
      },
      emoji233333() {
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      mobileSidebar() {
        return this.$store.state.option.mobileSidebar
      }
    },
    components: {
      HeaderView,
      ToolView,
      FooterView,
      MobileHeader
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
  #main {
    min-height: calc(100% - 175px);
  }
</style>

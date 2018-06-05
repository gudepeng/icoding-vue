<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <span>© 2017 - 2018  辽ICP备18001164号-1</span>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'layout-footer'
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/variables';

  footer {
    margin-top: 1em;
    background-color: $module-bg;

    .container {
      position: relative;

      .footer-content {
        padding: 1em;
        font-size: .9em;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
</style>

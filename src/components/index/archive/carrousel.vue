<template>
  <el-carousel height="200px" :interval="5000">
    <el-carousel-item v-for="item in banners" :key="item">
      <img :src="item.path"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

  export default {
    name: 'carrousel',
    data() {
      return {
        banners: [
          {
            path: 'static/images/banner3.jpg'
          },
          {
            path: 'static/images/banner1.jpg'
          },
          {
            path: 'static/images/banner2.jpg'
          },
        ]
      }
    },
    props: {},
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .el-carousel {
    margin-bottom: 1em;
    & > .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
  }

</style>

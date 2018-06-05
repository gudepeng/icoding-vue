<template>
    <el-carousel height="200px">
      <el-carousel-item v-for="item in 7" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
</template>

<script>

  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          autoplay: {
            delay: 3500,
            disableOnInteraction: false
          },
          pagination: {
            clickable: true,
            el: '.swiper-pagination'
          },
          setWrapperSize: true,
          autoHeight: true,
          mousewheel: true,
          observeParents: true,
          grabCursor: true,
          preloadImages: false,
          lazy: true
        }
      }
    },
    props: {
      article: {
        type: Object
      }
    },
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      imgExt() {
        return this.$store.state.option.imgExt
      }
    },
    methods: {
      buildThumb(thumb) {
        if (thumb) {
          if (this.mobileLayout) {
            return `${thumb}?imageView2/1/w/768/h/271/format/${this.imgExt}/interlace/1/q/80|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/560/fill/I0ZGRkZGRg==/dissolve/30/gravity/SouthWest/dx/30/dy/15|imageslim`
          } else {
            return `${thumb}?imageView2/1/w/1190/h/420/format/${this.imgExt}/interlace/1/q/80|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/680/fill/I0ZGRkZGRg==/dissolve/30/gravity/SouthWest/dx/30/dy/15|imageslim`
          }
        } else {
          return `${this.cdnUrl}/images/${this.mobileLayout ? 'mobile-' : ''}thumb-carrousel.jpg`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-carousel{
    margin-bottom: 1em;
    &>.el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

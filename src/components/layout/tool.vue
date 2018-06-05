<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <button class="to-top"
                title="返回顶部"
                @click="setButtonState(true)">
          <i class="iconfont icon-top"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { scrollTo, easing } from '@/utils/scroll-to-anywhere'
  const underscore = require('@/utils/underscore-simple')
  export default {
    name: 'tool',
    data() {
      return {
        topBtnMouseOver: false,
        animationFrameId: null
      }
    },
    computed: {
    },
    methods: {
      setButtonState(state) {
        this.topBtnMouseOver = state
        window.cancelAnimationFrame(this.animationFrameId)
        const step = () => {
          let targetScrollY = window.scrollY
          const currentScrollY = document.body.scrollHeight - window.innerHeight
          if (this.topBtnMouseOver) targetScrollY -= 150
          if (targetScrollY < -63) {
            targetScrollY = -63
          }
          const canScrollTo = targetScrollY > -63 && targetScrollY < currentScrollY
          if (!canScrollTo) return false
          window.scrollTo(0, targetScrollY)
          if (this.bottomBtnMouseOver || this.topBtnMouseOver) {
            this.animationFrameId = window.requestAnimationFrame(step)
          } else {
            window.cancelAnimationFrame(this.animationFrameId)
            return false
          }
        }
        this.animationFrameId = window.requestAnimationFrame(step)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/variables';

  #tools {
    position: fixed;
    z-index: 9;
    width: 100%;
    bottom: 15rem;

    > .container {
      position: relative;

      > .tools-list {
        position: absolute;
        right: -15em;
        width: 3em;
        height: 3em;

        > .to-top{
          & > .iconfont {
            font-size: 2em;
            color: #0088f5;
          }
        }
        > .feedback {
          display: block;
          width: 3em;
          height: 3em;
          line-height: 3em;
          text-align: center;
          background-color: $module-bg;
          &:hover {
            background-color: $module-hover-bg;
          }
        }
      }
    }
  }
</style>

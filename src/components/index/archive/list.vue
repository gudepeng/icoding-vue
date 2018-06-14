<template>
  <div class="articles">
    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <empty-box class="article-empty-box" v-if="!article.fetching && !article.data.data.length">
          <slot>目前暂无文章</slot>
        </empty-box>
        <transition-group name="fade" tag="div" v-else>
          <list-item v-for="(item, index) in article.data.data" :clicktype="article.data.sortId" :item="item"
                     :keyindex="index" :key="index"></list-item>
        </transition-group>
      </transition>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore" @click="$emit('loadmore')" :disabled="article.fetching || !canLoadMore">
        <span
          v-if="!article.fetching && canLoadMore">或许有更多</span>
        <span v-else-if="article.fetching && canLoadMore">加载中</span>
        <span v-else-if="!canLoadMore">这是底线</span>
      </button>
    </div>
  </div>
</template>

<script>
  import ListItem from './item.vue'

  export default {
    name: 'article-list',
    components: {
      ListItem
    },
    props: {
      article: {
        type: Object
      }
    },
    mounted() {
      let _this = this;
      window.addEventListener('scroll',function(){
        // 判断是否滚动到底部
        if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
          _this.$emit('loadmore')
        }
      });
    },
    computed: {
      canLoadMore() {
        return this.article.data.page.currentPage < this.article.data.page.totalPage
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/sass/variables';

  .articles {

    > .article-list-header {
      margin-bottom: 1em;
      position: relative;
      overflow: hidden;
      background-color: $module-bg;
    }

    > .article-list {
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;

      > .article-empty-box {
        background-color: $module-bg;
      }

      > .article-loading {
        height: 10em;
        background-color: $module-bg;
        display: flex;
      }

      > .article-errmsg {
        height: 10em;
        line-height: 10em;
        background-color: $module-bg;
        text-align: center;
        color: rgba(0, 0, 0, 0.38);
      }
    }

    > .article-load {

      > .btn-loadmore {
        width: 100%;
        display: block;
        height: 3em;
        line-height: 3em;
        background-color: $module-bg;

        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
  }
</style>

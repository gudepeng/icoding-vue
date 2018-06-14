<template>
  <div class="article">
    <div class="tab">
      <a :class="{click:clickT=='me'}" href="javascript:;" @click="clicktitle('me')">
        <div>我的博客</div>
      </a>
      <a :class="{click:clickT=='like'}" href="javascript:;" @click="clicktitle('like')">
        <div>我的喜欢</div>
      </a>
    </div>
    <div class="article_list">
      <div v-for="(item,index) in selfarticles.data.data" :key="index" v-show="clickT=='me'">
        <div class="title">
          <router-link :to="`/article/${item.articleId}`">{{ item.articleTitle }}</router-link>
        </div>
        <div class="time">
          {{item.articleTime | toYMD}}
        </div>
      </div>
      <div v-for="(item,index) in selflikearticles.data.data" :key="index" v-show="clickT=='like'">
        <div class="title">
          <router-link :to="`/article/${item.articleId}`">{{ item.articleTitle }}</router-link>
        </div>
        <div class="time">
          {{item.articleTime | toYMD}}
        </div>
      </div>
    </div>
    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore">
        <span>或许有更多</span>
        <span>加载中</span>
        <span>这是底线</span>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'admin',
    data() {
      return {
        clickT: this.$route.params.id || 'me',
      }
    },
    watch: {
      '$route' (to, from) {
        this.clickT = to.params.id
      }
    },
    async mounted () {
      document.title = '个人中心'
      await this.$store.dispatch('loadSelfOrLikeArticles', {currentPage: 1, type: "SELF"})
      await this.$store.dispatch('loadSelfOrLikeArticles', {currentPage: 1, type: "SELFLIKE"})
    },
    computed: {
      selfarticles () {
        return this.$store.state.article.self
      },
      selflikearticles(){
        return this.$store.state.article.selflike
      }
    },
    methods: {
      clicktitle(type) {
        this.clickT = type
      },
    }
  }
</script>
<style lang="scss">
  @import '../../assets/sass/mixins';
  @import '../../assets/sass/variables';

  .article {
    background: #FFFFFF;

    .tab {
      height: 4em;
      display: flex;
      align-items: center;
      margin: 0 auto;
      max-width: 960px;
      white-space: nowrap;;
      & > a {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 7.5em;
        height: 100%;

        & > div {
          font-size: 1em;
          font-weight: 500;
          color: #31445b;
          cursor: pointer;
        }
        & :hover {
          color: $primary;
        }
      }
      & > .click {

        & > div {
          color: $primary;
        }
        box-shadow: inset 0 -2px 0 $primary;
      }
    }
    .article_list {
      & > div {
        height: 5em;
        border-bottom: 1px solid hsla(240, 2%, 90%, .5);
        &:hover {
          background: #f4f5f5;
        }
        & > .title {
          flex: 1 1 auto;
          min-width: 0;
          font-size: 1.333rem;
          font-weight: 600;
          color: #2e3135;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          float: left;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 2em;
        }
        & > .time {
          margin-right: 2em;
          display: flex;
          align-items: center;
          justify-content: center;
          float: right;
          height: 100%;
        }
      }
    }
    .article-load {

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

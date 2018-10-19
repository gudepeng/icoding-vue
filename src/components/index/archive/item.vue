<template>
  <div class="article-list-item" @click="toDetail">
      <div @click="$router.push(`/article/${item.articleId}`)" class="item-content" :class="{ mobile: mobileLayout }">
        <div class="item-body">
          <template v-if="item.articleType==1">
            <h4 @click.stop="openurl(item.artucleShareUrl)" class="item-title" :title="item.articleTitle">
              <i class="iconfont icon-share"></i>{{ item.articleTitle }}
            </h4>
          </template>
          <template v-else="item.articleType==0">
            <h4 class="item-title" :title="item.articleTitle">
              <i class="iconfont icon-original"></i>{{ item.articleTitle }}
            </h4>
           </template>
          <p class="item-description" style="-webkit-box-orient: vertical;" v-html="item.articleSummary"></p>
          <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ item.articleTime | toYMD }}</span>
          </span>
            <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ item.articleClick || 0 }}</span>
          </span>
            <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ item.articleComment || 0 }}</span>
          </span>
            <template v-if="item.likeId==null">
            <span @click.stop="likearticle(item.articleId)" class="likes">
              <i class="iconfont icon-like"></i>
              <span>{{ item.articleLike || 0 }}</span>
            </span>
            </template>
            <template v-else>
            <span @click.stop="unlikearticle(item.articleId)" class="likes">
              <i class="iconfont icon-like-on"></i>
              <span>{{ item.articleLike || 0 }}</span>
            </span>
            </template>
            <span v-if="clicktype==null" class="iconfont categories">
            <i class="iconfont icon-list"></i>
            <span>{{formatArticleType(item.sortId)}}</span>
          </span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Service from '@/plugins/axios'

  export default {
    name: 'article-list-item',
    props: {
      item: Object,
      clicktype: Number,
      keyindex: Number
    },
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    },
    methods: {
      likearticle(id) {
        if (this.$store.state.login.authUser != null) {
          this.$store.dispatch('likearticle', {
            "id": id,
            "keyindex": this.keyindex,
            "userid": this.$store.state.login.authUser.userId
          })
        } else {
          this.$store.dispatch('SHOWLONGINTYPE', 0)
        }
      },
      unlikearticle(id) {
        this.$store.dispatch('unlikearticle', {"id": id, "keyindex": this.keyindex})
      },
      formatArticleType(type) {
        let articlevalue = "未知"
        this.$store.state.option.articleType.map(
          article => {
            if (type == article.value) {
              articlevalue = article.label
            }
          }
        )
        return articlevalue
      },
      toDetail() {
        if (this.mobileLayout) {
          this.$router.push(`/article/${this.item.id}`)
        }
      },
      openurl(url){
          window.open(url)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/sass/variables';
  @import '../../../assets/sass/mixins';

  .article-list-item {
    margin-bottom: 1em;
    background-color: $module-bg;
    &:last-child {
      margin: 0;
    }
    &:hover {
      background-color: $module-hover-bg;
      box-shadow: 0 1px 3px 0 rgba(0, 34, 77, .1);
    }
    > .item-content {
      cursor: pointer;
      display: block;
      overflow: hidden;
      &:hover {
        > .item-thumb {
          .item-thumb-img {
            @include css3-prefix(opacity, .95);
            @include css3-prefix(transform, translateX(-.5em));
          }
        }
      }
      > .item-thumb {
        float: left;
        width: 12em;
        height: 8.5em;
        overflow: hidden;
        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + .5em);
          max-width: calc(100% + .5em);
          height: auto;
          min-height: 8.5em;
          border-color: transparent;
          background-color: #c0c0c0;
          @include css3-prefix(opacity, 1);
          @include css3-prefix(transform, translateX(0));
        }
      }
      > .item-body {
        float: left;
        padding: 16px 25px;
        > .item-title {
          font-size: 1.2em;
          font-weight: 600;
          color: #333;
          margin-top: .2em;
          margin-bottom: .5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          > a {
            margin-left: 0;
            &:hover {
              display: inline-block;
              text-decoration: underline;
              margin-left: .5em;
            }
          }
        }
        > .item-description {
          font-size: 1em;
          margin: 0;
          margin-bottom: 0.3em;
          height: 5em;
          line-height: 1.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          @include clamp(3);
        }
        > .item-meta {
          font-size: .9em;
          height: 2em;
          line-height: 2em;
          display: flex;
          justify-content: flex-start;
          align-items: baseline;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: normal;
          color: #8590a6;
          > .views {
            min-width: 4rem;
          }
          > .likes,
          > .comments {
            min-width: 3em;
          }
          > .date,
          > .views,
          > .comments,
          > .likes,
          > .tags,
          > .categories {
            margin-right: 1em;

            > .iconfont {
              font-size: 1em;
              margin-right: .4em;
            }
          }
          > .tags,
          > .categories {
            a {
              text-transform: capitalize;
              margin-right: .5em;
            }
          }
          > .tags {
            margin-right: 0;
          }
        }
      }
      &.mobile {
        height: auto;
        > .item-body {
          width: 100%;
          height: auto;
          > .item-description {
            height: auto;
            margin-bottom: .5em;
          }
          > .item-meta {
            justify-content: space-between;
            > .date,
            > .views,
            > .comments,
            > .likes,
            > .tags,
            > .categories {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>

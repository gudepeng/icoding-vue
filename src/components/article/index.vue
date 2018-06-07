<template>
  <div class="article" :class="{ mobile: mobileLayout }">
    <div id="social-share-fx" v-show="!mobileLayout"></div>
    <div class="detail">
      <h2 class="title">{{ article.articleTitle || '...' }}</h2>
      <a class="sendtitle" @click="$router.push({path:'/publish',query:{id:article.articleId}})"
         v-show="userInfo!=null&&userInfo.userId==article.userId">编辑</a>
      <transition name="module" mode="out-in">
        <empty-box class="article-empty-box" v-if="!fetching && !article.articleTitle">
          <slot>No Result Article.</slot>
        </empty-box>
      </transition>
      <transition name="module" mode="out-in">
        <div class="content" v-html="articleContent" v-if="!fetching && article.articleContent"></div>
      </transition>
      <transition name="module" mode="out-in">
        <div class="readmore" v-if="canReadMore">
          <button class="readmore-btn" :disabled="readMoreLoading" @click="readMore()">
            <span>{{ !readMoreLoading ? '阅读余下全文' : '渲染中...' }}</span>
            <i class="iconfont icon-next-bottom"></i>
          </button>
        </div>
      </transition>
    </div>
    <transition name="module" mode="out-in">
      <div class="metas" v-if="!fetching && article.articleTitle">
        <p class="item">
          <span>本文于</span>
          <span>&nbsp;</span>
          <router-link :title="buildDateTitle(article.articleTime)"
                       :to="buildDateLink(article.articleTime)">
            <span>{{ buildDateTitle(article.articleTime) }}</span>
          </router-link>
          <span>&nbsp;发布在&nbsp;</span>
          <span v-if="article.sortId">{{article.sortId | artileValueToLable}}</span>
          <span v-if="!article.sortId">未知</span>
          <span>&nbsp;分类下，当前已被围观&nbsp;</span>
          <span>{{ article.articleClick || 0 }}</span>
          <span>&nbsp;次</span>
        </p>
        <p class="item">
          <span>相关标签：</span>
          <span v-if="!article.articleTag">无相关标签</span>
          <router-link :key="index"
                       :to="`/tag/${tag.slug}`"
                       :title="tag.description || tag.name"
                       v-for="(tag, index) in article.articleTag.split(',')">
            <span>{{ tag }} </span>
            <span v-if="article.tag && article.tag[index + 1]">、</span>
          </router-link>
        </p>
      </div>
    </transition>
    <div class="comments" v-show="!mobileLayout">
      <div class="commentself">
        <div class="title">
          <span>评论</span>
        </div>
        <div class="yourcomment" v-show="userInfo!=null">
          <div>
            <div class="yourimg">
              <img src="https://gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg"/>
            </div>
            <el-input v-model="yourcommentContent" :autosize="{ minRows: 2, maxRows: 50}" type="textarea"
                      placeholder="说说你的看法"></el-input>
          </div>
          <div>
            <el-button type="primary" @click="comitcomment" round>评论</el-button>
          </div>
        </div>
        <div class="yourcomment" v-show="userInfo==null">
          <el-button type="primary" @click="login" round style="margin-left: 27em;margin-right: .5em">登录</el-button>
          说说你的看法
        </div>
      </div>
      <ul>
        <li v-for="(comment,index) in comments">
          <div>
            <div class="user">
              <img src="https://gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg"/>
            </div>
            <div class="comment">
              <div>
                <span>{{comment.fromUserId}}</span>
              </div>
              <div>
                <span>{{comment.commentContent}}</span>
              </div>
              <div>
                <span class="hf" @click="showReply(comment.commentId,index)">
                  <i class="iconfont icon-comment"></i>
                  <span>{{comment.commentReply}}条评论</span>
                </span>
                <span>{{comment.commentTime | timeAgo}}</span>
              </div>
              <div class="reply" v-show="comment.showreplys">
                <div v-for="reply in comment.replys">
                  <div class="user">
                    <img src="https://gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg"/>
                  </div>
                  <div class="comment">
                    <div>
                      <span>{{reply.fromUserId}}</span>
                    </div>
                    <div>
                      <span
                        v-show="reply.replyType=='reply'">回复：{{reply.toUserId}}  </span><span>{{reply.replyContent}}</span>
                    </div>
                    <div>
                      <span>{{reply.replyTime | timeAgo}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import marked from '@/plugins/marked'
  import 'social-share.js/src/css/share.scss'
  import 'social-share.js/dist/js/social-share.min.js'

  export default {
    name: 'article-detail',
    data() {
      return {
        canReadMore: false,
        fullContentEd: false,
        readMoreLoading: false,
        yourcommentContent: '',
      }
    },
    watch: {
      async '$route' (to, from) {
        let reponse =  await this.$store.dispatch('loadArticleDetail', {id: this.$route.params.id})
        this.$store.dispatch('loadcomment', {id: this.$route.params.id, topicType: "article"})
      }
    },
    async mounted() {
      let reponse = await this.$store.dispatch('loadArticleDetail', {id: this.$route.params.id})
      this.$store.dispatch('loadcomment', {id: this.$route.params.id, topicType: "article"})
      document.title = reponse.result.articleTitle
      let config={
        url: window.location.href,
        title: reponse.result.articleTitle,
        description: reponse.result.articleTitle,
        sites: [ 'qzone','qq', 'weibo','wechat'],
        wechatQrcodeTitle: '微信扫一扫：分享',
        wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      }
      window.socialShare(document.getElementById('social-share-fx'), config)
    },
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      article() {
        return this.$store.state.article.detail.data
      },
      articleContent() {
        let content = this.article.articleContent
        if (!content) return ''
        let tags = this.article.articleTag.split(",")
        if (content.length > 13688 && !this.fullContentEd) {
          this.canReadMore = true
          let shortContent = content.substring(0, 11688)
          let lastH4Index = shortContent.lastIndexOf('\n####')
          let lastH3Index = shortContent.lastIndexOf('\n###')
          let lastCodeIndex = shortContent.lastIndexOf('\n\n```')
          let lastLineIndex = shortContent.lastIndexOf('\n\n**')
          let lastReadindex = Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex);
          shortContent = shortContent.substring(0, lastReadindex)
          return marked(shortContent, tags, true)
        } else {
          this.canReadMore = false
          return marked(content, tags, true)
        }
      },
      fetching() {
        return this.$store.state.article.detail.fetching
      },
      tags() {
        return this.$store.state.tag.data
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      imgExt() {
        return this.$store.state.option.imgExt
      },
      comments(){
        return this.$store.state.commentreply.comments
      },
      userInfo() {
        return this.$store.state.login.authUser
      }
    },
    methods: {
      login() {
        this.$store.dispatch('SHOWLONGINTYPE', 0)
      },
      comitcomment() {
        this.$store.dispatch('comitcomment', {
          topicId: this.article.articleId,
          topicType: "article",
          commentContent: this.yourcommentContent
        })
      },
      readMore() {
        this.readMoreLoading = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.fullContentEd = true
          }, 0)
        })
      },
      buildThumb(thumb) {
        if (!thumb) return `${this.cdnUrl}/images/thumb-releted.jpg`
        return `${thumb}?imageView2/1/w/300/h/230/format/${this.imgExt}/interlace/1/q/80|imageslim`
      },
      buildDateTitle(date) {
        if (!date) return date
        date = new Date(date)
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours() > 11 ? '下午' : '上午'}`
      },
      buildDateLink(date) {
        if (!date) return date
        date = new Date(date)
        let year = date.getFullYear()
        let month = (date.getMonth() + 1).toString()
        let day = date.getDate().toString()
        month = Object.is(month.length, 1) ? `0${month}` : month
        day = Object.is(day.length, 1) ? `0${day}` : day
        return `/date/${year}-${month}-${day}`
      },
      showReply(commentid, index){
        this.$store.dispatch('showloadreply', {commentId: commentid, index: index})
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/sass/mixins';
  @import '../../assets/sass/variables';

  .social-share {
    position: fixed;
    left: 10em;
    width: 32px;
    top: 15em;
  }

  .article {
    &.mobile {
      > .metas {
        padding: 1em;
        line-height: 2.3em;
        > .item {
          margin: 0;
        }
      }
      > .related {
        height: auto;
        > .article-list {
          padding: 0;
          margin: 0;
          list-style: none;
          overflow: hidden;
          opacity: .9;
          > .item {
            > .item-link {
              display: block;
              width: 100%;
              height: 2.2em;
              line-height: 2.2em;
              @include text-overflow();
            }
          }
        }
      }
      > .detail {
        > .content {
          pre {
            padding-left: 0;
            > .code-lines {
              display: none;
            }
          }
        }
      }
    }
    > .detail,
    > .metas,
    > .related {
      margin-bottom: 1em;
      background-color: $module-bg;
    }
    > .detail {
      padding: 1em 2em;
      > .title {
        text-align: center;
        margin: 1em 0 1.5em 0;
        font-weight: 700;
      }
      > .sendtitle {
        position: absolute;
        right: 20em;
        top: 10em;
        color: black;
        cursor: pointer;
      }
      > .content {
        word-wrap:break-word;
        word-break:break-all;
        a {
          font-weight: bold;
          margin: 0 .1em;
          &.image-link {
            margin: 0;
          }
          &:hover {
            text-decoration: underline;
          }
        }
        img {
          max-width: 100%;
          margin: 0 auto;
          display: block;
          text-align: center;
          border-radius: $radius;
          border: .5rem solid $module-hover-bg;
          transition: all .25s;
          opacity: .9;
          cursor: pointer;
          &:hover {
            opacity: 1;
            transition: all .25s;
          }
        }
        p {
          line-height: 2.2em;
          text-indent: inherit;
          margin-bottom: 1em;
          &.text-center {
            text-align: center;
          }
          &.text-right {
            text-align: right;
          }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 1.5rem 0;
          padding-left: 0;
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }
        blockquote {
          p {
            // text-indent: 0em;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        ul {
          list-style-type: square;
        }
        ul, ol {
          > li {
            line-height: 1.8em;
            padding: .5em .8em;
            &:hover {
              background-color: $module-hover-bg;
            }
            > p {
              text-indent: 0;
            }
            > ul {
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
        code {
          color: #bd4147;
          padding: .3em .5em;
          margin: 0 .5em;
          border-radius: $radius;
          background-color: $module-hover-bg;
        }
        pre {
          display: block;
          position: relative;
          overflow: hidden;
          margin-bottom: 1em;
          padding-left: 2.5em;
          background-color: rgba(0, 0, 0, 0.8);
          &:before {
            color: white;
            content: attr(data-lang) " CODE";
            height: 2.8em;
            line-height: 2.8em;
            font-size: 1em;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-weight: 700;
            background-color: rgba(68, 68, 68, 0.9);
            display: block;
            text-transform: uppercase;
            text-align: center;
          }
          > .code-lines {
            position: absolute;
            left: 0;
            top: 2.8em;
            margin: 0;
            padding: 1em 0;
            width: 2.5em;
            height: calc(100% - 2.8em);
            text-align: center;
            background-color: rgba(0, 0, 0, 0.2);
            > .code-line-number {
              padding: 0;
              position: relative;
              list-style-type: none;
              line-height: 1.6em;
              transition: background-color .05s;
              &:hover {
                &:before {
                  display: block;
                  opacity: 1;
                  visibility: visible;
                }
              }
              &:before {
                content: '';
                height: 1.6em;
                position: absolute;
                top: 0;
                left: 2.5em;
                width: 66em;
                background-color: rgba(154, 154, 154, 0.2);
                display: none;
                visibility: hidden;
                opacity: 0;
              }
            }
          }
          > code {
            margin: 0;
            padding: 1em;
            float: left;
            width: 100%;
            height: 100%;
            display: block;
            line-height: 1.6em;
            color: rgba(255, 255, 255, 0.87);
            background-color: transparent;
          }
        }
      }
      @keyframes readmorebtn {
        0% {
          transform: translate3d(0, 0, 0);
          background-color: $module-hover-bg;
        }
        25% {
          transform: translate3d(0, .5rem, 0);
          background-color: $primary;
          color: white;
        }
        50% {
          transform: translate3d(0, 0, 0);
          background-color: $module-hover-bg;
        }
        75% {
          transform: translate3d(0, .5rem, 0);
          background-color: $primary;
          color: white;
        }
        100% {
          transform: translate3d(0, 0, 0);
          background-color: $module-hover-bg;
        }
      }
      > .readmore {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: .8rem;
        > .readmore-btn {
          width: 80%;
          text-align: center;
          height: 3rem;
          line-height: 3rem;
          background-color: $module-hover-bg;
          animation: readmorebtn 4s linear infinite;
          &[disabled] {
            cursor: no-drop;
          }
          &:hover {
            background-color: $primary !important;
            color: white !important;
          }
          > .iconfont {
            margin-left: .5rem;
          }
        }
      }
    }
    > .metas {
      padding: 1em 1.5em;
      > .item {
        a:hover {
          text-decoration: underline;
        }
        .site-url {
          text-decoration: underline;
          cursor: pointer;
          color: $link-color;
          &:hover {
            color: $link-hover-color;
          }
        }
      }
    }
    > .related {
      padding: 1em 0;
      border-width: 0 1em;
      border-color: transparent;
      overflow: hidden;
      height: 10em;
    }
    > .comments {
      padding: .8em;
      margin-bottom: 1em;
      background-color: $module-bg;
      > .commentself {
        > .title {
          text-align: center;
          font-weight: bold;
        }
        > .yourcomment {
          padding: 1.3em 1.3em 1.3em 0em;
          background-color: #f8f9fa;
          border: 1px solid #f1f1f1;
          border-radius: 4px;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          > div {
            > .yourimg {
              width: 10%;
              float: left;
              > img {
                float: right;
                margin-right: 1em;
              }
            }
            > .el-textarea {
              width: 90%;
              float: left;
              > textarea {
                overflow: hidden;
                word-wrap: break-word;
                height: 69px;
                resize: none;
                outline: none;
              }
            }
            & button {
              margin-left: 59em;
            }
          }
        }
      }
      > ul {
        list-style-type: none;
        padding: 0em;
        margin: 0em;
        display: block;

        > li {
          position: relative;
          padding-top: 1em;
          padding-bottom: 1em;
          border-top: 1px solid #f5f5f5;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          > div {
            display: flex;
            > .user {
              float: left;
              height: 100%;
              width: 3.5em;
              > img {
                width: 3em;
                height: 3em;
              }
            }
            > .comment {
              flex: 1 1 auto;
              float: left;
              margin-left: 1em;
              height: 100%;
              > div {
                > span {
                  &.hf {
                    cursor: pointer;
                  }
                  > i {
                    margin-right: .4em;
                  }
                  margin-right: 1em;
                  line-height: 1.7;
                  color: #333;
                }
              }
              > .reply {
                > div {
                  width: 100%;
                  display: flex;
                  > .user {
                    float: left;
                    height: 100%;
                    width: 3.5em;
                    > img {
                      width: 3em;
                      height: 3em;
                    }
                  }
                  > .comment {
                    flex: 1 1 auto;
                    float: left;
                    margin-left: 1em;
                    height: 100%;
                    > div {
                      > span {
                        > i {
                          margin-right: .4em;
                        }
                        margin-right: 1em;
                        line-height: 1.7;
                        color: #333;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        > li:first-child {
          border-top: none;
        }
      }
    }
  }
</style>

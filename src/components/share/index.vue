<template>
  <div>
    <el-form ref="form" :rules="rules" :model="article">
      <el-form-item prop="articleTitle">
        <el-input v-model="article.articleTitle" placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" v-model="article.articleSummary" placeholder="文章摘要"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" v-model="article.artucleShareUrl" placeholder="文章URL"></el-input>
      </el-form-item>
      <el-form-item label="文章标签：" prop="articleTag">
        <el-tag
          :key="tag"
          v-for="tag in article.articleTag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </el-form-item>
      <el-form-item label="文章分类：" prop="sortId">
        <el-select v-model="article.sortId" placeholder="请选择">
          <el-option
            v-for="item in articleType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('publish')" round>发布</el-button>
        <el-button type="primary" @click="publish('draft')" round>存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'Publish',
    data () {
      return {
        articleContentShow: "",
        rules: {
          articleTitle: [
            {required: true, message: '请输入文章标题', trigger: 'blur'},
          ],
          artucleShareUrl: [
            {required: true, message: '请输入文章URL', trigger: 'blur'},
          ],
          articleTag: [
            {required: true, message: '请输入文章标签', trigger: 'blur'},
          ],
          sortId: [
            {required: true, message: '请选择文章类别', trigger: 'blur'},
          ],
        },
        article: {
          artucleShareUrl: "",
          articleSummary: "",
          articleTag: [],
          articleTitle: "",
          articleTitleimage: "",
          sortId: null,
          articleType:1
        },
        inputVisible: false,
        inputValue: '',
        publishTip: '',
        upload: {
          url: `${this.$store.getters.baseURL}/upload`,
          headers: {
            token: this.$store.state.token
          }
        },
        options: {}
      }
    },
    async mounted () {
      document.title = '编写文章'
      // 有id就获取文章内容
      if (this.$route.query.id) {
        await this.$store.dispatch('loadArticleDetail', {'id': this.$route.query.id})
        let articleDetail = JSON.parse(JSON.stringify(this.$store.state.article.detail.data))
        articleDetail.articleTag = articleDetail.articleTag.split(',')
        this.article = articleDetail
      } else {
        this.article = {
          articleContent: "",
          articleSummary: "",
          articleTag: [],
          articleTitle: "",
          articleTitleimage: "",
          sortId: null,
          articleType:1
        }
      }
    },
    async beforeRouteUpdate (to, from, next) {
      if (!to.query.id) {
        this.article = {
          articleContent: "",
          articleSummary: "",
          articleTag: [],
          articleTitle: "",
          articleTitleimage: "",
          sortId: null,
          articleType:1
        }
      }
      next()
    },
    computed: {
      articleType(){
        return this.$store.state.option.articleType
      }
    },
    methods: {
      async publish () {
        let pd = true
        this.$refs['form'].validate((valid) => {
          if (valid) {
          } else {
            pd = false
            return false;
          }
        });
        if (!pd) {
          return
        }
        let art = JSON.parse(JSON.stringify(this.article))
        art.articleTag = art.articleTag.join(",")
        await this.$store.dispatch('PUBLISH_ARTICLE', art)
        if (this.$store.state.article.publish.data.status === 0) {
          this.$router.push(`/article/${this.$store.state.article.publish.data.result}`)
        }
      },
      //文章标签开始
      handleClose(tag) {
        this.article.articleTag.splice(this.article.articleTag.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.article.articleTag.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
      //文章标签结束
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
  .el-tag {
    margin-right: 10px;
  }

  .el-tag + .el-tag {
    margin-right: 10px;
  }

  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }
</style>

<template>
  <div>
    <el-form ref="form">
      <el-form-item>
        <span>如果你也想共同发展这个网站，你可以加入我们</span><br>
        <span>如果有什么意见反馈或者bug，你也可以告诉我们，让我们共同完善</span>
      </el-form-item>
      <el-form-item>
        <span>联系方式：gudepeng@qq.com</span>
      </el-form-item>
      <el-form-item>
        <span>如果你想认识更多的技术大牛，你也可以添加技术交流群</span>
      </el-form-item>
      <el-form-item>
        <img src="static/images/wxq.jpg" style="width: 300px">
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'Contactus',
    data () {
      return {

      }
    },
    mounted () {
    },
    computed: {
    },
    methods: {
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
  span{
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
    margin-top: .2em;
    margin-bottom: .5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

<template>
  <div>
    <el-form ref="form" label-width="80px">
       <el-form-item prop="user" label="登录帐号">
        <el-input v-model="userInfo.username" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="user" label="昵称">
        <el-input v-model="userInfo.displayName" placeholder="昵称"></el-input>
      </el-form-item>
       <el-form-item prop="user" label="性别">
         <el-select v-model="userInfo.userSex" placeholder="性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="user" label="联系电话">
        <el-input v-model="userInfo.userPhone" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item prop="user" label="邮箱">
        <el-input v-model="userInfo.userEmail" placeholder="邮箱"></el-input>
      </el-form-item>
       <el-form-item prop="user" label="联系地址">
        <el-input v-model="userInfo.userAddress" placeholder="联系地址"></el-input>
      </el-form-item>
       <el-form-item prop="user" label="个人描述">
        <el-input type="textarea" v-model="userInfo.userDescription" placeholder="个人描述"></el-input>
      </el-form-item>
      <el-form-item prop="articleTitle" label="绑定方式">
        QQ
        <template v-if="connect.qq">
          <span>解除绑定</span>
        </template>
        <template v-else>
          <span>绑定</span>
        </template>
      </el-form-item>
      <el-form-item prop="articleTitle" label="绑定方式">
        Github
        <template v-if="connect.github">
        <span @click="unbindconnect('github')">解除绑定</span>
        </template>
        <template v-else>
          <span @click="bindconnect('github')">绑定</span>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Setting",
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("CONNECT");
  },
  computed: {
    userInfo() {
      return this.$store.state.login.authUser;
    },
    connect() {
      return this.$store.state.login.connect;
    }
  },
  methods: {
    bindconnect(type) {
      this.$store.dispatch("BINDCONNECT", type);
    },
    unbindconnect(type) {}
  },
  components: {}
};
</script>
<style scoped lang="scss">
</style>

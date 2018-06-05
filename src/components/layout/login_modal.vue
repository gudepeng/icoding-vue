<template>
  <transition name="fade">
    <div class="modal" v-show="showtype!=null">
      <article>
        <header>
          <span>{{showtype == 0 ? '登录' : '注册'}}</span>
          <i class="iconfont icon-close" @click="tagclose"></i>
        </header>
        <div class="section">
          <template v-if="showtype==0">
            <div>
              <input type="text" v-model="loginform.username" placeholder="请输入用户名"/>
            </div>
            <div>
              <input type="password" v-model="loginform.password" placeholder="请输入密码"/>
            </div>
            <div>
              <button @click="login">登录</button>
            </div>
            <div class="tool">
              <span class="clickable" @click="$store.dispatch('SHOWLONGINTYPE', 1)">注册</span>
              <span class="right clickable">忘记密码</span>
            </div>
          </template>
          <template v-else-if="showtype==1">
            <div>
              <input type="text" v-model="registeredform.userName" placeholder="请输入用户名"/>
            </div>
            <div>
              <input type="password" v-model="registeredform.userPwd" placeholder="请输入密码"/>
            </div>
            <div>
              <input type="text" v-model="registeredform.userEmail" placeholder="请输入邮箱"/>
            </div>
            <div>
              <button @click="registered">注册</button>
            </div>
            <div class="tool">
              <span class="clickable" @click="$store.dispatch('SHOWLONGINTYPE', 0)">已有账号登录</span>
            </div>
          </template>
          <div>
            <div class="oauth-box">
              <div class="hint">第三方账号登录：</div>
              <div class="oauth">
                <div class="oauth-bg">
                  <a href="/api/auth/qq">
                    <img title="QQ" src="https://gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" class="oauth-btn">
                  </a>
                </div>
                <div class="oauth-bg">
                  <a href="/api/auth/github">
                    <img title="GitHub" src="https://gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" class="oauth-btn">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Service from '@/plugins/axios'
  import qs from 'qs'

  export default {
    name: 'login',
    components: {},
    props: {},
    data() {
      return {
        loginform: {
          username: null,
          password: null
        },
        registeredform: {
          userName: null,
          userPwd: null,
          userEmail: null
        }
      }
    },
    watch: {
      'data.show': function (val) {
        if (val) {
          document.body.appendChild(this.$el);
        } else {
          document.body.removeChild(this.$el);
        }
      }
    },
    computed: {
      showtype() {
        return this.$store.state.login.showlogintype
      }
    },
    mounted() {

    },
    methods: {
      tagclose(data) {
        this.$store.dispatch('SHOWLONGINTYPE', null)
      },
      login(){
        this.loginsuccess(qs.stringify(this.loginform))
      },
      loginsuccess(form){
        //this.$store.dispatch('login', form)
        Service.post('/login/form', form, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            this.$store.dispatch('loadAdminInfo')
            this.tagclose()
            this.$store.dispatch('CLEARARTICLELIST')
            this.$router.push('/')
          }, err => {
            console.log(err)
          })
      },
      registered(){
        Service.put('/user', this.registeredform)
          .then(response => {
            if (response.data.status == 0) {
              this.loginsuccess(qs.stringify({
                username: this.registeredform.userName,
                password: this.registeredform.userPwd
              }))
            }
          }, err => {
            console.log(err)
          })
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/sass/variables';
  @import '../../assets/sass/mixins';

  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;

  }

  .fade-enter-to, .fade-leave {
    opacity: 1;

  }

  .fade-enter, .fade-leave-to {
    opacity: 0;

  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    vertical-align: center;
    background-color: rgba(0, 0, 0, .3);

    & > article {
      width: 23em;
      box-shadow: 0 0 36px rgba(0, 0, 0, .5);
      position: relative;
      top: 90px;
      margin: 0 auto;
      font-size: 14px;
      color: #666;
      // margin-top: -220px;
      z-index: 2;

      background-color: #fff;
      & > header {
        font-size: 16px;
        padding: 15px 10px 15px 20px;
        font-weight: bold;
        color: #333;
        & > span {
          float: left;
        }
        & > .iconfont {
          float: right;
          color: #D9D9D9;
          display: block;
          width: 24px;
          height: 24px;
          font-size: 1em;
          &:hover {
            color: #000;
            cursor: pointer;
          }
        }
      }
      & > .section {
        margin-top: 2em;
        width: 100%;
        padding: 1em;
        & > div {
          position: relative;
          margin-bottom: .8em;
        }
        & > .tool {
          height: 2em;
          width: 100%;
          & > .clickable {
            color: #007fff;
            cursor: pointer;
            float: left;
          }
          & > .right {
            float: right;
          }
        }
        input[type="text"], input[type="password"] {
          padding: 10px;
          width: 100%;
          border: 1px solid #e9e9e9;
          border-radius: 2px;
          outline: none;
          box-sizing: border-box;
          &:focus {
            border: solid 1px #009688;
          }
        }
        button {
          width: 100%;
          height: 3.334em;
          color: #fff;
          background-color: #0088f5;
          border-radius: 2px;
          outline: none;
          box-sizing: border-box;
          cursor: pointer;
        }
        .oauth-box {
          margin-top: 1.2em;
          line-height: 1.9em;
          color: #8b9196;
          & > .oauth {
            margin-top: 1em;
            align-items: center;
            justify-content: center;
            display: flex;
            & > .oauth-bg {
              margin: 0em 1em 0em 1em;
              width: 3em;
              height: 3em;
              border-radius: 50%;
              background-color: #f4f8fb;
              display: flex;
              justify-content: center;
              & > .oauth-btn {
                margin: .5em;
                height: 2em;
                vertical-align: bottom;
                cursor: pointer;
                border-style: none;
              }
            }
          }
        }
      }
      & > footer {
        padding: 20px;
        text-align: right;
        button {
          margin-left: 6px;
        }
      }
    }
    &.delInfo {
      header i.icon {
        display: inline;
        color: #e67e22;
        font-size: 20px;
      }
      section {
        padding: 10px 20px 10px 50px;
        span {
          color: #e67e22;
        }
      }
    }
  }
</style>

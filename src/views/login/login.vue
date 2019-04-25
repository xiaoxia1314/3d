<template>
    <div class='sys-login'>
        <div class='login-area'>
            <div class="title">南充纪委3D智慧园区管理平台</div>
            <p class='littleTitle'>账号登录</p>
            <div class='form-group'>
                <div class='err-msg'><span v-if='sysMsg'>{{sysMsg}}</span></div>
                <el-form :model='loginForm'
                         :rules='loginRules'
                         ref='loginForm'
                         label-position='left'
                         label-width='0px'>
                    <div class="userName">
                      <i class="userIcon"></i> 
                      <el-form-item prop='name' >
                         <!-- <i class="userIcon"></i><span class="account">账号</span> -->
                        <el-input v-model='loginForm.name'
                                    autocomplete="off"
                                  type='text'
                                  placeholder='请输入用户名'
                                  @keyup.enter.native="logining"
                                  autofocus="true"
                                  ></el-input>
                      </el-form-item>
                    </div>
                    <div class="userName">
                      <i class="passIcon"></i> 
                      <el-form-item prop='password'>
                        <el-input v-model='loginForm.password'
                                  type='password'
                                  autocomplete="off"
                                  placeholder='请输入密码'
                                  @keyup.enter.native="logining"
                                  autofocus="true"
                                  ></el-input>
                      </el-form-item>
                    </div>
                    <!-- <el-form-item prop='name' class="userName">
                         <i class="userIcon"></i><span class="account">账号</span>
                        <el-input v-model='loginForm.name'
                                    autocomplete="off"
                                  type='text'
                                  placeholder='请输入用户名'
                                  @keyup.enter.native="logining"
                                  autofocus="true"
                                  ></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item prop='password' class="password">
                         <i class="passIcon"></i><span class="password">密码</span>
                        <el-input v-model='loginForm.password'
                                  type='password'
                                  autocomplete="off"
                                  placeholder='请输入密码'
                                  @keyup.enter.native="logining"
                                  autofocus="true"
                                  ></el-input>
                    </el-form-item> -->
                    <a class='btn-login'
                       type='primary'
                       @click='submitForm()'>登 录</a>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { userLogin } from '@/api/home/index'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [{ required: true, message: '', trigger: 'blur' }],
        password: [{ required: true, message: '', trigger: 'blur' }]
      },
      sysMsg: ''
    }
  },
  beforeMount () {
    // 初始化错误信息。保证单独点击input时可以弹出正确的错误提示
    this.setErrMsg()
  },
  methods: {
    ...mapActions(['committSecondMenuData']),
    logining () {
      this.submitForm()
    },
    submitForm () {
      var that = this
      this.$refs.loginForm.validate(valid => {
        const params = {
          username: this.loginForm.name,
          password: this.loginForm.password
        }
        if (valid) {
          userLogin(params).then(res => {
            console.log('res',res);
            if (res && res.data.code === 200) {
              // 用户信息存入session.storage
              
              
              sessionStorage.setItem('id', res.data.data.id)
              sessionStorage.setItem('username', res.data.data.username)
              sessionStorage.setItem('isManager', res.data.data.isManager)
              that.$router.push('/home')
              sessionStorage.removeItem('secondMenu')
              this.committSecondMenuData()
            } else {
              this.sysMsg = res.data.message
            }
          }).catch(e => {
            // console.log(e)
          })
        } else {
          return false
        }
      })
    },
    setErrMsg () {
      this.loginRules.name[0].message = '请输入用户名'
      this.loginRules.password[0].message = '请输入密码'
    }
  }
}
</script>
<style lang='scss' scope>
.sys-login {
  width: 100%;
  min-height: 100%;
  background: url(../../assets/images/loginBg.png) no-repeat;
  background-size: 100% 100%;
  .login-area {
    position: absolute;
    top: 185px;
    left: 1120px;
    width: 560px;
    height: 630px;
    background-color: #effaff;
    border-radius: 16px;
    .title {
        width: 100%;
        text-align: center;
        font-size: 28px;
        font-family: MicrosoftYaHei;
        color: #535353;
        margin: 60px 0px 40px;
        font-weight: 700;
      }
      .littleTitle {
        color: #535353;
        font-size: 24px;
        text-align: center;
        font-weight: 400;
      }
  }
  .form-group {
    width: 360px;
    margin: 0 auto;
    padding-bottom: 10px;
    overflow: hidden;
    input::-webkit-input-placeholder {
      color: #7e9fb0 !important;
    }
    .userName {
        border-radius: 6px;
        border: solid 1px #cccccc;
        color: #535353;
        margin-bottom: 30px;
        .userIcon {
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url(../../assets/images/account.png) no-repeat;
            background-size: 18px 18px;
            margin: 0px 10px;
            vertical-align: middle;
        }
        .passIcon {
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url(../../assets/images/password.png) no-repeat;
            background-size: 18px 18px;
            margin: 0px 10px;
            vertical-align: middle;
        }
        .el-form-item{
          display: inline-block;
          width: 89%;
          margin-bottom: 0px;
          .el-input__inner{
            border-radius: 0px;
            border: none;
            padding-left: 6px;

          }
        }
    }
    .password {
        .passIcon {
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url(../../assets/images/password.png) no-repeat;
            background-size: 18px 18px;
            margin-right: 8px;
            vertical-align: middle;
        }
    }
    .el-input__inner {
      height: 48px;
      line-height: 48px;
      padding-left: 10px;
      font-size: 14px;
      border-radius: 6px;
      border: solid 1px #cccccc;
      color: #535353;
      overflow: hidden;
      &:hover {
        border-color: #69eff8;
      }
      &:focus {
        border-color: #69eff8;
      }
    }
    .el-form-item {
      &.is-error .el-input__inner {
        border-color: #ccc;
        background-color: #ffffff;
      }
    }
    .el-form-item__error {
      color: red;
      padding-top: 10px;
    }
  }
  .btn-login {
    display: block;
    width: 100%;
    height: 48px;
    font-size: 24px;
    color:#fafafc;
    line-height: 48px;
    text-align: center;
    background-color: #1385b9;
    box-shadow: 0px 2px 8px 0pxrgba(0, 30, 47, 0.36);
    border-radius: 6px;
    margin-top: 50px;
    cursor: pointer;
  }
  .err-msg {
    color: red;
    text-align: left;
    height: 30px;
    line-height: 30px;
  }
}
</style>

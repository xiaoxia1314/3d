<template>
    <div class="layout">
        <!-- <canvas id="h3d" style="width:100%;height:100%;"></canvas> -->
        <!-- 导航 -->
        <div class="navWrap">
           <div class="leftWrap">
               <i class='logoIcon'></i>
               <span class="title">3D</span>
           </div>
                <div class="centerMenu">
                    <ul class="firstMenu">
                        <li v-for="item of menuData" :key="item.id" v-show="item.parentId === 0" @click="firstMenuClick(item)"><span>{{item.name}}</span></li>
                    </ul>
                    <div class="menuBg" :class="{'home': $route.path.indexOf('/home') >= 0,'basic': $route.path.indexOf('/basicManagement') >= 0,'office': $route.path.indexOf('/officeManagement') >= 0,'warning': $route.path.indexOf('/warningManagement') >= 0,'system': $route.path.indexOf('/systemManagement') >= 0}"></div>
                    <transition name="slide" enter-active-class="animated slideInRight"
                        leave-active-class="animated slideOutRight"
                        :duration="1000">
                        <ul class="secondMenu" v-if='secondMenuShow'>
                            <li v-for='item of secondMenu' :key="item.id"><router-link :to='item.url'>{{item.name}}</router-link></li>
                        </ul>
                    </transition>
                </div>
           <div class="rightTime">
               <p>
                  <span class='timeShow'>{{nowDate | dateFormat}}</span>&emsp;
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="dialogVisible = true">修改密码</el-dropdown-item>
                      <el-dropdown-item @click.native="editInfo">修改信息</el-dropdown-item>
                      <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
               </p>
            </div>
        </div>
        <input type="text">
        <div class="main">
          <router-view></router-view>
        </div>
        <el-dialog title="修改密码" class="edit" :visible.sync="dialogVisible"  width="20%" center>
          <el-form :model="ruleForm2" :rules="rules2" ref="editPsd" label-width="100px" class="demo-ruleForm">
             <el-form-item label="原密码：" prop="password">
              <el-input type="password" v-model="ruleForm2.password" ></el-input>
            </el-form-item>
            <el-form-item label="修改密码：" prop="oldPassword">
              <el-input type="password" v-model="ruleForm2.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="newPassword">
              <el-input type="password" v-model="ruleForm2.newPassword"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" >
            <el-button @click="dialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editPsd')">确 定</el-button>
          </span>
        </el-dialog>
         <el-dialog title="修改信息" class="edit" :visible.sync="editMsg"  width="20%" center>
          <el-form :model="editMessage" :rules="editRules" ref="editMsg" label-width="84px" class="demo-ruleForm">
             <el-form-item label="姓名：" prop="name">
              <el-input  v-model="editMessage.name" ></el-input>
            </el-form-item>
            <el-form-item label="职位：" prop="job">
              <el-input  v-model="editMessage.job"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="phone">
              <el-input  v-model="editMessage.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <!-- <el-input  v-model="editMessage.sex"></el-input> -->
              <el-select v-model="editMessage.sex" placeholder="请选择性别">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" >
            <el-button @click="editMsg=false">取 消</el-button>
            <el-button type="primary" @click="editSubmitForm('editMsg')">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (this.ruleForm2.checkPass !== '') {
        //   this.$refs.ruleForm2.validateField('checkPass');
        // }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.oldPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // secondMenu: [],
      dialogVisible: false, // 修改密码弹出框
      userName: sessionStorage.getItem('username'),
      id: sessionStorage.getItem('id'),
      // loadingValue: true,
      secondMenuShow: true,
      timer: '', // 定时器
      nowDate: new Date(),
      menuData: [
        {
          id: 1,
          parentId: 0,
          name: '首页',
          url: '/home'
        },
        {
          id: 2,
          parentId: 0,
          name: '基础管理',
          url: '/basicManagement'
        },
        {
          id: 3,
          parentId: 0,
          name: '办公区管理',
          url: '/officeManagement'
        },
        {
          id: 4,
          parentId: 0,
          name: '报警管理',
          url: '/warningManagement'
        },
        {
          id: 5,
          parentId: 0,
          name: '系统管理',
          url: '/systemManagement'
        },
        {
          id: 6,
          parentId: 2,
          name: '设备管理',
          url: '/basicManagement/deviceManagement'
        },
        {
          id: 7,
          parentId: 2,
          name: '区域管理',
          url: '/basicManagement/areaManagement'
        },
        {
          id: 8,
          parentId: 2,
          name: '报警设置',
          url: '/basicManagement/warningSetting'
        },
        {
          id: 9,
          parentId: 3,
          name: '办公区简介',
          url: '/officeManagement/officeIntroduction'
        },
        {
          id: 10,
          parentId: 3,
          name: '通讯录',
          url: '/officeManagement/contactList'
        },
        // {
        //   id: 11,
        //   parentId: 3,
        //   name: '排班表',
        //   url: '/officeManagement/workingList'
        // },
        {
          id: 12,
          parentId: 3,
          name: '计划任务',
          url: '/officeManagement/planList'
        },
        {
          id: 13,
          parentId: 3,
          name: '日常简报',
          url: '/officeManagement/dailyBriefing'
        }
      ],
      ruleForm2: {
        password: '',
        oldPassword: '',
        newPassword: ''
      },
      editMessage: {
        name: '',
        job: '',
        phone: '',
        sex: ''
      },
      editRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入职位', trigger: 'blur' },
          { validator: this.VerifyPhone }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },
      editMsg: false,
      rules2: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { validator: validatePass }
        ],
        newPassword: [
          { required: true, trigger: 'blur' },
          { validator: validatePass2 }
        ]
      }
    }
  },
  components: {
    // 'topNav': topNav
  },
  computed: {
    ...mapState(['secondMenu'])
  },
  filters: {
    dateFormat (value) {
      let fmt = 'yyyy-MM-dd hh:mm:ss'
      let getDate = new Date(value)
      let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  },
  mounted () {
    var _this = this
    // 当前时间计时器
    this.timer = setInterval(() => {
      _this.nowDate = new Date() // 修改数据date
    }, 1000)
    // this.hotTime3D()
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  watch: {

  },
  methods: {
    ...mapActions(['committSecondMenuData']),
    editInfo () {
      this.editMsg = true
      getUserById(this.id).then(res => {
        this.editMessage = res.data.data
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let edit = { password: this.ruleForm2.password, newPassword: this.ruleForm2.newPassword }
          updatePWD(edit).then(res => {
            console.log('res', res)
            
            if (res.data.code == 200) {
              this.$message({
                message: res.data.data,
                type: 'success'
              })
              this.$router.push('/login')
              sessionStorage.clear()
              this.committSecondMenuData()
            }else {
              this.$message({
                message: res.data.data,
                type: 'error'
              })
            }
          })
          this.dialogVisible = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete this.editMessage.password
          editUser(this.editMessage).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
            }
          })
          this.editMsg = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    firstMenuClick (val) {
      let secondMenu = this.menuData.filter(menuItem => {
        return menuItem.parentId === val.id
      })
      sessionStorage.setItem('secondMenu', JSON.stringify(secondMenu))
      this.committSecondMenuData()
      if (secondMenu.length > 0) {
        this.secondMenuShow = true
        this.$router.push(this.secondMenu[0].url)
      } else {
        this.$router.push(val.url)
      }
    },
    outLogin () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear()
        this.committSecondMenuData()
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="scss" scope>
    .layout {
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
        // background: url('../../assets/images/map.png') no-repeat;
        // background-size: 100% 100%;
        .navWrap {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 72px;
            background: url("../../assets/images/top-background.png") no-repeat;
            z-index: 96;
            .leftWrap {
                position: relative;
                display: inline-block;
                width: 650px;
                height: 72px;
                .logoIcon {
                    position: absolute;
                    left: 47px;
                    top: 15px;
                    display: inline-block;
                    width: 83px;
                    height: 53px;
                    background: url('../../assets/images/logo.png') no-repeat;
                }
                .title {
                    position: absolute;
                    left: 262px;
                    top: 30px;
                    display: inline-block;
                    font-size:28px;
                    font-weight:700;
                }
            }
            .centerMenu {
                position: relative;
                display: inline-block;
                width: 852px;
                height: 40px;
                vertical-align: top;
                margin-top: 32px;
                .firstMenu {
                    position: absolute;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 60px;
                    box-sizing: border-box;
                    z-index: 99;
                    li {
                        font-size:14px;
                        width: 96px;
                        height: 40px;
                        text-align: center;
                        cursor: pointer;
                        span {
                            display: inline-block;
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            font-size:14px;
                            color: #fff;
                            // &.router-link-active {
                            //     background: url('../../assets/image/navBg.png') no-repeat;
                            //     background-size: 100% 100%;
                            // }
                        }
                    }
                }
                .menuBg {
                    position: absolute;
                    width: 99px;
                    height: 31px;
                    background: url('../../assets/images/top-selection.png') no-repeat;
                    background-size: 100% 100%;
                    &.home {
                        left: 60px;
                        top: 5px;
                        transition: all 0.5s;
                    }
                    &.basic {
                        left: 218px;
                        top: 5px;
                        transition: all 0.5s;
                    }
                    &.office {
                        left: 376px;
                        top: 5px;
                        transition: all 0.5s;
                    }
                    &.warning {
                        left: 535px;
                        top: 5px;
                        transition: all 0.5s;
                    }
                    &.system {
                        left: 693px;
                        top: 5px;
                        transition: all 0.5s;
                    }
                }
                .secondMenu {
                    position: absolute;
                    left: 220px;
                    top: 53px;
                    width: 100%;
                    li {
                        display: inline-block;
                        font-size:14px;
                        width: 96px;
                        height: 28px;
                        margin-right: 48px;
                        text-align: center;
                        cursor: pointer;
                        a {
                            display: inline-block;
                            width: 100%;
                            height: 28px;
                            line-height: 28px;
                            color: #fff;
                            text-decoration: none;
                            background: url('../../assets/images/menuNormal.png') no-repeat;
                            background-size: 100% 100%;
                            &.router-link-active {
                                background: url('../../assets/images/menuActive.png') no-repeat;
                            }
                        }
                    }
                }
            }
            .rightTime {
                display: inline-block;
                position: relative;
                width: 400px;
                height: 72px;
                vertical-align: top;
                p {
                    position: absolute;
                    height: 46px;
                    line-height: 46px;
                    left: 56px;
                    top: 24px;
                    .timeShow {
                      font-size: 24px;
                    }
                    .el-dropdown-link {
                      font-family: 'microsoftyahei'
                    }
                    .weather {
                        display: inline-block;
                        font-size: 20px;
                        height: 46px;;
                        .weatherIcon {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background: url('../../assets/images/sunny.png') no-repeat;
                            background-size: 100% 100%;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                    }
                    .el-dropdown{
                      color: #fff;
                      >span{
                        font-size: 16px;
                        cursor: pointer;
                      }
                    }
                }
            }
        }
        .main {
            width: 100%;
            position: absolute;
            top: 96px;
            left: 0px;
            z-index: 99;
            color: #333;
        }
        #h3d {
          position: absolute;
          left: 0;
          top: 0;
        }
        .edit{
          .el-form {
            .el-form-item__label{
              color: #333;
            }
            .el-form-item{
              margin-bottom: 8px;
            }
            .el-form-item__label{
              padding: 0px;
            }
            .el-form-item__error{
              padding: 0px;
              top: 98%;
            }
            .el-input .el-input__inner{
              border: 1px solid #ccc;
              background-color: #fff;
              color: #606266;
            }

          }
        }

        .el-dialog__title{
          float: left;
        }
    }
</style>

<template>
  <div class="login">
    <p>ceshi</p>
    <p><span>登陆中，没有账号？</span><span class="go-register" @click="goRegister">去注册</span></p>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
      <el-form-item prop="username" class="babel-title">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="babel-title">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sbt" @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data(){
    var checkusername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if(!reg.test(value)){
            callback('手机号码错误');
          }else{
            callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          checkPass: '',
          username: '',
          password: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkusername, trigger: 'blur' }
          ]
        }
      };
  },
  computed:{
    ...mapState(['userStatus'])
  },
  methods:{
    ...mapMutations(['changeUserStatus']),
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goRegister(){
        this.$router.push('/register')
      },
      login(){
        let url = `${this.api}/user/login.php`
        axios({
          method:'post',
          url,
          params:{
            username:this.ruleForm.username,
            password:this.ruleForm.password,
            v:this.rand
          }
        })
          .then(res => {
            let { data } = res.data
            if(res.data.code === 0){
              this.$message({
                message: '登陆成功~',
                type: 'success',
                center:true
              });
              localStorage.setItem('uid',data.uid)
              localStorage.setItem('headImg',data.headImg)
              this.changeUserStatus(1)
              this.$router.push('/')
            }else{
              this.$message({
                message: '登陆失败！请检查~',
                type: 'error',
                center:true
              });
            }
          })
          .catch(err=>{
            console.log(err)
          })
      }
  }

}
</script>
<style lang='scss' scoped>
*{
  font-size: 3rem;
}
.login{
  width: 100%;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  padding: 0 2rem 0;

  &>p{
    margin-bottom: 20px;
    font-size: 2rem;
    .go-register{
      color: #409EFF;
    }
  }
}
  .babel-title{
  }
  .sbt{
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 10px;
  }
</style>

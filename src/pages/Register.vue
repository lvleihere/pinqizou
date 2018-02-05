<template>
  <div class="register">
    <p><span>注册中，有账号？</span><span class="go-login" @click="goLogin">去登陆</span></p>
    <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm">
      <el-form-item prop="username" class="babel-title">
        <el-input v-model.number="ruleForm.username" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="pass" class="babel-title">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="babel-title">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"  placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="nick" class="babel-title">
        <el-input type="text"  v-model="ruleForm.nick" auto-complete="off"  placeholder="取个好听名字吧~"></el-input>
      </el-form-item>
      <el-form-item prop="email" class="babel-title">
        <el-input type="text"  v-model="ruleForm.email" auto-complete="off" placeholder="您的邮箱呢，我们绝对保密！"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sbt" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    var checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(value)) {
          callback("手机号码错误");
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkNick = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名字不能为空"));
      }else{
        callback();
      }
    };
     var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!new RegExp(
              "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
            ).test(this.ruleForm.email)) {
          return callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        nick:'',
        email:'',
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkusername, trigger: "blur" }],
        nick:[{ validator: checkNick, trigger: "blur" }],
        email:[{ validator: checkEmail, trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      let self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = `${this.api}/register.php`
          axios({
            method:'post',
            url,
            params:{
              username:self.ruleForm.username,
              password:self.ruleForm.pass,
              nick:self.ruleForm.nick,
              email:self.ruleForm.email,
              v:this.rand
            }
          })
            .then(res=>{
              if(res.data.code === 0){
                this.$message({
                  message:'注册成功!',
                  type:'success',
                  center:true
                })
                this.$router.push('/login')
              }else if(res.data.code === -1){
                this.$message({
                  message:'已存在此用户!',
                  type:'error',
                  center:true
                })
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang='scss' scoped>
* {
  font-size: 3rem;
}
.register {
  width: 100%;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  padding: 0 2rem 0;
  & > p {
    margin-bottom: 20px;
    .go-login {
      color: #409eff;
    }
  }
}
.sbt {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 10px;
}
</style>

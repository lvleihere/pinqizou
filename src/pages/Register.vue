<template>
  <div class="register">
    <p><span>注册中，有账号？</span><span class="go-login" @click="goLogin">去登陆</span></p>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2">
      <el-form-item prop="username" class="babel-title">
        <el-input v-model.number="ruleForm2.username" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="pass" class="babel-title">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="babel-title">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"  placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sbt" @click="submitForm('ruleForm2')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkusername, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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

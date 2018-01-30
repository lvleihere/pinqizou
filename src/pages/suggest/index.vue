<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="6rem" class="wrap">
  <el-form-item label="您" prop="name">
    <el-input v-model="ruleForm.name"  placeholder="亲，填下您的大名"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-select v-model="ruleForm.age" placeholder="您的年龄段呢" class="selection">
      <el-option label="10-20" value="10-20"></el-option>
      <el-option label="20-30" value="20-30"></el-option>
      <el-option label="30-40" value="30-40"></el-option>
      <el-option label="40-50" value="40-50"></el-option>
      <el-option label="50+" value="50+"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="职业" prop="job">
    <el-select v-model="ruleForm.job" placeholder="想了解您的职业" class="selection">
      <el-option label="学生" value="学生"></el-option>
      <el-option label="互联网" value="互联网"></el-option>
      <el-option label="金融" value="金融"></el-option>
      <el-option label="建筑" value="建筑"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="您的建议类型是什么" class="selection">
      <el-option label="产品bug" value="bug"></el-option>
      <el-option label="页面体验不好" value="页面体验不好"></el-option>
      <el-option label="我有新想法" value="我有新想法"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="详细" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"  placeholder="具体建议是？"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button class="btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button class="btn" @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        age:"",
        job:"",
        type: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名字", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        age:[
          { required: true, message: "请选择您的年龄", trigger: "blur" }
        ],
        job:[
          { required: true, message: "请选择您的职业", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择建议类型", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写详细", trigger: "blur" }]
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='scss' scoped>
  .wrap{
    margin-top: 3rem;
    width: 88vw;
  }
  .selection{
    width: 100%;
  }
  .btn{
    width: 40%;
  }
</style>

<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="5rem" class="form-box">
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" clearable placeholder="请输入你的标题"></el-input>
    </el-form-item>
    <el-form-item label="时间" required>
      <el-time-select
        placeholder="起始时间"
        v-model="startTime"
        class="time-picker"
        type="date"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00'
        }">
      </el-time-select>
      <span class="to-flag">到</span>
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        class="time-picker"
        type="fixed-time"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00',
          minTime: startTime
        }">
      </el-time-select>
    </el-form-item>

    <el-form-item label="标签" required>
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        class="tags"
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
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" @click="showInput">点击添加</el-button>
    </el-form-item>

    <el-form-item label="主题" prop="content">
      <el-input type="textarea" v-model="ruleForm.content" placeholder="你的具体要求等"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">发表</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      ruleForm: {
        title: "",
        content: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        content: [{ required: true, message: "请填写主题", trigger: "blur" }]
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.publish();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.startTime = ''
      this.endTime = ''
      this.dynamicTags = []
    },
    //tag
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    publish(){
      let uid = localStorage.getItem('uid')
      let tag = `起${this.startTime},止${this.endTime},${this.dynamicTags.join(',')}`

      let url = `${this.api}/publish.php`
      axios({
        method:'post',
        url,
        params:{
          uid,
          title:this.ruleForm.title,
          time:Date.now().toString().slice(0,10),
          tag,
          content:this.ruleForm.content,
          good:0,
          v:this.rand
        }
      })
        .then(res=>{
          if(res.data.code === 0){
            this.$message({
              message: "发布成功~",
              type: "success",
              center: true
            })
          this.$router.push('/')
          }
        })
        .catch(err=>{})
    }
  }
};
</script>
<style lang='scss' scoped>
.form-box {
  width: 96vw;
  margin-top: 10%;
}
.to-flag {
  text-align: center;
  display: inline-block;
  width: 4%;
}
.time-picker {
  width: 46%;
}
//标签开始
.tags{
  margin-right: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
//结束
</style>

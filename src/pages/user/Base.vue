<template>
  <div>
      <p class="title">
        <i class="el-icon-arrow-left" @click="back"></i>
        <span>个人信息</span>
      </p>
      <div class="base-info">
        <p><label>头像</label><img src="/static/img/head3.jpg" alt="headImg"></p>
        <p><label>nick</label><span>吕雷</span></p>
        <p><label>公司</label><span>北京五八到家信息技术有限公司</span></p>
        <p><label>职业</label><span>web前端工程师</span></p>
        <p><label>学历</label><span>本科</span></p>
      </div>
      <p class="count-tite">账号安全</p>
      <div class="count-salf">
        <p>修改密码</p>
        <p>修改手机号</p>
        <p>关注微信小程序</p>
      </div>
      <p class="login-out" @click="logout">退出登录</p>
    </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    back(){
      this.$router.push('/')
    },
    logout(){
      this.$router.push('/login')
    }
  }
}
</script>
<style lang='scss' scoped>

* {

}

.title{
  height:40px;
  line-height: 40px;
  font-size: 20px;
  color: #409eff;
  text-align: center;
  border-bottom:1px #409eff solid;
  position: relative;
  &>i{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    padding: 0 20px;
  }
  &>span{
  }
}
  .base-info {
    font-size: 16px;
  line-height: 50px;
  padding: 0 15px 0;
  background: #fff;
  & > p {
    overflow: hidden;
    border-bottom: 1px #edefff solid;
    & > label {
      display: inline-block;
      width: 50px;
    }
    & > img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      float: right;
      margin-top: 5px;
    }
    & > span {
      float: right;
      color: grey;
    }
  }
}
.count-tite {
  font-size: 16px;
  line-height: 50px;
  padding-left: 15px;
}
.count-salf{
  font-size: 16px;
  line-height: 50px;
  background: #fff;
  padding:0 15px 0;
  &>p{
    border-bottom: 1px #edefff solid;
  }
}
.login-out{
  line-height: 50px;
  background: #FF615B;
  margin-top: 10px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  letter-spacing: 1px;
}
</style>

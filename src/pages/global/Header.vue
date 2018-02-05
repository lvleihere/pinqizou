<template>
  <div class="header">
    <img src="@/assets/head.png" alt="logo" @click="goIndex">
    <div class="token" @click="login" v-if="!userStatus">
      <span>登陆</span>&nbsp;<span class="center-line">|</span>&nbsp;<span>注册</span>
    </div>
    <div class="info" v-if="userStatus">
      <img :src="headImg" alt="headImg" @click.stop="showNav">
      <span class="publish" @click="publish">发布</span>
    </div>
    <ul class="user-nav" v-if="userNavStatus">
      <li class="triangle"></li>
      <li @click="goBase">基本信息</li>
      <li @click="goMsg">消息</li>
      <li @click="loginOut">退出</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import bus from "@/store/Bus";

export default {
  data(){
    return {
      headImg:''
    }
  },
  created(){
    let self = this
    bus.$on('bodyClick', () => {
      self.closeUserNav()
    })
    if(localStorage.getItem('uid')){
      this.changeUserStatus(1)
    }
  },
  mounted(){
    this.headImg = localStorage.getItem('headImg')
  },
  computed:{
    ...mapState(['userStatus','userNavStatus'])
  },
  methods:{
    ...mapMutations(['changeUserNavStatus','changeUserStatus','closeUserNav']),
    login(){
      this.$router.push('/login')
    },
    goIndex(){
      this.$router.push('/')
    },
    publish(){
      this.$router.push('/publish')
    },
    showNav(){
      this.changeUserNavStatus()
    },
    goBase(){
      let uid = localStorage.getItem('uid')
      this.$router.push(`/user/base/${uid}`)
    },
    goMsg(){
      this.$router.push('/user/msg')
    },
    loginOut(){
      this.changeUserStatus(0)
      localStorage.removeItem('uid')
      localStorage.removeItem('headImg')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang='scss'>
$b: 1px red solid;
.header {
  width: 100vw;
  height: 3.5rem;
  position: fixed;
  top: 0;
  z-index: 2;
  background: #EFEFEF;
  &>img{
    height: 100%;
    float: left;
  }
  .token{
    position: absolute;
    top: 25%;
    right: 10px;
    font-size: 2.2rem;
    animation:swing 10s ease-in-out infinite alternate;
    transform-origin:50% 50%;
    &>span{
      padding: 0 3px;
    }
    .center-line{
      color:grey;
    }
  }
  .info{
    padding:.7rem  .3rem .3rem;
    position: absolute;
    right: 20px;
    &>img{
        width: 2rem;
        border-radius: 50%;
        margin-right: 10px;
      }
    .publish{
      font-size: 15px;
      vertical-align: .5rem;
      font-weight: bold;
    }
  }
  .user-nav{
    z-index:9999;
    width: 70px;
    border-radius: 3px;
    position: absolute;
    right: 20px;
    top:3.5rem;
    background: #fff;
    padding:0 5px 5px;
    box-shadow: 0 1px 3px 3px grey;
    .triangle{
      width: 10px;
      height: 10px;
      background: #fff;
      position: relative;
      top: -3px;
      transform: rotate(45deg);
    }
    &>li{
      font-size: 14px;
      line-height: 25px;
    }
  }
  @keyframes swing {
     0%{
       transform: rotate(2deg);
     }
     1%{
       transform: rotate(-2deg);
     }
     2%{
       transform: rotate(2deg);
     }
     3%{
       transform: rotate(-2deg);
     }
     4%{
       transform: rotate(2deg);
     }
     5%{

       transform: rotate(0);
     }
     99%{
       transform: rotate(0);
     }
  }
}
</style>

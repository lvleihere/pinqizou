<template>
  <div>
      <nav>
        <span
          v-for="(list, index) in msgLists"
          :key="index"
          :class="{active:index === navStatus}"
          @click="changeNav(index)"
        >{{list}}</span>
      </nav>
  </div>
</template>
<script>
export default {
  data(){
    return {
      msgLists:['私信','系统消息'],
      navStatus:0
    }
  },
  methods: {
      changeNav(index){
        this.navStatus = index
      }
    }
}
</script>
<style lang='scss' scoped>
  nav{
    display: flex;
    &>span{
      flex: 0 0 50%;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
    }
  }
  .active{
    color: #409eff;
    border-bottom: 2px #409eff solid;
  }
</style>

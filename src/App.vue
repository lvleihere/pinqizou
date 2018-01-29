<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/pages/global/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang='scss'>
*{
  margin: 0;
  padding:0;
  box-sizing: border-box;
  list-style: none;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  display: inline-block;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body{
  font-size: 1.5625vw;
  font-family:"微软雅黑","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
  background: #EDEFF2;
}

</style>

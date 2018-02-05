<template>
  <ul>
    <li v-for="(list, index) in lists" :key="index" class="item">
      <p><span class="title">系统消息</span><span class="time">{{list.time}}</span></p>
      <p>{{list.content}}</p>
    </li>
  </ul>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      lists: []
    };
  },
  created() {
    let url = `${this.api}/getsystem.php`

    axios({
      method:'get',
      url,
      params:{
        v:this.rand
      }
    })
      .then(res=>{
        if(res.data.code === 0){
          let {data} = res.data
          this.lists = data.slice(0)
        }
      })
        .catch(err=>{})
  }
};
</script>
<style lang='scss' scoped>
.item {
  margin-top: 10px;
  background: #f5f5f5;
  overflow: hidden;
  padding: 8px 10px;
  &>p{
    line-height: 20px;
  }
  .title{
    font-size: 16px;
  }
  .time{
    float: right;
  }
}
</style>

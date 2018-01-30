<template>
  <transition-group tag="ul" name="list" class="nav">
    <li v-for="(navList, index) in navLists"
        :key="index"
        :class="{active:navNum === index}"
        @click="changeNav(index)"
    >
      <i :class="navList.icon"></i>&nbsp;{{navList.name}}
    </li>
  </transition-group>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      navLists: [{
        name: '最新',
        icon: 'el-icon-location'
      },
      {
        name: '讨论',
        icon: 'el-icon-sort'
      },
      {
        name: '建议',
        icon: 'el-icon-edit'
      }],
      navNum: 0
    }
  },
  mounted(){
  },
  computed:{
    ...mapState(['navTab'])
  },
  methods: {
    ...mapMutations(['changeNavTab']),
    changeNav (index) {
      this.navNum = index
      this.changeNavTab(index)
    }
  }
}
</script>
<style lang='scss' scoped>
$b:1px red solid;
  .nav{
    width: 100vw;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    position: fixed;
    top: 3.5rem;
    background: #EDEFF2;
    opacity: .9;
    filter:alpha(opacity=90);
    z-index: 1;
    display: flex;
    justify-content: space-around;
    &>li{
      text-align: center;
      flex-grow: 1;
    }
    .active{
      color: #409EFF;
      border-bottom:2px #409EFF solid;
    }
  }
</style>

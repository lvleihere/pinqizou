<template>
  <div class="show-box" v-if="showStatus">
    <span @click="closeShow">×</span>
      <ul ref="uls">
        <li v-for="(show, index) in shows" :key="index">
          {{show}}
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allData:[
        '李*，在北京找到伙伴',
        '张*，在重庆找到伙伴',
        '1*，在北京找到伙伴',
        '2*，在北京找到伙伴',
        '3*，在北京找到伙伴',
        '4*，在北京找到伙伴',
        '5*，在北京找到伙伴',
        '6*，在北京找到伙伴',
        '7*，在北京找到伙伴',
        '8*，在北京找到伙伴',
        '9*，在北京找到伙伴',
      ],
      shows:[

      ],
      showStatus:1
    }
  },
  mounted(){
    let i = 0
    let l = 0
    setInterval(()=> {
      this.shows.push(this.allData[i])
      i++
      this.shows.length === 3?this.shows.shift():null
      i===this.allData.length?i=0:null
      console.log(this.shows)
    },5000)
  },
  methods:{
    closeShow(){
      this.showStatus = 0
    }
  }
};
</script>

<style lang='scss' scoped>
.show-box {
  position: fixed;
  top: 7rem;
  left: 0;
  &>span{
    padding: 6px;
  }
  & > ul {
    margin-top: 3px;
    & > li {
      background: #222;
      padding: 3px 8px;
      border-radius: 0 10px 10px 0;
      color: #fff;
      opacity: 0.6;
      //animation: show 5s ease-in-out forwards;
      transform-origin: left;
    }
  }
}
@keyframes show {
  0% {
    transform: scale(0);
  }
  5% {
    transform: scale(1);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>

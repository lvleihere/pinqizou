<template>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>
<script>
export default {

}
</script>
<style lang='scss' scoped>
  ul{
    overflow: hidden;
    padding: 10px;
    display: inline-block;
    margin-left: 50%;
    transform:translateX(-50%);
    &>li{
      width: 3px;
      height: 20px;
      background: #409EFF;
      margin-left: 8px;
      float: left;
      &:nth-of-type(1){
        animation:loading .6s ease-in-out 0s infinite alternate;
      }
      &:nth-of-type(2){
        animation:loading .6s ease-in-out .1s infinite alternate;
      }
      &:nth-of-type(3){
        animation:loading .6s ease-in-out .3s infinite alternate;
      }
      &:nth-of-type(4){
        animation:loading .6s ease-in-out .4s infinite alternate;
      }
      &:nth-of-type(5){
        animation:loading .6s ease-in-out .6s infinite alternate;
      }
    }
  }
  @keyframes loading{
    0% {
      transform: scaleY(1);
    }
    100%{
      transform: scaleY(.3);
    }
  }
</style>

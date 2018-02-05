<template>
  <div>
    等一等，一定会有你想要的讨论区
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import timeJs from 'time.js'

export default {
  mounted(){
    console.log(timeJs.ago(1517003205922))
  }
};
</script>
<style lang='scss' scoped>

</style>

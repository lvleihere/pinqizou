<template>
  <section>
    <newest v-show="0 === navTab"></newest>
    <discuss v-show="1 === navTab"></discuss>
    <suggest v-show="2 === navTab"></suggest>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import newest from './newest/index'
import discuss from './discuss/index'
import suggest from './suggest/index'

export default {
  components:{
    newest,
    discuss,
    suggest
  },
  computed:{
    ...mapState(['navTab'])
  }
}
</script>
<style lang='scss' scoped>
  $b:1px red solid;
</style>



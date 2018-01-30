<template>
  <div class="main-index">
    <Nav />
    <Main />
  </div>
</template>
<script>
import Nav from './Nav'
import Main from './Main'

export default {
  components: {
    Nav,
    Main
  }
}
</script>
<style scoped>
  .main-index{
    padding-top: 30px;
  }
</style>

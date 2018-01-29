<script>
import Vue from 'vue'
/**
 * 总事件监听，其他需要全局事件的组件，在此组件上进行订阅
 */
export default new Vue({
  created () {
    window.addEventListener('resize', () => {
      this.$emit('resize')
    })
    window.addEventListener('click', () => {
      this.$emit('bodyClick')
    })
  },
  destroyed () {
    window.removeEventListener('resize', () => {
      this.$emit('resize')
    })
    window.removeEventListener('resize', () => {
      this.$emit('bodyClick')
    })
  }
})
</script>

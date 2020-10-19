<script>
import { clearAuth } from '@/assets/js/Auth'
export default {
  mounted () {
    clearAuth()
    setTimeout(() => {
      this.$router.push({ name: 'Login' })
    }, 200)
  }
}
</script>

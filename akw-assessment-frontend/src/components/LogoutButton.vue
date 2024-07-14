<template>
  <button
    class="flex items-center gap-2 bg-red-500 text-white p-2 rounded-md"
    @click="logout"
    type="button"
  >
    <PhPower />
    <p>Logout</p>
  </button>
</template>
<script setup lang="ts">
import { PhPower } from '@phosphor-icons/vue'
import { useUserStore } from '@/stores/userStore'
</script>
<script lang="ts">
export default {
  methods: {
    logout() {
      const userStore = useUserStore()
      userStore.removeUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

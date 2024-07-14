<template>
  <header class="flex gap-4 p-5 items-center justify-between">
    <nav class="flex gap-4">
      <template v-if="!userStore.isLoggedIn">
        <RouterLink to="/signup">Signup</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/admin/login">Admin</RouterLink>
      </template>
      <template v-else-if="userStore.isLoggedIn && !userStore.isAdmin">
        <RouterLink to="/">My Photos</RouterLink>
      </template>
      <template v-else-if="userStore.isLoggedIn && userStore.isAdmin">
        <RouterLink to="/admin">Admin Dashboard</RouterLink>
      </template>
    </nav>
    <div v-if="userStore.isLoggedIn && userStore.user.fullName" class="flex gap-2 items-center">
      <p>{{ userStore.user.fullName }}</p>
      <LogoutButton />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { RouterLink } from 'vue-router'
import LogoutButton from './LogoutButton.vue'
const userStore = useUserStore()
</script>

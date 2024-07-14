<template>
  <main class="flex flex-col h-screen gap-5 p-5">
    <!-- <pre>{{ JSON.stringify(users, null, 2) }}</pre> -->
    <div class="w-full flex justify-between">
      <h1 class="text-4xl font-semibold">Users</h1>
      <button
        class="text-white bg-slate-900 hover:bg-white hover:text-slate-900 hover:border-2 p-2 rounded-md"
        type="button"
        @click="fetchUsers"
      >
        <PhArrowsClockwise size="24" />
      </button>
    </div>
    <template v-if="users.length > 0">
      <div
        class="bg-slate-900 text-white sticky top-1 p-4 border-2 rounded-md grid grid-cols-8 items-center justify-center place-items-center"
      >
        <p class="col-span-2">Email</p>
        <p>FullName</p>
        <p>Can Edit</p>
        <p>Can Delete</p>
        <p>Can View All Photos</p>

        <!-- <button>Update</button> -->
      </div>
      <UserItem v-for="user in users" :key="user.id" :user="user" />
    </template>
  </main>
</template>

<script setup lang="ts">
import useFetch from '@/services/api'
import UserItem from '@/components/UserItem.vue'
import type { User } from '@/stores/userStore'
import { PhArrowsClockwise } from '@phosphor-icons/vue'
</script>
<script lang="ts">
export default {
  data() {
    return {
      users: [
        {
          createdAt: '',
          updatedAt: '',
          canDelete: false,
          canEdit: false,
          canViewAll: false,
          email: '',
          fullName: '',
          id: 0
        }
      ]
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      const data: User[] = await useFetch('users')
      console.log(data)
      this.users = data
    }
  }
}
</script>

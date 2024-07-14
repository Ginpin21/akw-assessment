<template>
  <form
    class="p-4 grid grid-cols-8 w-full items-center justify-center place-items-center rounded-md border-2"
  >
    <p class="col-span-2">{{ user.email }}</p>
    <p>{{ user.fullName }}</p>
    <input type="checkbox" name="admin" v-model="currentUser.canEdit" value="false" />
    <input type="checkbox" name="admin" v-model="currentUser.canDelete" />
    <input type="checkbox" name="admin" v-model="currentUser.canViewAll" />
    <button
      class="p-2 rounded-md w-full bg-slate-900 hover:bg-slate-500 text-white"
      @click="updateUser"
      type="button"
    >
      Update
    </button>
  </form>
</template>
<script setup lang="ts">
import type { User } from '@/stores/userStore'
import type { PropType } from 'vue'
import useFetch from '@/services/api'
</script>
<script lang="ts">
export default {
  data() {
    return {
      currentUser: this.user
    }
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  methods: {
    async updateUser() {
      const formData = {
        userId: this.user.id,
        canEdit: this.currentUser.canEdit,
        canDelete: this.currentUser.canDelete,
        canViewAll: this.currentUser.canViewAll
      }
      const data = await useFetch('auth/admin/edit-permissions', {
        method: 'PATCH',
        body: formData
      })
      console.log(data)
    }
  }
}
</script>

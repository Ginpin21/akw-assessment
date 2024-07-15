<template>
  <div class="p-2 border-2 rounded-md grid grid-cols-5 items-center">
    <div class="h-32 w-32">
      <img :src="imageURL" alt="" class="object-cover h-full w-full rounded-md" />
    </div>
    <p class="text-lg">{{ imageName }}</p>
    <p class="">{{ new Date(createdAt).toUTCString() }}</p>
    <p class="">{{ new Date(updatedAt).toUTCString() }}</p>
    <div v-if="userId && userId === userStore.user.id" class="flex flex-col items-center justify-between gap-2">
      <EditPhotoModal v-if="canEdit" :id="id" :imageName="imageName" :imageURL="imageURL" />
      <button
        v-if="canDelete"
        class="text-white bg-slate-900 hover:bg-white hover:text-slate-900 hover:border-2 p-2 rounded-md"
        type="button"
        @click="deletePhoto"
      >
        <PhTrash size="24" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PhTrash, PhPencil } from '@phosphor-icons/vue'
import useFetch from '@/services/api'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
import EditPhotoModal from './EditPhotoModal.vue'
const userStore = useUserStore()
</script>
<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    userId: {
      type: Number
    },
    imageURL: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    updatedAt: {
      type: String,
      required: true
    },
    canDelete: {
      type: Boolean,
      required: true
    },
    canEdit: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async deletePhoto() {
      const response = await useFetch(`photos/${this.id}`, { method: 'DELETE' })
      console.log(response)
      router.go(0)
    }
  }
}
</script>

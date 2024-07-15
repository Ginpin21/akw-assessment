<template>
  <main class="flex flex-col h-screen p-5 gap-5">
    <!-- <pre>{{ JSON.stringify(data, null, 2) }}</pre> -->
    <h1 class="text-4xl font-semibold">My Images</h1>
    <div class="w-full flex justify-between">
      <ImageUploader />
      <div v-if="userStore.user.canViewAll" class="rounded-md border-2 flex items-center">
        <button
          :class="[showAll ? 'bg-slate-900 text-white' : 'text-slate-900', 'p-2 rounded-l-md']"
          type="button"
          @click="showAll = true"
        >
          All Photos
        </button>
        <button
          :class="[!showAll ? 'bg-slate-900 text-white' : 'text-slate-900', 'p-2 rounded-r-md']"
          type="button"
          @click="showAll = false"
        >
          My Photos
        </button>
      </div>
      <button
        class="text-white bg-slate-900 hover:bg-white hover:text-slate-900 hover:border-2 p-2 rounded-md"
        type="button"
        @click="fetchPhotos"
      >
        <PhArrowsClockwise size="24" />
      </button>
    </div>
    <div
      class="bg-slate-900 text-white sticky top-1 p-4 border-2 rounded-md grid grid-cols-5 items-center"
    >
      <p>Image</p>
      <p>Name</p>
      <p>Created on</p>
      <p>Updated on</p>
      <p></p>
    </div>
    <template v-if="data.length > 0">
      <PhotoEntry
        v-for="photo in filteredPhotos"
        :key="photo.id"
        :id="photo.id"
        :imageURL="photo.imageUrl"
        :imageName="photo.imageName"
        :createdAt="photo.createdAt"
        :updatedAt="photo.updatedAt"
        :canDelete="userStore.user.canDelete"
        :canEdit="userStore.user.canEdit"
        :userId="photo.user && photo.user?.id"
      />
    </template>
  </main>
</template>
<script setup lang="ts">
import useFetch from '@/services/api'
import { useUserStore } from '@/stores/userStore'
import PhotoEntry from '@/components/PhotoEntry.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import { PhArrowsClockwise } from '@phosphor-icons/vue'
const userStore = useUserStore()
</script>
<script lang="ts">
type Photo = {
  id: number
  imageUrl: string
  imageName: string
  createdAt: string
  updatedAt: string
  user?: {
    id?:number
  }
}
export default {
  data() {
    return {
      data: [
        {
          id: 0,
          imageUrl: '',
          imageName: '',
          createdAt: '',
          updatedAt: '',
        }
      ],
      showAll: true
    }
  },
  async created() {
    await this.fetchPhotos()
  },
  methods: {
    async fetchPhotos() {
      const userStore = useUserStore()

      const user = userStore.user
      if (user.canViewAll) {
        const data: Photo[] = await useFetch(`photos/all`)
        this.data = data
      } else {
        const data: Photo[] = await useFetch(`photos/${user.id}`)
        this.data = data
      }
    }
  },
  computed: {
    filteredPhotos() {
      const userStore = useUserStore()

      if (this.showAll) {
        return this.data
      } else {
        return this.data.filter((photo: any) => {
          return photo.user.id === userStore.user.id
        })
      }
    }
  }
}
</script>

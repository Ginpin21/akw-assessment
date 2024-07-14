<template>
  <div>
    <div
      v-if="modalIsOpen"
      class="h-screen w-full bg-black/50 fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
    >
      <form
        @submit.prevent="submitForm"
        class="p-5 rounded-md bg-white w-1/2 h-3/4 flex flex-col gap-5"
      >
        <div class="flex items-center justify-between w-full">
          <h2 class="text-3xl font-medium">Upload your Image</h2>
          <button @click="closeModal" type="button">
            <PhX size="24" />
          </button>
        </div>
        <div class="w-full h-3/4 border rounded-md overflow-hidden">
          <img
            v-if="previewImage"
            :src="previewImage"
            alt="Preview"
            class="w-full h-full object-contain rounded-md"
          />
        </div>
        <fieldset class="w-full flex">
          <label
            for="imageFile"
            class="w-full border-2 border-slate-900 p-3 rounded-md hover:cursor-pointer hover:bg-slate-900 hover:text-white"
          >
            <input
              type="file"
              class="hidden"
              name="imageFile"
              id="imageFile"
              @change="handleFileChange"
            />
            <p class="flex items-center gap-2"><PhUploadSimple weight="fill" size="16" />Upload</p>
          </label>
        </fieldset>
        <fieldset class="w-full">
          <input
            v-model="imageName"
            type="text"
            name="text"
            placeholder="Enter a name for your image..."
            id="text"
            class="border-2 border-slate-400 rounded-md p-2 focus-within:outline-none w-full"
          />
        </fieldset>
        <button class="p-4 rounded-md w-full bg-slate-900 hover:bg-slate-500 text-white">
          Submit
        </button>
      </form>
    </div>
    <button
      @click="openModal"
      type="button"
      class="flex items-center justify-between gap-2 p-2 rounded-md bg-white hover:bg-slate-900 hover:text-white text-slate-900 border-2 border-slate-900"
    >
      <PhPlus />
      <p>Upload a new Image</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { PhX, PhPlus, PhUploadSimple } from '@phosphor-icons/vue'
import { useUserStore } from '@/stores/userStore'
import useFetch from '@/services/api'
</script>

<script lang="ts">
export default {
  data() {
    return {
      modalIsOpen: false,
      imageFile: null as File | null,
      imageName: '',
      previewImage: ''
    }
  },
  methods: {
    openModal() {
      this.modalIsOpen = true
    },
    closeModal() {
      this.modalIsOpen = false
      this.resetForm()
    },
    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0] || null
      if (file) {
        this.imageFile = file
        this.previewImage = URL.createObjectURL(file)
      }
    },
    resetForm() {
      this.imageFile = null
      this.imageName = ''
      this.previewImage = ''
    },
    async submitForm() {
      if (!this.imageFile || !this.imageName) {
        alert('Please provide both an image and a name.')
        return
      }
      const userStore = useUserStore()
      const formData = new FormData()
      formData.append('photo', this.imageFile)
      formData.append('name', this.imageName)
      formData.append('userId', userStore.user.id.toString())
      console.log(formData.get('userId'))
      try {
        const data = await useFetch(
          'photos',
          {
            method: 'POST',
            body: formData
          },
          true
        )
        console.log(data)
        this.closeModal()
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('An error occurred while uploading the image.')
      }
    }
  }
}
</script>

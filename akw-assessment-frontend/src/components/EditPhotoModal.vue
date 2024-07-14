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
          <h2 class="text-3xl font-medium">Edit Image Title</h2>
          <button @click="closeModal" type="button">
            <PhX size="24" />
          </button>
        </div>
        <div class="w-full h-3/4 border rounded-md overflow-hidden">
          <img
            v-if="imageURL"
            :src="imageURL"
            alt="Preview"
            class="w-full h-full object-contain rounded-md"
          />
        </div>
        <fieldset class="w-full">
          <input
            v-model="name"
            type="text"
            name="text"
            placeholder="Enter a name for your image..."
            id="text"
            class="border-2 border-slate-400 rounded-md p-2 focus-within:outline-none w-full"
          />
        </fieldset>
        <button class="p-4 rounded-md w-full bg-slate-900 hover:bg-slate-500 text-white">
          Submit Edit
        </button>
      </form>
    </div>
    <button
      @click="openModal"
      class="text-white bg-slate-900 hover:bg-white hover:text-slate-900 hover:border-2 p-2 rounded-md"
      type="button"
    >
      <PhPencil size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { PhX, PhPencil } from '@phosphor-icons/vue'
import useFetch from '@/services/api'
</script>

<script lang="ts">
export default {
  data() {
    return {
      modalIsOpen: false,
      name: this.imageName
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    imageName: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    }
  },
  methods: {
    openModal() {
      this.modalIsOpen = true
    },
    closeModal() {
      this.modalIsOpen = false
    },
    async submitForm() {
      if (this.name !== '' && this.name !== null) {
        const data = await useFetch(`photos/${this.id}`, {
          method: 'PATCH',
          body: {
            name: this.name
          }
        })
        this.closeModal()
        console.log(data)
      }
    }
  }
}
</script>

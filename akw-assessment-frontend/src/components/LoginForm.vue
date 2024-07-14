<template>
  <form
    class="flex flex-col gap-5 p-5 border-2 border-slate-900 rounded-md w-1/3"
    @submit.prevent="login"
  >
    <h2 v-if="adminForm" class="text-center text-3xl font-medium">Admin Login</h2>
    <h2 v-else class="text-center text-3xl font-medium">Login</h2>
    <fieldset class="flex flex-col gap-2">
      <label for="email">Email Address</label>
      <input
        type="email"
        name="email"
        v-model="email"
        id="email"
        class="border-2 border-slate-400 rounded-md p-2 focus-within:outline-none"
      />
      <p class="text-red-500">{{ errors.email }}</p>
    </fieldset>
    <fieldset class="flex flex-col gap-2">
      <label for="password">Password</label>
      <fieldset class="flex border-2 border-slate-400 rounded-md p-2 focus-within:outline-none">
        <input
          :type="showPassword ? 'text' : 'password'"
          name="password"
          v-model="password"
          id="password"
          class="rounded-md focus-within:outline-none w-full"
        />
        <button class="flex items-center" @click="showPassword = !showPassword" type="button">
          <PhEye v-if="!showPassword" weight="fill" />
          <PhEyeSlash v-else weight="fill" />
        </button>
      </fieldset>
      <p class="text-red-500">{{ errors.password }}</p>
    </fieldset>

    <button class="p-4 rounded-md w-full bg-slate-900 hover:bg-slate-500 text-white">Login</button>
  </form>
  <!-- <pre>
    {{ JSON.stringify({ fullName, email, password, confirmPassword }, null, 2) }}
  </pre> -->
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errors: {
        email: '',
        password: ''
      }
    }
  },
  props: {
    adminForm: {
      type: Boolean
    }
  },
  methods: {
    async login() {
      const validPassword = this.password.length > 0
      const validEmail = this.validateEmail()
      const newUserData = { email: this.email, password: this.password }

      if (validPassword && validEmail) {
        this.clearErrors()
        const url = this.adminForm ? 'auth/admin/login' : 'auth/login'
        const data = await useFetch(url, { method: 'POST', body: newUserData })
        console.log(data)
        const userStore = useUserStore()

        if (data.user) {
          userStore.setUser(data.user)
          router.push({ name: 'home' })
        }
        if (data.admin) {
          userStore.setAdmin(data.admin)
          router.push({ name: 'home' })
        }
      } else {
        if (!validEmail) {
          this.errors.email = 'Email is not valid'
        }
      }
    },

    validateEmail() {
      if (this.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        return true
      } else {
        return false
      }
    },
    clearErrors() {
      this.errors = { email: '', password: '' }
    }
  }
}
</script>

<script setup lang="ts">
import { PhEye, PhEyeSlash } from '@phosphor-icons/vue'
import useFetch from '@/services/api'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
</script>

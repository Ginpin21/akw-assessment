<template>
  <form
    class="flex flex-col gap-5 p-5 border-2 border-slate-900 rounded-md w-1/3"
    @submit.prevent="signUp"
  >
    <h2 class="text-center text-3xl font-medium">Sign Up</h2>
    <fieldset class="flex flex-col gap-2">
      <label for="name">Full Name</label>
      <input
        type="text"
        name="name"
        v-model="fullName"
        id="name"
        class="border-2 border-slate-400 rounded-md p-2 focus-within:outline-none"
      />
      <p class="text-red-500">{{ errors.fullName }}</p>
    </fieldset>
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
    <fieldset class="flex flex-col gap-2">
      <label for="confirmPassword">Confirm Password</label>
      <fieldset class="flex border-2 border-slate-400 rounded-md p-2 focus-within:outline-none">
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          name="confirmPassword"
          v-model="confirmPassword"
          id="confirmPassword"
          class="rounded-md focus-within:outline-none w-full"
        />
        <button
          class="flex items-center"
          @click="showConfirmPassword = !showConfirmPassword"
          type="button"
        >
          <PhEye v-if="!showConfirmPassword" weight="fill" />
          <PhEyeSlash v-else weight="fill" />
        </button>
      </fieldset>
      <p class="text-red-500">{{ errors.confirmPassword }}</p>
    </fieldset>
    <button class="p-4 rounded-md w-full bg-slate-900 hover:bg-slate-500 text-white">
      Sign Up
    </button>
  </form>
  <!-- <pre>
    {{ JSON.stringify({ fullName, email, password, confirmPassword }, null, 2) }}
  </pre> -->
</template>

<script lang="ts">
export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      errors: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    async signUp() {
      const validPassword = this.validatePassword()
      const validEmail = this.validateEmail()
      const validName = this.fullName !== '' && this.fullName.length > 3
      const newUserData = { fullName: this.fullName, email: this.email, password: this.password }

      if (validPassword && validEmail && validName) {
        this.clearErrors()
        const data = await useFetch('auth/register', { method: 'POST', body: newUserData })
        console.log(data)
      } else {
        if (!validPassword) {
          this.errors.confirmPassword = 'Passwords do not match'
        }
        if (!validEmail) {
          this.errors.email = 'Email is not valid'
        }
        if (!validName) {
          this.errors.fullName = 'Name is not valid'
        }
      }
    },
    validatePassword() {
      if (
        this.password !== this.confirmPassword ||
        this.confirmPassword === '' ||
        this.password === ''
      ) {
        return false
      } else {
        return true
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
      this.errors = { fullName: '', email: '', password: '', confirmPassword: '' }
    }
  }
}
</script>

<script setup lang="ts">
import { PhEye, PhEyeSlash } from '@phosphor-icons/vue'
import useFetch from '@/services/api'
</script>

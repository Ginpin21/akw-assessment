import { defineStore } from 'pinia'

export type User = {
  createdAt: string
  updatedAt: string
  canDelete: boolean
  canEdit: boolean
  canViewAll: boolean
  email: string
  fullName: string
  id: number
}
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        createdAt: '',
        updatedAt: '',
        canDelete: false,
        canEdit: false,
        canViewAll: false,
        email: '',
        fullName: '',
        id: 0
      },
      isLoggedIn: false,
      isAdmin: false
    }
  },
  getters: {},
  actions: {
    setUser(user: User) {
      this.user = user
      this.isLoggedIn = true
    },
    setAdmin(user: User) {
      this.user = user
      this.isLoggedIn = true
      this.isAdmin = true
    },
    removeUser() {
      this.user = {
        createdAt: '',
        updatedAt: '',
        canDelete: false,
        canEdit: false,
        canViewAll: false,
        email: '',
        fullName: '',
        id: 0
      }
      this.isLoggedIn = false
      this.isAdmin = false
    }
  }
})

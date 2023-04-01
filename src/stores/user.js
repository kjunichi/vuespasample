import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(0)
  function saveToken(token) {
    user.value = token
  }

  return { user, saveToken }
})

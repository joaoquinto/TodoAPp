import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import SunIcon from '@/components/icons/SunIcon.vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = reactive({
    types: ['light', 'dark'],
    inUse: ''
  })
  const body = document.querySelector('body')
  const whichThemeInUse = computed(() => (theme.inUse === theme.types[1] ? 'dark' : ''))
  const handleIconTheme = computed(() => (theme.inUse === theme.types[0] ? MoonIcon : SunIcon))

  function setTheme() {
    body.classList.toggle('dark')
    if (theme.inUse === theme.types[0]) {
      theme.inUse = theme.types[1]
      setThemeInLocalStore(theme.inUse)
      return
    }
    theme.inUse = theme.types[0]
    setThemeInLocalStore(theme.inUse)
  }

  function setThemeInLocalStore(theme) {
    localStorage.setItem('theme', theme)
  }

  function loadThemeByPreferences() {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const storageTheme = localStorage.getItem('theme')

    if (storageTheme) {
      theme.inUse = storageTheme
      if (storageTheme === 'dark') {
        body.classList.add('dark')
      }
      return
    }

    if (!prefersDarkTheme.matches) {
      theme.inUse = theme.types[0]
      setThemeInLocalStore(theme.inUse)
      return
    }

    theme.inUse = theme.types[1]
    setThemeInLocalStore(theme.inUse)
    body.classList.add('dark')
  }

  return {
    theme,
    loadThemeByPreferences,
    whichThemeInUse,
    handleIconTheme,
    setTheme
  }
})

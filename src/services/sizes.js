import { reactive } from '@vue/reactivity'

export const sizes = reactive({
  width: window.innerWidth,
  height: window.innerHeight
})

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
})

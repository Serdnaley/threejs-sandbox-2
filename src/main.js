import { reactive } from '@vue/reactivity'
import { GUI } from 'dat.gui'
import { App } from './components/App'

const ctx = reactive({
  gui: new GUI(),
  container: document.querySelector( '#app' ),
  canvas: document.querySelector('#app canvas')
})

global.ctx = ctx

const app = ctx.app = new App()

const loop = () => {
  app.render()
  requestAnimationFrame(loop)
}
loop()

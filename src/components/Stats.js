import StatsModule from 'three/examples/jsm/libs/stats.module.js';

export class Stats extends StatsModule {
  constructor () {
    super()
    ctx.container.appendChild(this.dom)

    this.render = this.update
  }
}

(function c(g) {
  // add a fixed container in the body
  const container = document.createElement('div')
  container.style = `
  position: absolute;
  width: 400px;
  top: 0;
  left: 50%;
  margin-left: -200px;
 `
  document.body.appendChild(container)
  function Flash(message, duration) {
    this.message = message
    this.duration = duration || 1500
    const element = document.createElement('div')
    // TODO: add style
    element.innerText = this.message
    this.element = element
  }

  Flash.prototype.present = function present() {
    container.appendChild(this.element)
    setTimeout(() => {
      container.removeChild(this.element)
    }, this.duration)
  }

  // eslint-disable-next-line no-param-reassign
  g.Flash = Flash
}(this || window || global))

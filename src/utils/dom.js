export function registerJQuery() {
  window.$ = window.jQuery = (...args) => new jQuery(...args)
}

const jQuery = class jQuery {
  constructor(selector) {
    this.selector = selector
    this.el = selector.includes('<')
      ? document.createElement(selector.match(/<([\w\d]+?)>/)[1])
      : document.querySelector(selector)
    this.bindEvent = {}
  }

  bind(eventName, eventHandler, flag = false) {
    this.el.addEventListener(eventName, eventHandler, flag)
    this.bindEvent[eventName] = eventHandler
    return this
  }

  unbind(eventName) {
    const handler = this.bindEvent[eventName]
    if (handler) {
      this.el.removeEventListener(eventName, handler)
      delete this.bindEvent[eventName]
    }
    return this
  }

  destory() {
    this.el.remove()
  }

  styles(styleObj) {
    Object.entries(styleObj).forEach(([k, v]) => this.el.style[k] = v)
    return this
  }

  attrs(attributeObj) {
    Object.entries(attributeObj).forEach(([k, v]) => this.el[k] = v)
    return this
  }

  appendTo(hostElement) {
    const hostDocElement = hostElement instanceof jQuery
      ? hostElement.el
      : hostElement
    hostDocElement.appendChild(this.el)

    return this
  }

  owns(obj) {
    Object.entries(obj).forEach(([k, v]) => this.owns[k] = v)
    return this
  }
}
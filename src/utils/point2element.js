export default class Point2Element {
  constructor() {
    this.elements = []
    this.elementsCount = []
  }

  _point2elementAndSave(element) {
    const index = this.elements.findIndex(item => item === element)
    if (index !== -1) {
      (this.elementsCount[index])++
    } else {
      const lastIndex = this.elements.push(element) - 1
      this.elementsCount[lastIndex] = 1
    }
  }

  _findParentUtilBody(ele, callback) {
    while (ele.tagName !== 'BODY') {
      callback(ele)
      ele = ele.parentNode
    }
  }

  getMaxCount(array) {
    return Math.max.apply(null, array)
  }

  getSuitableElement() {
    const max = this.getMaxCount(this.elementsCount)
    const suitableIndex = this.elementsCount.findIndex(count => count === max)
    return this.elements[suitableIndex]
  }

  getElement(points) {
    points.forEach(point => {
      const element = document.elementFromPoint(point[0], point[1])
      this._findParentUtilBody(element, (currentEle) => {
        this._point2elementAndSave(currentEle)
      })
    })
    
    return this.getSuitableElement()
  }
}
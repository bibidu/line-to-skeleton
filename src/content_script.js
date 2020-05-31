import { registerJQuery } from './utils/dom'
import { listenPopup } from './utils/message'
import { CREATE_CANVAS, GET_SKELETON_ELEMENTS } from './utils/constants'
import Draw from './utils/draw'
import domConfig from './utils/domConfig'
import Point2Element from './utils/point2element'

let globalCanvas = null // globalCanvas
let drawer //  画笔实例
const elementPoints = [] // 骨架元素点阵数组

registerJQuery() // 注册jQuery

// 监听来自popup的消息
listenPopup(({msg, callback}) => {
  if (msg === CREATE_CANVAS) {
    initCanvas()
  }
  if (msg === GET_SKELETON_ELEMENTS) {
    renderSkeleton()
  }
})

// 初始化canvas 相关
const initCanvas = () => {
  // 创建canvas节点、绑定事件
  const { styles, ...attrs } = domConfig.canvas
  globalCanvas =
    $('<canvas></canvas>')
    .attrs(attrs)
    .styles(styles)
    .appendTo($('body'))
    .bind('mousedown', onCanvasMouseDown)
    .owns(attrs)
  
  // 添加画笔
  drawer = new Draw(globalCanvas.el.getContext('2d'))
}

// canvas mousedown 事件
function onCanvasMouseDown(event) {
  const { clientX, clientY } = event

  drawer.line(clientX, clientY)
  ;(globalCanvas.mouse = (globalCanvas.mouse || [])).push([clientX, clientY])
  globalCanvas.bind('mousemove', onCanvasMouseMove)
  globalCanvas.bind('mouseup', onCanvasMouseUp)
}

// canvas mousemove 事件
function onCanvasMouseMove(event) {
  // 越界判断
  const isCrossBorder = (x, y) => (
    (x >= globalCanvas.owns.width || x === 0) ||
    (y >= globalCanvas.owns.height || y === 0)
  )
  const { clientX, clientY } = event

  if (isCrossBorder(clientX, clientY)) {
    return cancelCanvasEventListen()
  }

  drawer.line(clientX, clientY)
  ;(globalCanvas.mouse = (globalCanvas.mouse || [])).push([clientX, clientY])
}

// canvas mouseup 事件
function onCanvasMouseUp() {
  cancelCanvasEventListen()
}

// 解除globalCanvas事件监听
function cancelCanvasEventListen() {
  globalCanvas
    .unbind('mousemove')
    .unbind('mouseup')
  // 标记出路径上的dom
  const points = globalCanvas.mouse
  globalCanvas.mouse = null

  elementPoints.push(points)
}

function renderSkeleton() {
  globalCanvas.destory()
  elementPoints.forEach(points => {
    const point2elementIns = new Point2Element()
    const element = point2elementIns.getElement(points)
    const skeStyles = domConfig.skeleton.styles
    Object.entries(skeStyles).forEach(([k, v]) => element.style[k] = v)
  })
}

import { registerJQuery } from './utils/dom'
import { toggleButtonSelector, renderButtonSelector } from './utils/selectors'
import { sendToContentScript } from './utils/message'
import { CREATE_CANVAS, GET_SKELETON_ELEMENTS } from './utils/constants'

registerJQuery()

$(toggleButtonSelector)
  .bind('click', () => {
    sendToContentScript(CREATE_CANVAS)
  })

$(renderButtonSelector)
  .bind('click', () => {
    sendToContentScript(GET_SKELETON_ELEMENTS)
  })
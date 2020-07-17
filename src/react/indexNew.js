import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import New from './new.component.js'

const domElementGetter = () => {
  let el = document.getElementById('react-new')
  if (!el) {
    el = document.createElement('div')
    el.id = 'react-new'
    document.body.appendChild(el)
  }

  return el
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: New,
  domElementGetter,
})

export const bootstrap = props => reactLifecycles.bootstrap(props)

export const mount = props => reactLifecycles.mount(props)

export const unmount = props => reactLifecycles.unmount(props)

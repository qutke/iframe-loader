let childFrame, parentScreen
let propsConfig = {}
let config = {}

const addListener = (eve, callback) => {
  if (window.addEventListener) {
    window.addEventListener(eve, callback, false)
  } else {
    window.attachEvent(`on${eve}`, callback)
  }
}

const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

const addStyle = (obj, style) => {
  for (let key in style) {
    obj.style[key] = style[key]
  }
}

const createIframe = (config, callback) => {
  if (childFrame) {
    return
  }
  childFrame = document.createElement('iframe')
  childFrame.src = config.src
  if (config.class) {
    childFrame.class = config.class
  }
  addStyle(childFrame, config.style)
  if (isString(config.renderTo)) {
    config.renderTo = document.getElementById(config.renderTo)
  }
  config.renderTo.appendChild(childFrame)
  // @todo 这里跨域的时候应该有问题
  if (childFrame.attachEvent) {
    childFrame.attachEvent('onload', callback)
  } else {
    childFrame.onload = callback
  }
}

function ParentMessage () {
  let timer
  const setHeight = (height) => {
    window.top.postMessage({
      code: 2,
      height: height
    }, '*')
  }
  const toFull = () => {
    window.top.postMessage({
      code: 3
    }, '*')
  }
  const unFull = () => {
    window.top.postMessage({
      code: 4
    }, '*')
  }
  this.full = () => {
    if (timer) {
      clearInterval(timer)
    }
    toFull()
  }
  this.auto = (full) => {
    if (timer) {
      clearInterval(timer)
    }
    let oldHeight = document.body.clientHeight
    timer = setInterval(() => {
      let newHeight = document.body.clientHeight
      if (newHeight !== oldHeight || full) {
        if (full) {
          unFull()
        }
        full = false
        oldHeight = document.body.clientHeight
        setHeight(oldHeight + 20)
      }
    }, 100)
  }
}

let [... [script]] = document.scripts
const oldTypes = {1: 'hello', 2: 'setHeight', 3: 'toFull', 4: 'unFull'}
const scriptConfig = script.attributes['config']
const defaultConfig = {
  src: 'https://realtime.qutke.com/info/559cc1f3310a3c46405c6f1d', // iframe地址
  style: {width: '800px', height: '600px', border: 0, padding: 0, margin: 0}, // iframe样式
  action: {
    toFull: (data) => {
      addStyle(childFrame, {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': 100000,
        'min-height': `${document.documentElement.clientHeight - 5}px`
      })
    },
    unFull: (data) => {
      addStyle(childFrame, {
        width: '100%',
        position: 'relative',
        top: '',
        left: '',
        'z-index': '',
        'min-height': ''
      })
    },
    setHeight: (data) => {
      addStyle(childFrame, {height: data.height + 'px'})
    },
    hello: (data) => {
      console.log('connected!')
    }
  }, // iframe监听的事件
  renderTo: script.parentElement, // iframe父元素
  id: 'QutkeIframe', // iframe的id
  type: 'parent'
}
if (scriptConfig) {
  try {
    propsConfig = JSON.parse(scriptConfig.value)
  } catch (e) {
    console.log('config iframe error.')
  }
}

config = Object.assign({}, defaultConfig, propsConfig)

if (config.type === 'parent') {
  createIframe(config, () => {
    childFrame.contentWindow.postMessage('hello', '*') // 兼容马鹏的项目代码<_<
    addListener('message', (e) => {
      let code = e.data.code
      let action = config.action[oldTypes[code]]
      if (action) {
        action(e.data)
      }
    })
  })
} else {
  parentScreen = new ParentMessage()
  parentScreen.auto()
}

module.exports = parentScreen

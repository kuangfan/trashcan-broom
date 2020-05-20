const TraceKit = window.TraceKit
const errors = []

let isReporting = false

window.onerror = function onError (message, source, row, col) {
  const err = {
    message,
    source,
    row,
    col
  }
  handleError(err)
}

window.onunhandledrejection = (err) => {
  const err = {
    message: err.reason,
    source: 'async',
    row: '',
    col: ''
  }
  handleError(err)
}

function handleError (err) {
  errors.push(err)
  reportError()
}

function reportError () {
  if (isReporting) {
     return
  }
  isReporting = true
  requestIdleCallback(reportErrorCallback)
}

function reportErrorCallback (deadline) {
  isReporting = false
  while (deadline.timeRemaining() > 0 && datas.length > 0) {
    const data = datas.pop()
    // 数据上报
    $.get('http://localhost:5555', data)
  }
  if (datas.length) {
    reportError()
  }
}

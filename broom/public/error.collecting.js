const TraceKit = window.TraceKit
const errors = []

let isReporting = false

window.onerror = function onError (message, source, row, col) {
  handleError({
    message,
    source,
    row,
    col
  })
}

// window.onunhandledrejection = (err) => {
//   handleError({
//     message: err.reason,
//     source: 'async',
//     row: '',
//     col: ''
//   })
// }

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
  while (deadline.timeRemaining() > 0 && errors.length > 0) {
    const data = errors.pop()
    // 数据上报
    $.post('http://localhost:5555/sm', data)
  }
  if (errors.length) {
    reportError()
  }
}

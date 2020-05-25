const TraceKit = window.TraceKit
const errors = []
let isReporting = false

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
    $.post('http://localhost:5555/sm', data)
  }
  if (errors.length) {
    reportError()
  }
}

TraceKit.report.subscribe(function (errorReport) {
  handleError(errorReport)
})

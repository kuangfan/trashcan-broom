const errorButton = document.getElementById('error-button')
const promiseErrorButton = document.getElementById('promise-error-button')

function createdError () {
  const a = {}
  a.b()
}

function createdPromiseError () {
  new Promise((resolve, reject) => {
    reject('异步错误')
  })
}

errorButton.addEventListener('click', createdError)
promiseErrorButton.addEventListener('click', createdPromiseError)

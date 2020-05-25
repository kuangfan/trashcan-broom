import {
  createdError,
  createdAsyncError
} from './lib'

const errorButton = document.getElementById('error-button')
const asyncErrorButton = document.getElementById('async-error-button')

errorButton.addEventListener('click', createdError)
asyncErrorButton.addEventListener('click', createdAsyncError)

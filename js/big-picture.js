import {photos} from './main.js'
import {createAllElements} from './pictures.js'

const picturesContainer = document.querySelector('.pictures')
const closeBtn = document.querySelector('.big-picture__cancel')
const commentsContainer = document.querySelector('.social__comments')
let currentComments = []
let commentsCounter = 5

function closeBigPicture() {
  document.querySelector('.big-picture').classList.add('hidden')
  document.querySelector('body').classList.remove('modal-open')
  commentsCounter = 5
}

function sliceArray(array, count) {
  document.querySelector('.social__comments').innerHTML = ''
  return array.slice(0, count)
}

function addComment(comment) {
  const commentClone = document.querySelector('#social__comment').content.cloneNode(true)

  commentClone.querySelector('.social__picture').src = comment.avatar
  commentClone.querySelector('.social__author').textContent = comment.name
  commentClone.querySelector('.social__text').textContent = comment.message

  return commentClone
}


function openBigPicture(event, commentsList) {
  const closestPicture = event.target.closest('.picture')

  if (closestPicture) {
    const dataId = +closestPicture.dataset.id
    const pictureData = photos.find(element => element.id === dataId)

    currentComments = pictureData.comments

    document.querySelector('.big-picture').classList.remove('hidden')
    document.querySelector('.social__comment-count').classList.add('hidden')
    document.querySelector('body').classList.add('modal-open')
    document.querySelector('.big-picture__img').querySelector('img').src = pictureData.url
    document.querySelector('.likes-count').textContent = pictureData.likes
    document.querySelector('.comments-count').textContent = pictureData.comments.length
    document.querySelector('.social__caption').textContent = pictureData.descriptions

    createAllElements(commentsList, sliceArray(currentComments, currentComments.length), addComment)
  }
}

picturesContainer.addEventListener('click', (event) => {
  openBigPicture(event, commentsContainer)
})

closeBtn.addEventListener('click', closeBigPicture)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture()
  }
})

import {createAllElements} from './pictures.js'

let commentsCount = 5
let pictureData
const commentsContainer = document.querySelector('.social__comments')


function sliceArray(array, count) {
  const arrayStartId = 0
  return array.slice(arrayStartId, count)
}

function clearElementContent(elementClass) {
  document.querySelector(`.${elementClass}`).innerHTML = ''
}

function arrayLengthCounter(step, array) {
  if (commentsCount + step < array.length) {
    commentsCount += step
  } else if (commentsCount + step >= array.length) {
    commentsCount = array.length
  }
}

function hideAndDisplayCommentsLoaderBtn(commentsArray, count) {
  const loadCommentsBtn = document.querySelector('.social__comments-loader')
  if (count >= commentsArray.length) {
    loadCommentsBtn.classList.add('hidden')
  } else loadCommentsBtn.classList.remove('hidden')
}

function addComment(comment) {
  const commentClone = document.querySelector('#social__comment').content.cloneNode(true)

  commentClone.querySelector('.social__picture').src = comment.avatar
  commentClone.querySelector('.social__author').textContent = comment.name
  commentClone.querySelector('.social__text').textContent = comment.message

  return commentClone
}

function closeBigPicture() {
  document.querySelector('.big-picture').classList.add('hidden')
  document.body.classList.remove('modal-open')
  commentsCount = 5
  clearElementContent('social__comments')
  document.querySelector('.social__comments-loader').removeEventListener('click', loadComments)

}

function loadComments() {
  const step = 5

  arrayLengthCounter(step, pictureData.comments)

  const currentComments = sliceArray(pictureData.comments, commentsCount)

  document.querySelector('.comments-shown').textContent = currentComments.length

  clearElementContent('social__comments')
  hideAndDisplayCommentsLoaderBtn(pictureData.comments, commentsCount)
  createAllElements(commentsContainer, currentComments, addComment)
}

function openBigPicture(event, commentsList, arrayOfPhotos) {
  const closestPicture = event.target.closest('.picture')

  if (closestPicture) {
    const dataId = +closestPicture.dataset.id
    pictureData = arrayOfPhotos.find(element => element.id === dataId)
    const currentComments = sliceArray(pictureData.comments, commentsCount)

    document.querySelector('.big-picture').classList.remove('hidden')
    document.querySelector('body').classList.add('modal-open')
    document.querySelector('.big-picture__img').querySelector('img').src = pictureData.url
    document.querySelector('.likes-count').textContent = pictureData.likes
    document.querySelector('.comments-count').textContent = pictureData.comments.length
    document.querySelector('.social__caption').textContent = pictureData.descriptions
    document.querySelector('.comments-shown').textContent = currentComments.length
    document.querySelector('.big-picture__img').style.transform = pictureData.metadata.transform
    document.querySelector('.big-picture__img').style.filter = pictureData.metadata.filter

    hideAndDisplayCommentsLoaderBtn(pictureData.comments, commentsCount)
    createAllElements(commentsList, currentComments, addComment)

    document.querySelector('.social__comments-loader').addEventListener('click', loadComments)
  }
}

export {closeBigPicture, openBigPicture}

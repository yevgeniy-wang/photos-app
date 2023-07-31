import {photos} from "./main.js";

const picturesContainer = document.querySelector('.pictures')

function createPictureElement(pictureUrl, commentsAmount, likesAmount) {
  const clone = document.querySelector('#picture').content.cloneNode(true)
  const picture = clone.querySelector('.picture__img')
  const comments = clone.querySelector('.picture__comments')
  const likes = clone.querySelector('.picture__likes')

  picture.src = pictureUrl
  comments.textContent = commentsAmount
  likes.textContent = likesAmount

  return clone
}

function createAllPictureElements(container, picturesArray) {
  const fragment = document.createDocumentFragment()

  picturesArray.forEach(element => {
    fragment.append(createPictureElement(element.url, element.comments.length, element.likes))
  })

  container.append(fragment)
}

createAllPictureElements(picturesContainer, photos)

export {createAllPictureElements}

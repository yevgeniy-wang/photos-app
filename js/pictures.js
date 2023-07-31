import {photos} from "./main.js";

const picturesContainer = document.querySelector('.pictures')

function createPictureElement(pictureUrl, commentsAmount, likesAmount) {
  const clone = document.querySelector('#picture').content.cloneNode(true)

  clone.querySelector('.picture__img').src = pictureUrl
  clone.querySelector('.picture__comments').textContent = commentsAmount
  clone.querySelector('.picture__likes').textContent = likesAmount

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

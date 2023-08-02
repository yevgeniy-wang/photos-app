import {photos} from "./main.js";

const picturesContainer = document.querySelector('.pictures')

function createPictureElement(picture) {
  const clone = document.querySelector('#picture').content.cloneNode(true)

  clone.querySelector('.picture__img').src = picture.url
  clone.querySelector('.picture__comments').textContent = picture.comments.length
  clone.querySelector('.picture__likes').textContent = picture.likes
  clone.firstElementChild.setAttribute('data-id', picture.id)

  return clone
}

function createAllPictureElements(container, picturesArray) {
  const fragment = document.createDocumentFragment()

  picturesArray.forEach(element => {
    container.append(createPictureElement(element))
  })

  container.append(fragment)
}

createAllPictureElements(picturesContainer, photos)

export {createAllPictureElements}

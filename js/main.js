import {createAllElements, createPictureElement} from "./pictures.js";
import {closeBigPicture, openBigPicture} from "./big-picture.js";
import {openForm, closeForm, setMaxLength, handleEscButton, validateHashtags, openImage} from "./form.js"

const picturesContainer = document.querySelector('.pictures')
const commentsContainer = document.querySelector('.social__comments')


async function getRequest(url) {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (err) {
    document.querySelector('.response-error').classList.remove('hidden')
    document.querySelector('.response-error__message').textContent = err.message
  }
}

getRequest('http://localhost:3000/photos')
  .then(res => {
    createAllElements(picturesContainer, res, createPictureElement)

    picturesContainer.addEventListener('click', (event) => {
      openBigPicture(event, commentsContainer, res)
    })

    document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture)

    document.querySelector(' #upload-cancel').addEventListener('click', closeForm)
    document.querySelector('#upload-file').addEventListener('change', (evt) => {
      openForm()
      openImage(evt)
      setMaxLength('text__description', 140)
    })
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        handleEscButton()
      }
    })
  })
  .catch(err => {
    console.error(err.message)
  })

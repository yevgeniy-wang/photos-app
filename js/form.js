import {closeBigPicture} from "./big-picture.js";

function closeForm() {
  document.querySelector('.img-upload__overlay').classList.add('hidden')
  document.body.classList.remove('modal-open')
  document.querySelector('#upload-file').value = ''
}

function openForm() {
  document.querySelector('.img-upload__overlay').classList.remove('hidden')
  document.body.classList.add('modal-open')
}

function setMaxLength(inputClassName, maxLengthValue) {
  document.querySelector(`.${inputClassName}`).maxLength = maxLengthValue
}

function validateHashtags() {
  const hashtagField = document.querySelector('.text__hashtags')
  const hashtagsArray = hashtagField.value.split(' ')
  const uniqueHashtags = new Set(hashtagsArray.map(el => el.toLowerCase()))

  hashtagField.setCustomValidity('')

  hashtagsArray.forEach(hashtag => {
    if (hashtagField.value === ''){
      return
    }else if (hashtag[0] !== '#') {
      hashtagField.setCustomValidity('hashtag must start with #')
    } else if (!/^[A-Za-z0-9А-яЁё]*$/.test(hashtag.substring(1))) {
      hashtagField.setCustomValidity('hashtag must not contain special characters')
    } else if (hashtag.length < 2 || hashtag.length > 20) {
      hashtagField.setCustomValidity('hashtag length must be from 2 to 20 characters')
    }
  })

  if (uniqueHashtags.size !== hashtagsArray.length) {
    hashtagField.setCustomValidity('there must be duplicates')
  } else if (hashtagsArray.length > 5) {
    hashtagField.setCustomValidity('there must be no more then 5 hashtags')
  }

  hashtagField.reportValidity()
}

function handleEscButton() {
  const isFormOpen = document.querySelector('#upload-file').value
  const isActiveCommentsField = document.querySelector('.text__description') === document.activeElement
  const isActiveHashtagsField = document.querySelector('.text__hashtags') === document.activeElement

  if (isFormOpen && !isActiveCommentsField && !isActiveHashtagsField) {
    closeForm()
  } else if (!isFormOpen) {
    closeBigPicture()
  }
}

document.querySelector(' #upload-cancel').addEventListener('click', closeForm)
document.querySelector('#upload-file').addEventListener('change', () => {
  openForm()
  setMaxLength('text__description', 140)
})
document.querySelector('.img-upload__submit').addEventListener('click', (event) => {
  event.preventDefault()
  validateHashtags()
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    handleEscButton()
  }
})

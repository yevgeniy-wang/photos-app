import {closeBigPicture} from "./big-picture.js";

function percentsToFraction(percents) {
  return percents / 100
}

function scaleImage(image, value){
  image.style.transform = `scale(${percentsToFraction(value)})`
}

function setInputValue(input, value){
  input.value = `${value}%`
}

function scaleHandler(evt) {
  const isSmallerBtn = evt.target.classList.contains('scale__control--smaller')
  const isBiggerBtn = evt.target.classList.contains('scale__control--bigger')
  const image = document.querySelector('.img-upload__preview')
  const scaleInput = document.querySelector('.scale__control--value')
  const scaleInputValueWithoutPercents = scaleInput.value.substring(0, scaleInput.value.length - 1)
  const step = 25
  const scaleRange = {
    min: 25,
    max: 100
  }

  if (isSmallerBtn && scaleInputValueWithoutPercents > scaleRange.min) {
    scaleImage(image, scaleInputValueWithoutPercents - step)
    setInputValue(scaleInput, scaleInputValueWithoutPercents - step)
  } else if (isBiggerBtn && scaleInputValueWithoutPercents < scaleRange.max) {
    scaleImage(image, +scaleInputValueWithoutPercents + step)
    setInputValue(scaleInput, +scaleInputValueWithoutPercents + step)
  }
}

function closeSlider(slider){
  document.querySelector('.effect-level').classList.add('hidden')
  if (slider.noUiSlider){
    slider.noUiSlider.destroy()
  }
}

function sliderHandler(values, handle, image, filter, units) {
  const filterLvl = values[handle]

  document.querySelector('.effect-level__value').value = filterLvl
  image.style.filter = `${filter}(${filterLvl + units})`
}

function createSlider(slider, image, filterObj) {
  closeSlider(slider)
  document.querySelector('.effect-level').classList.remove('hidden')

  noUiSlider.create(slider, {
    start: filterObj.start,
    step: filterObj.step,
    connect: [true, false],
    tooltips: false,
    range: {
      'min': filterObj.rangeMin,
      'max': filterObj.rangeMax
    }
  });

  slider.noUiSlider.on('update', (values, handle) => {
    sliderHandler(values, handle, image, filterObj.filter, filterObj.units)
  });
}

function addEffect(image, effectClassName) {
  image.className = ''
  image.removeAttribute('style')
  if (effectClassName){
    image.classList.add(`effects__preview--${effectClassName}`)
  }
}

function effectsHandler(evt) {
  const image = document.querySelector('.img-upload__preview').querySelector('img')
  const slider = document.querySelector('#slider')

  const effects = {
    chrome: {
      start: 1,
      step: 0.1,
      rangeMin: 0,
      rangeMax: 1,
      filter: 'grayscale',
      units: ''
    },
    sepia: {
      start: 1,
      step: 0.1,
      rangeMin: 0,
      rangeMax: 1,
      filter: 'sepia',
      units: ''
    },
    marvin: {
      start: 100,
      step: 1,
      rangeMin: 0,
      rangeMax: 100,
      filter: 'invert',
      units: '%'
    },
    phobos: {
      start: 3,
      step: 0.1,
      rangeMin: 0,
      rangeMax: 3,
      filter: 'blur',
      units: 'px'
    },
    heat: {
      start: 3,
      step: 0.1,
      rangeMin: 1,
      rangeMax: 3,
      filter: 'brightness',
      units: ''
    }
  }
  switch (evt.target.value) {
    case 'chrome':
    case 'sepia':
    case 'marvin':
    case 'phobos':
    case 'heat':
      addEffect(image, evt.target.value)
      createSlider(slider, image, effects[evt.target.value])
      break
    default:
      closeSlider(slider)
      break
  }
}

function closeForm() {
  document.querySelector('.img-upload__overlay').classList.add('hidden')
  document.body.classList.remove('modal-open')
  document.querySelector('#upload-file').value = ''
  document.querySelector('.effects__list').removeEventListener('click', effectsHandler)
  document.querySelector('.img-upload__scale').removeEventListener('click', scaleHandler)
  scaleImage(document.querySelector('.img-upload__preview'), 100)
  addEffect(document.querySelector('.img-upload__preview').querySelector('img'))
}

function openForm() {
  document.querySelector('.img-upload__overlay').classList.remove('hidden')
  document.body.classList.add('modal-open')
  document.querySelector("input[name='effect']").checked = true

  closeSlider(document.querySelector('#slider'))

  document.querySelector('.effects__list').addEventListener('click', effectsHandler)
  document.querySelector('.img-upload__scale').addEventListener('click', scaleHandler)

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
    if (hashtagField.value === '') {
      return
    } else if (hashtag[0] !== '#') {
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

export {openForm, closeForm, setMaxLength, handleEscButton, validateHashtags}

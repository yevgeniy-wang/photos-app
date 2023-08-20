function createPictureElement(picture) {
  const clone = document.querySelector('#picture').content.cloneNode(true)

  clone.querySelector('.picture__img').src = picture.url
  clone.querySelector('.picture').setAttribute('data-id', picture.id)
  clone.querySelector('.picture__comments').textContent = picture.comments.length
  clone.querySelector('.picture__likes').textContent = picture.likes

  return clone
}

function createAllElements(container, picturesArray, callback) {
  const fragment = document.createDocumentFragment()

  picturesArray.forEach(element => {
    fragment.append(callback(element))
  })

  container.append(fragment)
}

export {createAllElements, createPictureElement}

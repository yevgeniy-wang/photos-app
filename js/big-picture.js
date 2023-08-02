import {photos} from './main.js'

const picturesContainer = document.querySelector('.pictures')
const closeBtn = document.querySelector('.big-picture__cancel')

function closeBigPicture() {
    document.querySelector('.big-picture').classList.add('hidden')
    document.querySelector('body').classList.remove('modal-open')
    document.querySelector('.social__comments').innerHTML = ''
}

function addComment(comment) {
    const commentClone = document.querySelector('#social__comment').content.cloneNode(true)

    commentClone.querySelector('.social__picture').src = comment.avatar
    commentClone.querySelector('.social__picture').alt = comment.name
    commentClone.querySelector('.social__text').textContent = comment.message

    return commentClone
}

function openBigPicture(event) {
    const isPicture = event.target.classList.contains('picture__img')
    const commentsContainer = document.querySelector('.social__comments')

    if (isPicture) {
        const dataId = +event.target.dataset.id
        const pictureData = photos.find(element => element.id === dataId)
        const fragment = document.createDocumentFragment()

        document.querySelector('.big-picture').classList.remove('hidden')
        document.querySelector('.social__comment-count').classList.add('hidden')
        document.querySelector('body').classList.add('modal-open')
        document.querySelector('.big-picture__img').firstChild.nextSibling.src = pictureData.url
        document.querySelector('.likes-count').textContent = pictureData.likes
        document.querySelector('.comments-count').textContent = pictureData.comments.length
        document.querySelector('.social__caption').textContent = pictureData.descriptions

        pictureData.comments.forEach(element => {
            fragment.append(addComment(element))
        })

        commentsContainer.append(fragment)
    }
}

picturesContainer.addEventListener('click', openBigPicture)
closeBtn.addEventListener('click', closeBigPicture)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape'){
        closeBigPicture()
    }
})



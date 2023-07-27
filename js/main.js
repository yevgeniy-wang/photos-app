function PhotoObject(element, id) {
  const descriptions = ['some random text', 'funny image', 'cool photo']
  const photo = {
    id: id + 1,
    url: `photos/${id + 1}.jpg`,
    descriptions: descriptions[getRandomInt(0, descriptions.length)],
    comments: new Array(getRandomInt(0, 6)).fill(null).map((element, id) => CommentObject('_', id))
  }
  return photo
}

function CommentObject(element, id) {
  const comments = [
    'Все відмінно!',
    'Загалом все непогано. Але не всі.',
    'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
    'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
    'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
    'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'
  ]
  const names = ['Олег', 'Андрей', 'Артем', 'Евгений', 'Максим', 'Анатолий', 'Дмитрий']

  const comment = {
    id: id + 1,
    avatar: `img/avatar-${getRandomInt(1, 7)}.svg`,
    message: comments[getRandomInt(0, comments.length)],
    name: names[getRandomInt(0, comments.length)]
  }

  return comment
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createArrayOfPhotos(arrayLength) {
  return new Array(arrayLength).fill(null).map((element, id) => PhotoObject('_', id))
}

const photos = createArrayOfPhotos(25)

console.log(photos)

export {photos}

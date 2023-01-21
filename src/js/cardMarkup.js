

const gallery = document.querySelector('.gallery');

export function renderGallery(images) {
  const markup = images
    .map(image => {
      const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
      return `<li class='gallery-item'>
    <a class='photo-card' href='${largeImageURL}'>
        <img src='${webformatURL}' data-source='${largeImageURL}' alt='${tags}' loading='lazy' />
        <div class='info'>
            <p class='info-item'>
                <b>Likes</b>${likes}
            </p>
            <p class='info-item'>
                <b>Views</b>${views}
            </p>
            <p class='info-item'>
                <b>Comments</b>${comments}
            </p>
            <p class='info-item'>
                <b>Downloads</b>${downloads}
            </p>
        </div>
    </a>
</li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
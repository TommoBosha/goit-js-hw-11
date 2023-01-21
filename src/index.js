
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs.js';
import { fetchImg, fetchImgOptions } from './js/fetchImages.js';
import { renderGallery } from './js/cardMarkup.js';



let hits = [];
let totalHits = 0;



const watcher = new IntersectionObserver(([lastCard], observer) => {
  lastCard.isIntersecting && hits.length !== totalHits ?
    (fetchImgOptions.page++, observer.unobserve(lastCard.target), createGallery()) : null
});

const createGallery = async () => {
  try {
    const response = await fetchImg(fetchImgOptions);
    const data = response.data;
    totalHits = data.total;
    hits = [...hits, ...data.hits];


    if (totalHits) {
      if (fetchImgOptions.page === 1) {
        Notify.success(`Hooray! We found ${totalHits} images.`);
      }
      renderGallery(data.hits);
      const simpleLightbox = new SimpleLightbox('.gallery a');
      simpleLightbox.refresh();
      watcher.observe(document.querySelector('.gallery-item:last-child'));
    } else {
      Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }
  } catch (error) {
    Notify.failure(`An error occurred: ${error}`);
  }
};
const onSearch = event => {
  event.preventDefault();
  const { elements: { searchQuery: { value } } } = event.currentTarget;
  fetchImgOptions.q = value.trim().toLowerCase();
  if (!value.trim().length) {
    refs.gallery.innerHTML = '';
    Notify.failure('There is nothing to search!');
  } else {
    refs.gallery.innerHTML = '';
    fetchImgOptions.page = 1;
    hits = [];
    totalHits = 0;
    createGallery();
  }
};

refs.form.addEventListener('submit', onSearch);
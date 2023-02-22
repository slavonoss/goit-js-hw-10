import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import listTemplate from './templates/list.hbs';
import cardTemplate from './templates/card.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEL = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const onInputName = event => {
  const searchName = event.target.value.trim();
  if (searchName.length > 0) {
    fetchCountries(searchName)
      .then(data => {
        innerData(data);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        return;
      });
  } else {
    Notify.failure('Please enter country');
    listEL.innerHTML = '';
    infoEl.innerHTML = '';
  }
};

const innerData = data => {
  if (data.length == 1) {
    listEL.innerHTML = '';
    data[0].languages = Object.values(data[0].languages).join(', ');
    infoEl.innerHTML = cardTemplate(data);
  } else {
    infoEl.innerHTML = '';
    listEL.innerHTML = listTemplate(data);
  }
  if (data.length > 10) {
    listEL.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
};

inputEl.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));

const BASE_URl = 'https://restcountries.com/v3.1/name/';
const params = 'name,capital,population,flags,languages';

export const fetchCountries = name => {
  return fetch(`${BASE_URl}${name}?fields=${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};

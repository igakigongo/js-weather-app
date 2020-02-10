import '../css/app.scss';
import getCurrentWeather from './api-client';

/**
 * We have to disable arrow functions with prototype modifications
 * because we need the this object inside the functions.
 */

/**
 * Clears a node after n seconds
 */
// eslint-disable-next-line func-names
Node.prototype.clearAfter = function (seconds) {
  const element = this;
  setTimeout(() => element.removeAllChildren(), seconds * 1000);
  return element;
};

// eslint-disable-next-line func-names
Node.prototype.removeAllChildren = function () {
  const element = this;
  while (element.firstChild) element.removeChild(element.firstChild);
  return this;
};

// eslint-disable-next-line func-names
Node.prototype.insertAlert = function (message, type = 'error') {
  const element = this;
  const cssClass = type === 'error' ? 'alert-warning' : 'alert-success';
  element.removeAllChildren()
    .innerHTML = `<div class="alert ${cssClass} alert-dismissible fade show">
    <strong>${type === 'error' ? 'Warning.' : 'Success.'}</strong> ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
  return element;
};

// eslint-disable-next-line func-names
Node.prototype.showForecast = function (weatherResponse) {
  console.log(weatherResponse);
};

// eslint-disable-next-line func-names
Node.prototype.showLoader = function () {
  const element = this;
  element.removeAllChildren();
  const card = document.createElement('div');
  card.classList.add('card', 'border-0', 'mt-5');

  const cardBody = document.createElement('div');
  cardBody.classList.add('d-flex', 'justify-content-center', 'p-5');

  const div = document.createElement('div');
  div.classList.add('dot-elastic');
  cardBody.append(div);
  card.append(cardBody);
  element.appendChild(card);
  return element;
};

const app = (() => {
  const rootElement = document.querySelector('#app-container');
  const alert = rootElement.querySelector('#alert');
  const form = rootElement.querySelector('form');
  const display = rootElement.querySelector('#weather-info');

  const render = () => {};

  // add event handlers to elements
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    display.removeAllChildren();
    const element = form.querySelector('#location');
    const location = element.value;

    if (!location) {
      alert.insertAlert('please enter a location').clearAfter(2);
      return;
    }

    try {
      display.showLoader();
      const info = await getCurrentWeather(location.trim());
      display.showForecast(info);
    } catch ({ message }) {
      alert.insertAlert(message);
    }
  });

  return {
    render,
  };
})();

document.addEventListener('DOMContentLoaded', app.render());
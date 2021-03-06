import '../css/app.scss';
import getCurrentWeather from './api-client';

/**
 * Clears a node after n seconds
 */
Node.prototype.clearAfter = function clearAfter(seconds) {
  const element = this;
  setTimeout(() => element.removeAllChildren(), seconds * 1000);
  return element;
};

Node.prototype.removeAllChildren = function removeAllChildren() {
  const element = this;
  while (element.firstChild) element.removeChild(element.firstChild);
  return this;
};

Node.prototype.insertAlert = function insertAlert(message, type = 'error') {
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

Node.prototype.showForecast = function showForecast(weather, location, tempFormat) {
  const element = this;
  const {
    humidity, icon, main, pressure, temp,
  } = weather;
  element.innerHTML = `
    <div class='border-0 card mt-5'>
      <h1 class='mt-5 text-center text-warning location'>
        ${location}
      </h1>
      <p class='mx-auto'>
        <img src='http://openweathermap.org/img/wn/${icon}@2x.png' alt='' class='d-inline-block' width='auto' />
      </p>
      <div class='row'>
        <div class='col'>
        <dl>
          <dt>Description</dt>
          <dd>${main}</dd>
        </dl>
        </div>
        <div class='col'>
          <dl>
            <dt>Humidity</dt>
            <dd>${humidity}</dd>
          </dl>
        </div>
        <div class='col'>
          <dl>
            <dt>Pressure</dt>
            <dd>${pressure}</dd>
          </dl>
        </div>
        <div class='col'>
          <dl>
            <dt>Temperature</dt>
            <dd>${(+temp).toFixed(2)} &deg; ${tempFormat.toUpperCase()}</dd>
          </dl>
        </div>
      </div>
    </div>`;
};

Node.prototype.showLoader = function showLoader() {
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

(() => {
  const rootElement = document.querySelector('#app-container');
  const [alert, form, display] = ['#alert', 'form', '#weather-info']
    .map(selector => rootElement.querySelector(selector));

  // add event handlers to elements
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    display.removeAllChildren();

    const [location, units] = ['#location', 'select']
      .map((selector) => form.querySelector(selector).value);

    try {
      display.showLoader();
      const info = await getCurrentWeather(location.trim(), units);
      display.showForecast(info, location, units === 'metric' ? 'c' : 'f');
    } catch ({ message }) {
      alert.insertAlert(message).clearAfter(2);
      display.clearAfter(0);
    } finally {
      form.querySelector('#location').value = '';
    }
  });
})();
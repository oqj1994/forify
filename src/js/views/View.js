import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;

    const markeup = this._generateMarkup();
    if (!render) return markeup;
    this._clear();
    // console.log('markup ............', markeup);
    this._parentElement.insertAdjacentHTML('beforeend', markeup);
  }
  Update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEle, i) => {
      const culEle = curElements[i];
      if (
        !newEle.isEqualNode(culEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      )
        culEle.textContent = newEle.textContent;
      if (!newEle.isEqualNode(culEle))
        Array.from(newEle.attributes).forEach(att =>
          culEle.setAttribute(att.name, att.value)
        );
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const makeup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', makeup);
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `   <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
     ${message}
    </p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

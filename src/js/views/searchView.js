import { async } from 'regenerator-runtime';

class searchView {
  _parentElement = document.querySelector('.search');
  getQuery() {
    const value = this._parentElement.querySelector('.search__field').value;
    return value;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new searchView();

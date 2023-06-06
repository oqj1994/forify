import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView {
  _parentElement = document.querySelector('.pagination');
  _total = 0;
  _perPage = 0;
  init(total, perPage) {
    this._total = total;
    this._perPage = perPage;
  }
  renderBtn(count) {
    const html = `${this._getLeftButton(count)} ${this._getRightButton(count)}`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  _getLeftButton(count) {
    return count - 1 > 0
      ? `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${count - 1}</span>
  </button>`
      : '';
  }
  _getRightButton(count) {
    return this._perPage < this._total && count * this._perPage < this._total
      ? `  <button class="btn--inline pagination__btn--next">
    <span>Page ${count + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`
      : '';
  }

  addHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      handler(e);
    });
  }
}

export default new PaginationView();

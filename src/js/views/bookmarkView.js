import icons from 'url:../../img/icons.svg';
import View from './View.js';
import { Fraction } from 'fractional';
import previewView from './previewView.js';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _message = `no bookmarks ,find some greate recipe to mark`;
  _data;
  _generateMarkup() {
    const markup = this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
    return markup;
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();

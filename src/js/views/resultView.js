import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'no recipes for your query';
  _generateMarkup() {
    const markup = this._data
      .map(result => previewView.render(result, false))
      .join('');
    return markup;
  }
}

export default new ResultView();

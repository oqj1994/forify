import view from './View.js';
class UploadRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _form = document.querySelector('.upload');
  _message = `Recipe waw succed to upload`;
  _uploadBtn = document.querySelector('.upload__btn');
  constructor() {
    super();
    this.addShowWindowHandler();
    this.addCloseWindowHandler();
  }
  _genreateMark() {}
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  addShowWindowHandler() {
    this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
  }
  addCloseWindowHandler() {
    this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));

    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addUploadHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new UploadRecipeView();

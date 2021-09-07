import icons from 'url:../../img/icons.svg';
import View from './View';
class AddReceipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'recipe was uploaded successfully';
  constructor() {
    super();
    //add event handlers
    this._addWindowShowHandler();
    this._addWindowHideHandler();
  }
  addRecipeUploadHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //here this means the parent element
      const formDataEntries = [...new FormData(this)];
      //creates object from array entry (Array<[entry,value]>)
      const data = Object.fromEntries(formDataEntries);
      handler(data);
    });
  }

  _generateMarkup() {}

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addWindowShowHandler() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addWindowHideHandler() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }
}
export default new AddReceipeView();

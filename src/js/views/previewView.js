import View from './View';

class PreviewView extends View {
  _parentElement = '';
  _generateMarkup() {
    const selectedRecipe = window.location.hash.slice(1);
    const isActive = selectedRecipe === this._data.id;
    return `
      <li class="preview">
      <a class="preview__link ${
        isActive ? 'preview__link--active' : ''
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img crossorigin="anonymous" src="${this._data.imageUrl}" alt="${
      this._data.title
    }" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher}</p>
        </div>
      </a>
    </li>
      `;
  }
}
export default new PreviewView();

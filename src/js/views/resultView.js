import View from './View';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'Recipe not found !';
  _generateMarkup() {
    return this._data.map(this._generateMarkupResultItem).join('');
  }
  _generateMarkupResultItem(item) {
    return `
      <li class="preview">
      <a class="preview__link" href="#${item.id}">
        <figure class="preview__fig">
          <img crossorigin="anonymous" src="${item.imageUrl}" alt="${item.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${item.title}</h4>
          <p class="preview__publisher">${item.publisher}</p>
        </div>
      </a>
    </li>
      `;
  }
}
export default new ResultView();

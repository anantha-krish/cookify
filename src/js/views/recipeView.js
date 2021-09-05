import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View';
import { state } from '../model';
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  _errorMsg =
    "We don't receipe for the searched item. Please try another recipe.";
  addServingsUpdateHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const servBtn = e.target.closest('.btn--tiny');
      const newServings = +servBtn.dataset.updateTo;
      if (newServings > 0) handler(newServings);
    });
  }
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${
        this._data.imageUrl
      }"crossOrigin = "anonymous"  alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>
    
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>
    
        <div class="recipe__info-buttons">
          <button data-update-to=${
            state.recipe.servings - 1
          } class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-update-to=${
            state.recipe.servings + 1
          } class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
    
      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
    
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients.map(this._generateMarkupIngredientItem).join('')}
      </ul>
    </div>
    
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  addHandlerRender(handler) {
    //load is similar to componentDidMount
    //hashchange is similar to ComponentDidUpdate (route change)
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }
  _generateMarkupIngredientItem(ing) {
    return `<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ing.quantity ? new Fraction(ing.quantity).toString() : ''
  }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
  </div>
</li>`;
  }
}

export default new RecipeView();

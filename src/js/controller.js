import 'core-js/stable'; //poly filling js logics
import 'regenerator-runtime/runtime'; //poly-filing async await
import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultView from './views/resultView.js';
import searchView from './views/searchView.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//parcel hot reload
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  recipeView.renderSpinner();
  try {
    await model.loadRecipe(id);
    // since imports have live connection, it will be updated
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMsg();
  }
};
const controlSearchRecipe = async () => {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.searchRecipes(query);
    resultView.render(model.getResultPerPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = page => {
  resultView.render(model.getResultPerPage(page));
  paginationView.render(model.state.search);
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addSearchHandler(controlSearchRecipe);
  paginationView.addPaginationHandler(controlPagination);
};

init();

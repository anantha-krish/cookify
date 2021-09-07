import 'core-js/stable'; //poly filling js logics
import 'regenerator-runtime/runtime'; //poly-filing async await
import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import searchView from './views/searchView.js';
import addRecipeView from './views/addRecipeView.js';
import { async } from 'regenerator-runtime';
import { MODAL_TIMEOUT } from './config.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//parcel hot reload
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  recipeView.renderMessage();
  const id = window.location.hash.slice(1);
  if (!id) return;
  recipeView.renderSpinner();
  try {
    await model.loadRecipe(id);
    // since imports have live connection, it will be updated
    resultView.update(model.getResultPerPage());
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
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
const controlUpdateServings = newServings => {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = () => {
  const isBookmarked = model.state.recipe.bookmarked;
  if (!isBookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async data => {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(data);
    addRecipeView.renderMessage();
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_TIMEOUT * 1000);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    //change the url value
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.log(`🧨 ${err.message}`);
    addRecipeView.renderErrorMsg(err.message);
  }
};

const init = () => {
  bookmarksView.addLoadHandler(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addServingsUpdateHandler(controlUpdateServings);
  recipeView.addBookmarkHandler(controlAddBookmark);
  searchView.addSearchHandler(controlSearchRecipe);
  paginationView.addPaginationHandler(controlPagination);
  addRecipeView.addRecipeUploadHandler(controlAddRecipe);
};

init();

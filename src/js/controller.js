import 'core-js/stable'; //poly filling js logics
import 'regenerator-runtime/runtime'; //poly-filing async await

import * as model from './model.js';
import RecipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  RecipeView.renderSpinner();
  await model.loadRecipe(id);
  // since imports have live connection, it will be updated
  RecipeView.render(model.state.recipe);
};
//load is similar to componentDidMount
//hashchange is similar to ComponentDidUpdate (route change)
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);

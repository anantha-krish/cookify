import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helper';
// state variable (//imports will have live connection)
export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: '',
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
    results: [],
  },
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const recipeData = data.data.recipe;

    state.recipe = {
      cookingTime: recipeData.cooking_time,
      id: recipeData.id,
      imageUrl: recipeData.image_url,
      ingredients: recipeData.ingredients,
      publisher: recipeData.publisher,
      servings: recipeData.servings,
      title: recipeData.title,
      sourceUrl: recipeData.source_url,
    };

    const isBookmarked = state.bookmarks.some(bookmark => bookmark.id === id);
    if (isBookmarked) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const searchRecipes = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    const searchResults = data.data.recipes.map(rec => ({
      id: rec.id,
      imageUrl: rec.image_url,
      publisher: rec.publisher,
      title: rec.title,
    }));
    state.search.results = searchResults;
    //reset pagination
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getResultPerPage = (page = state.search.page) => {
  state.search.page = page;
  const pageLimit = state.search.resultPerPage;
  const start = (page - 1) * pageLimit;
  const end = page * pageLimit;
  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    return ing;
  });
  state.recipe.servings = newServings;
  console.log(state.recipe.ingredients);
};

export const addBookMark = recipe => {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
};
export const deleteBookMark = recipeId => {
  const index = state.bookmarks.findIndex(recipe => recipe.id === recipeId);
  state.bookmarks.splice(index, 1);
  if (recipeId === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
};

const init = function () {
  const storage = JSON.parse(localStorage.getItem('bookmarks'));
  if (!storage) return;
  state.bookmarks = storage;
};
init();

import { API_URL, KEY, RESULT_PER_PAGE } from './config';
import { AJAX } from './helper';
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

const createRecipeObject = data => {
  const recipe = data.data.recipe;

  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    title: recipe.title,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async id => {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    const searchResults = data.data.recipes.map(rec => ({
      id: rec.id,
      imageUrl: rec.image_url,
      publisher: rec.publisher,
      title: rec.title,
      ...(rec.key && { key: rec.key }),
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

export const uploadRecipe = async newRecipe => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(entry => {
        const ing = entry[1].replaceAll().split(',');
        if (ing.length < 3) {
          throw new Error('Please enter right format for ingredients');
        }
        return {
          quantity: ing[0] ? +ing[0] : null,
          unit: ing[1],
          description: ing[2],
        };
      });

    const requestBody = {
      title: newRecipe.title,
      cooking_time: newRecipe.cookingTime,
      image_url: newRecipe.image,
      ingredients: ingredients,
      publisher: newRecipe.publisher,
      servings: newRecipe.servings,
      source_url: newRecipe.sourceUrl,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, requestBody);
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};

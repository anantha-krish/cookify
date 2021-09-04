import { API_URL } from './config';
import { getJSON } from './helper';
// state variable (//imports will have live connection)
export const state = {
  recipe: {},
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
  } catch (err) {
    console.log(err);
  }
};

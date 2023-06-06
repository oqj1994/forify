import { async } from 'regenerator-runtime';
import * as config from './config.js';
import { AJAX } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: config.RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const createRecipeObject = function (data) {
  const { recipe } = data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${config.API_URL}/${id}`);
    state.recipe = createRecipeObject(data.data);
    if (state.bookmarks.some(b => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity / state.recipe.servings) * newServings)
  );
  state.recipe.servings = newServings;
};
/**
 *
 * @param {*} query
 */

const newFeature = function (x, y) {
  return x + y;
};
export const loadSearchResults = async function (query) {
  try {
    const queryStr = query.toLowerCase();
    const { data } = await AJAX(
      `${config.API_URL}?search=${query}&key=${config.API_KEY}`
    );
    if (state.search.query !== queryStr) state.search.page = 1;
    state.search.query = queryStr;
    state.search.results = data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};

export const addBookmark = function () {
  state.bookmarks.push(state.recipe);
  saveBookmarks();
  state.recipe.bookmarked = true;
};
export const removeBookmark = function () {
  const index = state.bookmarks.findIndex(re => (re.id = state.recipe.id));
  state.bookmarks.splice(index, 1);
  saveBookmarks();
  state.recipe.bookmarked = false;
};
const loadBookmarks = function () {
  const data = localStorage.getItem('bookmarks');
  if (!data) return;
  state.bookmarks = JSON.parse(data);
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const uploadData = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
    };
    const ingredients = Object.entries(newRecipe)
      .filter(pairs => pairs[0].startsWith('ingredient') && pairs[1] !== '')
      .map(pairs => pairs[1].split(','))
      .filter(p => p[2] !== '');
    uploadData.ingredients = ingredients.map(ingre => {
      if (ingre.length !== 3) throw new Error('ingredients format error');
      const [quantity, unit, description] = ingre;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
    console.log(uploadData);
    const data = await AJAX(
      `${config.API_URL}?key=${config.API_KEY}`,
      uploadData
    );
    state.recipe = createRecipeObject(data.data);
    addBookmark(state.recipe);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

function init() {
  loadBookmarks();
}
init();

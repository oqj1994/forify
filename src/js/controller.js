// import icons from 'url:../img/icons.svg';
// import { state, loadRecipe,loadSearchResults } from './model.js';
import resultView from './views/resultView.js';
import { async } from 'regenerator-runtime';
import * as config from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import uploadRecipeView from './views/uploadRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// fetch(`https://forkify-api.herokuapp.com/v2`);
const controlRecipes = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (hash === '') return;
    recipeView.renderSpinner();
    await model.loadRecipe(hash);
    resultView.Update(model.getSearchResultPage());
    // console.log(state.recipe);
    // const recipe = model.state.recipe;
    // if (model.state.bookmarks.some(rec => rec.id === recipe.id))
    //   model.state.recipe.bookmarked = true;

    //rendering
    recipeView.render(model.state.recipe);
    bookmarkView.Update(model.state.bookmarks);
  } catch (err) {
    // renderError(err)
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    paginationView.init(model.state.search.results.length, config.RES_PER_PAGE);
    searchView.clearInput();
    resultView.render(model.getSearchResultPage());
    paginationView.renderBtn(1);
  } catch (err) {
    resultView.renderError(err.message);
  }
};

const controlPagination = function (e) {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.classList.contains('pagination__btn--prev')) {
    model.state.search.page -= 1;
    paginationView.renderBtn(model.state.search.page);
    resultView.Update(model.getSearchResultPage());
  }
  if (btn.classList.contains('pagination__btn--next')) {
    model.state.search.page += 1;
    paginationView.renderBtn(model.state.search.page);
    resultView.render(model.getSearchResultPage());
  }
};

const controlServings = function (nums) {
  model.updateServings(nums);
  recipeView.Update(model.state.recipe);
};

const controlAddBookmark = function () {
  console.log('happen here');
  model.state.recipe.bookmarked ? model.removeBookmark() : model.addBookmark();
  recipeView.Update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function (e) {
  if (model.state.bookmarks) bookmarkView.render(model.state.bookmarks);
};

const controlUpload = async function (newRecipe) {
  try {
    uploadRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    bookmarkView.render(model.state.bookmarks);
    recipeView.render(model.state.recipe);
    setTimeout(function () {
      uploadRecipeView.toggleWindow();
    }, config.MODAL_TIME);
    uploadRecipeView.renderMessage();
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    uploadRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addBookmarkHandler(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandler(controlPagination);
  uploadRecipeView.addUploadHandler(controlUpload);
};
init();

---
title: Lesson 8 - Favorites API
url: references/stockpile-app/8-favorites-api.html.md
layout: subpage
---

The **Favorites** view manages a list of images that have been *favorited* in the app and relies on [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage) to persist favorites across sessions. An example of the favorites view is shown below for reference. However in this first part you're going to code a Favorites JavaScript API of sorts to allow the app to manage them more easily. 

<img class="mobile-image" src="/images/stockpile/favorites.png" alt="Stockpile Favorites Screen"/>

## Favorites API
1. In the `utils` folder, create a new file named `favorites.js`
2. Add an [eslint exception](https://eslint.org/docs/rules/no-undef) for the global `store` and `localStorage` variables at the top

		/* global store localStorage */

3. Add a local function called `updateFavoritesById()` to take the array of `favorites` and store them as an object keyed by their id (resulting in the `favoritesById` being indexed by id):

		function updateFavoritesById () {
		  store.favoritesById = store.favorites.reduce((a, b) => {
		    const c = a;
		    c[b.id] = b;
		    return c;
		  }, {});
		}

		
3. Next, code the `addFavorite()` and `removeFavorite()` local functions to manage adding and removing favorites with the global `store` object. The `updateFavoritesById` function is called each time to ensure the `favoritesById` array is updated with the change as well. 
		
		function addFavorite (favorite) {
		  store.favorites.push(favorite);
		  updateFavoritesById();
		}

		function removeFavorite (id) {
		  store.favorites = store.favorites.filter(favorite => favorite.id !== id);
		  updateFavoritesById();
		}

3. Add a local function to save the `favorites` array as a JSON string to `localStorage`:
	
		function saveFavoritesToLocalStorage () {
		  localStorage.setItem('favorites', JSON.stringify(store.favorites));
		}

3. Add an export function to fetch the `favorites` JSON object from `localStorage`:

		export function fetchFavoritesFromLocalStorage () {
		  return JSON.parse(localStorage.getItem('favorites')) || [];
		}

4. Next add an export function called `toggleFavorite` which will be called to toggle the status of an item by adding or removing it from the favorites array depending on if it's already been favorited or not. Once the change is made to the array, a call to save to `localStorage` is necessary to keep it in sync:

		export function toggleFavorite (favorite) {
		  const alreadyAFavorite = store.favorites.filter(fave => fave.id === favorite.id);
		  if (alreadyAFavorite.length > 0) {
		    removeFavorite(favorite.id);
		  } else {
		    addFavorite(favorite);
		  }
		  saveFavoritesToLocalStorage();
		}

#### Managing Favorites Data
The `favorites` should be populated from local storage initially when the app is run to load any items that have already been favorited. You initially created the data objects for the `favorites` in the Global Store to be empty but in this step you will call the new `fetchFavoritesFromLocalStorage` method as well as index them by id when the app starts up.

2. Open `main.js` and add an import for the `fetchFavoritesFromLocalStorage` function after the other imports:

		import { fetchFavoritesFromLocalStorage } from './utils/favorites';
		
3. Then, replace the line you added earlier to define the `const favorites = [];` with a call to the new `fetchFavoritesFromLocalStorage` to actually populate it with the `favorites` from local storage when the app is run:
		const favorites = fetchFavoritesFromLocalStorage();
		
4. Next, replace the `const favoritesById = [];` with the following snippet, to index `favorites` by `id`:

		const favoritesById = favorites.reduce((a, b) => {
		  const c = a;
		  c[b.id] = b;
		  return c;
		}, {});
		
    In the end your global store handling data should look like the following:
    
        // Set up a global store
        const favorites = fetchFavoritesFromLocalStorage();
        const favoritesById = favorites.reduce((a, b) => {
          const c = a;
          c[b.id] = b;
          return c;
        }, {});

        // Global store defaults
        window.store = {
          images: [],
          imagesById: {},
          favorites,
          favoritesById
        };

		

In the next lesson you will implement the UI and associated JavaScript needed to show the **Favorites** list view.
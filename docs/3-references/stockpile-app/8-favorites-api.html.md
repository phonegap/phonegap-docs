---
title: Lesson 8 - Favorites API
url: references/stockpile-app/8-favorites-api.html.md
layout: subpage
---

The **Favorites** view manages a list of images that have been *favorited* in the app and relies on [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage) to persist favorites across sessions. An example of the favorites view is shown below for reference. However in this first part you're going to code a Favorites JavaScript API of sorts to allow the app to manage them more easily. 

<img class="mobile-image" src="/images/stockpile/favorites.png" alt="Stockpile Favorites Screen"/>

## Update the Global Store
2. Open `main.js` and add an import for the `fetchFavoritesFromLocalStorage` function after the other imports:

		import { fetchFavoritesFromLocalStorage } from './utils/favorites';
		
3. Then, just before the global `window.store` definition, create a new `favorites` constant:

		const favorites = [];
		
     and a new `favoritesById` constant:

		const favoritesById = [];
		
	You will revisit these variables after you create the Favorites API.

4. Lastly, while in `main.js`, add the new `favorites` and `favoritesById` constants to the global `store` object`:

		window.store = {
		  images: [],
		  imagesById: {},
		  favorites,
		  favoritesById
		};

     You will be referencing the new store objects in your Favorites API in the next section. 

## Favorites API
1. In the `utils` folder, create a new file and name it `favorites.js`
2. Add an [eslint exception](https://eslint.org/docs/rules/no-undef) for the global `store` and `localStorage` variables at the top

		/* global store localStorage */

3. Add an `updateFavoritesById()` function to take the array of `favorites` and store them as an object keyed by their id (resulting in the `favoritesById` being indexed by id):

		function updateFavoritesById () {
		  store.favoritesById = store.favorites.reduce((a, b) => {
		    const c = a;
		    c[b.id] = b;
		    return c;
		  }, {});
		}

		
3. Next code the `addFavorite()` and `removeFavorite()` functions to manage adding and removing favorites with the global `store` object. The `updateFavoritesById` function is called each time to ensure the `favoritesById` array is updated with the change as well. 
		
		function addFavorite (favorite) {
		  store.favorites.push(favorite);
		  updateFavoritesById();
		}

		function removeFavorite (id) {
		  store.favorites = store.favorites.filter(favorite => favorite.id !== id);
		  updateFavoritesById();
		}

3. Add a function to save the `favorites` array as a JSON string to `localStorage`:
	
		function saveFavoritesToLocalStorage () {
		  localStorage.setItem('favorites', JSON.stringify(store.favorites));
		}

3. Add a function to fetch the `favorites` JSON object from `localStorage`:

		export function fetchFavoritesFromLocalStorage () {
		  return JSON.parse(localStorage.getItem('favorites')) || [];
		}

4. Next add a `toggleFavorite` function to toggle the status of an item by adding or removing it from the favorites array depending on if it's already been favorited or not. Once the change is made to the array, a call to save to `localStorage` is necessary to keep it in sync:

		export function toggleFavorite (favorite) {
		  const alreadyAFavorite = store.favorites.filter(fave => fave.id === favorite.id);
		  if (alreadyAFavorite.length > 0) {
		    removeFavorite(favorite.id);
		  } else {
		    addFavorite(favorite);
		  }
		  saveFavoritesToLocalStorage();
		}

## Use the Favorites API

This Favorites API will be used from a few different views. In this section you will code the necessary imports to allow the functions to be accessed.

#### Details View
In this step you'll add the ability to show and toggle the favorite status of an image in the Details View.

1. Open the `Details.vue` file
2. Replace the current `<f7-navbar.../>` block with the following snippet to include an empty or filled in clickable star icon to indicate if this image is a favorite or not (filled=favorite, empty=not).

		<f7-navbar :back-link="backLink" sliding>
		  <f7-nav-center>
		    Details
		  </f7-nav-center>
		  <f7-nav-right>
		    <f7-link icon-f7="star_filled" @click="toggleFavorite"
		      v-if="isFavorite"
		    />
		    <f7-link icon-f7="star" @click="toggleFavorite" v-else />
		  </f7-nav-right>
		</f7-navbar>

    The resulting navigation bar should look like the image below:
  <img class="mobile-image" src="/images/stockpile/navbar2.png" alt="Stockpile Navbar"/>

1. Now add an import for the new `toggleFavorite` function created in the `favorites.js` file just under the import for `moment.js`: 

		import { toggleFavorite } from '../../utils/favorites';

2. Replace the `toggleFavorite()` stub you added in the previous lesson with the following code, which subsequently calls the `toggleFavorite()` method in the `favorites.js` API:

		toggleFavorite () {
		  toggleFavorite(this.item);
		}

	This code is triggered when the star icon is clicked on this view and will need to take a different path depending on if it was shown due to a  from the *favorited* list results or not. Since this view is shown from either the Results page or the Favorites list, there needs to be a way to determine which it came from, and the `this.displayFavorite` variable is used for that reason. It will be set to true when it finds the `?displayingFavorite=true`, which is added when the item is selected on the Favorites list. 

http://localhost:8080/#!//results/details/71458925?displayingFavorite=true
	
If it has already been favorited, then the item will be removed from the favorites list (via the imported `toggleFavorite` function) and go back to the previous view (via `router.back()`). If it's not an item chosen from the*favorited* item, it will be toggled via the imported `toggleFavorite` function.


#### Main Global Store
2. Now open `main.js` and add an import for the `fetchFavoritesFromLocalStorage` function after the other imports:

		import { fetchFavoritesFromLocalStorage } from './utils/favorites';
		
3. Then, replace the line you added earlier to define the `const favorites = [];` with a call to the new `fetchFavoritesFromLocalStorage` to actually populate it with the `favorites` from local storage when the app is run:

		const favorites = fetchFavoritesFromLocalStorage();
		
4. Next, replace the `const favoritesById = [];` with the following to index them by id:

		const favoritesById = favorites.reduce((a, b) => {
		  const c = a;
		  c[b.id] = b;
		  return c;
		}, {});
		

In the next lesson you will implement the UI and associated JavaScript handling for the **Favorites** view.
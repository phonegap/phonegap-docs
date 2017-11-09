---
title: Lesson 9 - Favorites View
url: references/stockpile-app/9-favorites-view
layout: subpage
---

In this part 2 you will implement the **Favorites** view UI specifically and it's associated handling. The **Favorites** view show a list of items containing the images the user has favorited along with the title, category and creation date for each, and a [swipeout](http://framework7.io/vue/swipeout-list.html) button to allow it to be deleted. Each of the list items links to the**Details** page when clicked. 

<img class="mobile-image" src="/images/stockpile/favorites.png" alt="Stockpile Favorites Screen"/>

## Implement the UI 

### Navigation Bar 
Replace the current `<f7-navbar ../>` component with the following:

		<f7-navbar sliding>
		      <f7-nav-left>
		        <f7-link icon-f7="bars" open-panel="left"></f7-link>
		      </f7-nav-left>
		      <f7-nav-center>
		        Favorites
		      </f7-nav-center>
		</f7-navbar>

### Content Updates 
1. Rename `~src/components/pages/Services.vue` to `Favorites.vue`. 
2. In `Favorites.vue`, change the `<f7-page name../>` from **services** to **favorites**.
3. Replace the `<f7-block-title />` and `<f7-block-inner />` with the following list and content block code:

		<f7-list media-list v-if="hasFavorites">
			<f7-list-item v-for="favorite in favorites"
			  :key="favorite.id"
			  @click="clickItem(favorite.id)"
			  @swipeout:deleted="onSwipeoutDeleted(favorite)"
			  :link="`/results/details/${favorite.id}`"
			  :media="mediaItemImage(favorite.thumbnail_url, favorite.title)"
			  :title="favorite.title"
			  :text="formatDate(favorite.creation_date)"
			  :subtitle="favorite.category.name"
			  swipeout
			>
			  <f7-swipeout-actions>
			    <f7-swipeout-button delete>Delete</f7-swipeout-button>
			  </f7-swipeout-actions>
			</f7-list-item>
		</f7-list>
		<f7-content-block v-else>
		  <p>
		    You have no favorites saved. Search for something then use the
		    star icon to save a favorite
		  </p>
		</f7-content-block>

      This code will create a list of items using the `[Framework7 media-list](http://framework7.io/vue/list.html)` modifier if there are currently any items favorited (the `hasFavorites` will be added in the JavaScript handling below). If there are none, a UI block is shown to notify the user to use the star icon.

<!-- TODO - Explain MORE -->

## Add JavaScript Handling
In this section you should scroll down to the bottom of the page where the JavaScript default export block is defined to make some changes and addition

1. At the top of the `<script>` tag, add an eslint exception for the global `store`

		/* global store */

2. Replace the `data()` method with one returning the `store`:

		data () {
		  return store;
		}

3. Add a `computed` object with a property for the `hasFavorites` used in the UI above:
 
		computed: {
		  hasFavorites () {
		    return !!this.favorites.length;
		  }
		}

4. Define a `methods` object after the existing `data ()` block

        methods: {
        }

5. In the `methods` object, insert a `clickItem()` method which will load the Details page for a given item when clicked and pass the `displayingFavorite=true` parameter on the URL to indicate it's displaying an item from the **Favorites** page (vs an item from the regular **Results** page): 

		clickItem (id) {
		  this.$f7.mainView.router
		    .loadPage(`/results/details/${id}?displayingFavorite=true`);
		}

5. In the `methods` object, insert a `mediaItemImage()` method to return the URL of the image:

		mediaItemImage (url, title) {
		  return `<img alt="${title}" width="80" src="${url}" />`;
		}
		
6. At the beginning of the `<script>` block, add an import for `moment.js`:

		import moment from 'moment'
		
7. In the `methods` object, insert a `formatDate()`, which uses moment.js to format the date:

		formatDate (date) {
		  const created = moment(date);
		  return `Created: ${created.format('MMMM Do YYYY')}`;
		}

8. Back in the `<script>` block, after the `moment.js` import, add an import for the `toggleFavorite()` function you coded in `favorites.js`: 

		import { toggleFavorite } from '../../utils/favorites';

9. Add an `onSwipeoutDeleted()` method to the `methods` object to handle the `swipeout` delete event:

		onSwipeoutDeleted (favorite) {
		  toggleFavorite(favorite);
		}

10. Add this [lifecycle hook](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) for [`created ()`](https://vuejs.org/v2/api/#created) just after the `methods` object to force the router to reset the view stack when the Search view instance is [`created ()`](https://vuejs.org/v2/api/#created).

		created () {
		  this.$f7.mainView.history = ['/favorites/'];
		}
        
    <div class="alert--tip">This is a bit of a hack needed to keep the page at the top of the stack in terms of navigation and history. </div>

## Update the Routing

In this step you will change the routing of the app to display the _Favorites_  page instead of the  _Services_ page.

1. Open `~src/routes.js` and replace all instances of _Services_ with _Favorites_, for example:

		import Favorites from './components/pages/Favorites';
		
2. Then replace the route for `/services/` with `/favorites/`:

		{
		  path: '/favorites/',
		  component: Favorites
		}

3. Open `~src/components/LeftPanel.vue` and update the following list-item title:

		<f7-list-item
		  link="/favorites/"
		  title="Favorites"
		  link-view="#main-view"
		  link-reload
		  link-close-panel
		/>


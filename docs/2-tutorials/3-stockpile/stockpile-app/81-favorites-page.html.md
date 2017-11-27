---
title: Lesson 9 - Favorites View
url: tutorials/stockpile/81-favorites-page
layout: subpage
next: 2-tutorials/3-stockpile/stockpile-app/9.10-details-add-favorites.html.md
---

In this part 2 you will implement the **Favorites** view UI specifically and it's associated handling. The **Favorites** view show a list of items containing the images the user has favorited along with the title, category and creation date for each, and a [swipeout](http://framework7.io/vue/swipeout-list.html) button to allow it to be deleted. Each of the list items links to the **Details** page when clicked.

![](/images/stockpile/favorites-phone.png)

## Renaming & Routing Updates

1. Rename the existing `~src/components/pages/Services.vue` to `Favorites.vue`
1. Next update the routing for this app to load the `Favorites` component instead of the `Services` component.

    Open `~src/routes.js` and replace the import for `Services` with `Favorites`:

  ```javascript
    import Favorites from './components/pages/Favorites';
  ```

1. Then replace the route for the `'/services/'` path to `'/favorites/'` and specify the `Favorites` component:

  ```javascript
    {
      path: '/favorites/',
      component: Favorites
    },
  ```

1. Lastly, you'll want to be able to access the **Favorites** page from the side menu. Open `~src/components/LeftPanel.vue` and replace the `<f7-list-item../>` element for `"/services/"` with the following:

  ```html
    <f7-list-item
      link="/favorites/"
      title="Favorites"
      link-view="#main-view"
      link-reload
      link-close-panel
    />
  ```

## Implement the UI

In `Favorites.vue`, change the page name from "services" to "favorites":

  ```html
    <f7-page name="favorites">
  ```

### Navigation Bar

Replace the current `<f7-navbar ../>` component with the following:

  ```html
    <f7-navbar sliding>
          <f7-nav-left>
            <f7-link icon-f7="bars" open-panel="left"></f7-link>
          </f7-nav-left>
          <f7-nav-center>
            Favorites
          </f7-nav-center>
    </f7-navbar>
  ```

### Content Updates

1. Completely replace the `<f7-block-title />` and `<f7-block-inner />` elements with the following list and content block code:

  ```html
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
  ```

  This code will create a list of items using the [Framework7 media-list](http://framework7.io/vue/list.html) modifier if there are currently any items favorited (the `hasFavorites` will be added in the JavaScript handling below). If there are none, a UI block is shown to notify the user to use the star icon. It will bind all of the item data to the UI components of the list item for display, and also set a click handler to open the details of the item, and a delete handler to call when the swipeout delete button is clicked. These functions will be added in the JavaScript section below. The animated image below shows how the favorites list appears after this code is rendered and and what the swipeout delete looks like:

  <img class="mobile-image" src="/images/stockpile/vids/stockpile-fave-delete.gif" alt="Stockpile Delete Fave"/>

## Add JavaScript Handling

In this section you will need to scroll down to the bottom of the page where the JavaScript default export block is defined to make some changes and additions.

1. Rename this component by changing the `name: Services` to `name: Favorites`

  ```javascript
    export default {
        name: 'Favorites',
        ...
    }
  ```

1. At the top of the `<script>` tag, add an eslint exception for the global `store`

  ```javascript
    /* global store */
  ```

1. Completely replace the `data` method with one returning just the `store` object:

  ```javascript
    data () {
      return store;
    }
  ```

1. Add a `computed` object with a property for the `hasFavorites` used in the UI above:

  ```javascript
    computed: {
      hasFavorites () {
        return !!this.favorites.length;
      }
    }
  ```

1. Insert a `methods` object after the `data` block

  ```javascript
    methods: {
    }
  ```

1. In the `methods` object, insert a `clickItem()` method which will load the Details page for a given item when clicked and pass the `displayingFavorite=true` parameter on the URL to indicate it's displaying an item from the **Favorites** page (vs an item from the regular **Results** page):

  ```javascript
    clickItem (id) {
      this.$f7.mainView.router
        .loadPage(`/results/details/${id}?displayingFavorite=true`);
    }
  ```

1. In the `methods` object, insert a `mediaItemImage()` method to return the URL of the image:

  ```javascript
    mediaItemImage (url, title) {
      return `<img alt="${title}" width="80" src="${url}" />`;
    }
  ```

1. In the `<script>` block just after the `/* global store */`, add an import for [`moment.js`](https://momentjs.com/):

  ```javascript
    import moment from 'moment';
  ```

  <div class="alert--tip">This step assumes you installed `moment.js` in the [Details page lesson](../7-details-page).</div>

1. In the `methods` object, insert a `formatDate()`, which uses moment.js to format the date:

  ```javascript
    formatDate (date) {
      const created = moment(date);
      return `Created: ${created.format('MMMM Do YYYY')}`;
    }
  ```

1. Back in the `<script>` block, after the `moment.js` import, add an import for the `toggleFavorite()` function you coded in the `favorites.js` API:

  ```javascript
    import { toggleFavorite } from '../../utils/favorites';
  ```

1. Add an `onSwipeoutDeleted()` method to the `methods` object to handle the `swipeout` delete event:

  ```javascript
    onSwipeoutDeleted (favorite) {
      toggleFavorite(favorite);
    }
  ```

  This animated image shows how you can swipe the list item out to show the delete button, and how the favorite status is toggled when it's clicked so the item is no longer displayed in the favorites list.

  <img class="mobile-image" src="/images/stockpile/vids/stockpile-fave-delete.gif" alt="Stockpile Delete Fave"/>

1. Add a [lifecycle hook](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) for the [`created ()`](https://vuejs.org/v2/api/#created) event just after the `computed` object to force the router to reset the view stack when the Search view instance is [`created ()`](https://vuejs.org/v2/api/#created).

  ```javascript
    created () {
      this.$f7.mainView.history = ['/favorites/'];
    }
  ```

  <div class="alert--tip">Don't worry much about this syntax since it's Framework7 specific, just understand that it ensures this page is kept at the top of the stack in terms of navigation and history since it's meant to be a top-level page (versus one that is only navigated to like Results or Details). </div>

## Run it!

Run the app again in dev mode and try out the side menu link to load this new Favorites page. Does it look like this? Why is it empty?

![](/images/stockpile/9-favorites1.png)

<div class="alert--tip">If you didn't see a blank page but actually saw a favorites list load, it may be because you've run the full version of the Stockpile app prior to this and the localStorage in your browser still has the contents. You can use the Chrome devtools -> Application tab to clear the localStorage and run it again (highlight the `favorites` key and press the delete button to clear).</div>
![](/images/stockpile/9-old-faves-delete.png)

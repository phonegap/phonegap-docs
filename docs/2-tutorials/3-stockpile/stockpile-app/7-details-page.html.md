---
title: Lesson 7 - Details View
url: tutorials/stockpile/7-details-page
layout: subpage
next: 2-tutorials/3-stockpile/stockpile-app/8-favorites-api.html.md
---

The **Details** view includes an image container and a card style UI component to present the specific details of the image selected. This view is shown when an image is selected from the **Results** view or the **Favorites** view.

![](/images/stockpile/details-phone.png)

Some of the details displayed can also lead to subsequent queries to the Adobe Stock API when clicked. For instance, when a user clicks the **Category**, **Created by** or **FIND SIMILAR** links, a new query will run based on which was clicked and load the results page with the new results as shown here:

<img class="mobile-image" src="/images/stockpile/vids/stockpile-details.gif" alt="Stockpile App"/>

## Renaming & Routing Updates

1. Rename the existing `~src/components/pages/Another.vue` to `Details.vue`.

1. Next update the routing for this app to load the `Details` component instead of the `Another` component.

Open `~src/routes.js` and replace the import for _Another_ with _Details_ like the line below:

```javascript
    import Details from './components/pages/Details';
```

1. Then replace the route for the `Another` component that currently specifies `path: '/about/another/',` to point to the `Details` component with the following `path`:

```javascript
    {
      path: '/results/details/:id',
      component: Details
    },
```

   Similar to the Results route, the Details route also uses [dynamic route matching by pattern](http://framework7.io/vue/navigation-router.html) based on the `id` parameter of the image selected.

   <div class="alert--tip">For instance, example of a URL matching this Details route would be:  `http://localhost:8080/#!//results/details/60875206`</div>

## Implement the UI

1. In `Details.vue`, change the page name from **another** to **details** and add an event listener to call the `onPageBeforeAnimation` function before the page animates:

```html
    <f7-page name="details" @page:beforeanimation="onPageBeforeAnimation">
```

### Navigation Bar

1. Replace the current `<f7-navbar.../>` block with the following:

```html
    <f7-navbar back-link="Back" sliding>
      <f7-nav-center>
        Details
      </f7-nav-center>
    </f7-navbar>
```

### Page Content

Still in `Details.vue`...

1. Remove the `<f7-block-title .../>` and the entire `<f7-block inner...>` component.
1. Add a `card` component to contain the details of the image selected:

```html
    <f7-card>
    </f7-card>
```

1. Next add this header component inside the `<f7-card../>` element which contains a container `<div/>` (styled later) to hold the image itself and its title. The image also has a `click` handler that will load the image in a photo browser component, and a `style` function it's bound to for setting the thumbnail URL with the appropriate size:

```html
    <f7-card-header>
      <div class="img-container" :style="imgBackground()"
        @click="loadInPhotoBrowser">
        <div class="img-container-inner" :style="imgBackground(500)"></div>
        <div class="caption">{{item.title}}</div>
      </div>
    </f7-card-header>
```

1. Then add the card content just after the card header added above:

```html
    <f7-card-content>
        <f7-list>
          <f7-list-item title="Category" :after="item.category.name"
            :link="categoryLink"
          ></f7-list-item>
          <f7-list-item
            title="Created by" :after="item.creator_name" :link="creatorLink"
          ></f7-list-item>
          <f7-list-item
            title="Creation date" :after="creationDate"></f7-list-item>
        </f7-list>
    </f7-card-content>
```

1. Complete the card with a footer:

```html
    <f7-card-footer>
        <f7-link :href="item.comp_url" external>Download Comp</f7-link>
        <f7-link :href="findMoreLink">Find Similar</f7-link>
    </f7-card-footer>
```

1. Just after the card closing tag, add a [Framework7 Photo Browser](http://framework7.io/vue/photo-browser.html) component and bind the photos, lazy loading and toolbar values:

```html
    <f7-photo-browser
      ref="pb"
      type="page"
      :photos="photos"
      :lazyLoading="true"
      backLinkText="Details"
      :toolbar="false">
    </f7-photo-browser>
```

## Add JavaScript Handling

Now locate the the `<script>` tag that holds the JavaScript `export` block since you will be working in that section for the following steps.

1. Rename this component by changing the name from `Another` to `Details`:

```javascript
    export default {
        name: 'Details',
        ...
    }
```

1. In the top of the `<script>` tag, add an [eslint exception for the global store object:](https://eslint.org/docs/rules/no-undef)

```javascript
    /* global store */
```

1. Then replace the `data` method with one returning the global `store` object to provide access to it:

```javascript
    data () {
      return store;
    },
```

1. Install [`moment.js`](https://momentjs.com/) to use for date formatting:

        npm install moment --save

   then at the start of the `<script>` tag, add an import for it:

```javascript
    import moment from 'moment';
```

### Computed Properties

1. After the `data` object, insert a new `computed` property block:

```javascript
    computed: {
    },
```

1. In this new `computed` block, define `id` as a computed property:

```javascript
    computed: {
      id () {
        const { id } = this.$route.params;
        return id;
      }
    },
```

1. Add in a computed property for `item`:

```javascript
    computed: {
      ...,
      item () {
        if (this.imagesById && this.imagesById[this.id]) {
          this.stockItem = Object.assign(
            {},
            this.stockItem,
            this.imagesById[this.id]);
        }
        return this.stockItem;
      }
    },
```

1. Add another computed property to return an array of photos for the Photo Browser component with just the one selected image in it:

```javascript
    computed: {
      ...,
      photos () {
        return [
          {
            url: this.item.thumbnail_1000_url,
            caption: this.item.title || ''
          }
        ];
      }
    },
```

1. Add a computed property to calculate the `creationDate` using `moment.js` to format it:

```javascript
    computed: {
      ...,
      creationDate () {
        const created = moment(this.item.creation_date);
        return created.format('MMMM Do YYYY');
      }
    }
```

1. Lastly, add the following computed properties to set the path to the current item data to use for routing when a user clicks on the Category, Creator or Find Similar links:

```javascript
    computed: {
      ...,
      categoryLink () {
        return `/results/category/60/${this.item.category.id}/details`;
      },
      creatorLink () {
        return `/results/creator_id/60/${this.item.creator_id}/details`;
      },
      findMoreLink () {
        return `/results/similar/60/${this.item.id}/details`;
      }
    }
```

#### Methods

1. Insert a `methods` object after the `data` object and before the `computed` properties block:

```javascript
    methods: {
    }
```

1. Define a method stub for `fetchResults`:

```javascript
    methods: {
      fetchResults () {}
    }
```

1. Define the `loadInPhotoBrowser` method. This method is called when a card is clicked and will use the [Framework7 Photo Browser](http://framework7.io/vue/photo-browser.html) component you defined in the UI to open the image in a new window and allow it to be zoomed, panned etc:

```javascript
    methods: {
      ...,
      loadInPhotoBrowser () {
        this.$refs.pb.open();
      }
    }
```

1. Define the `onPageBeforeAnimation` handler to disable exposition if enabled (see the [Framework7 Photo Browser](http://framework7.io/vue/photo-browser.html) component docs for more details):

```javascript
    methods: {
      ...,
      onPageBeforeAnimation () {
        // When going 'back' from the photo browser, make sure we disable
        // exposition (hidden navbar, etc) if it was enabled
        const { pb: photoBrowser } = this.$refs;
        if (photoBrowser.f7PhotoBrowser.exposed) {
          photoBrowser.disableExposition();
        }
      }
    }
```

1. Add the `imgBackground ()` method to determine the specific sized thumbnail url to use:

```javascript
    methods: {
      ...,
      imgBackground (size = 0) {
        const url = size > 0 ? `thumbnail_${size}_url` : 'thumbnail_url';
        if (this.item[url]) this[url] = this.item[url];
        return `background-image: url(${this[url]})`;
      }
    }
```

## Define Styles

After the closing `</script>` tag, add this `<style>` block to style the image container and caption.

```html
  <style scoped>
```

```css
      .swiper {
        height: 300px;
      }
      .img-container {
        position: relative;
        width: 100%;
        height: 240px;
        max-height: 240px;
        overflow: hidden;
        margin: 0;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .img-container-inner {
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        z-index: 2;
      }
      .caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.3);
        color: white;
        padding: 8px 16px;
        z-index: 3;
      }
```

```html
  </style>
```

## Run it

![](/images/stockpile/7-details.png)

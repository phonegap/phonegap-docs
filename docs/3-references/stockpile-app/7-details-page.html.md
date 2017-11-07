---
title: Lesson 7 - Details View
url: references/stockpile-app/7-details-page
layout: subpage
---
The **Details** view includes an image container and a card style UI component to present the specific details of the image selected. This view is shown when an image is selected from the **Results** view or the **Favorites** view.

<img class="mobile-image" src="/images/stockpile/details-view.png" alt="Stockpile Details Screen"/>
<!--<img class="mobile-image" src="/images/stockpile/details.png" alt="Stockpile Details Screen"/>-->

Some of the details displayed can also lead to subsequent queries to the Adobe Stock API when clicked. For instance, when a user clicks the *Category*, *Created by* or *Find Similar* links (outlined in red in the screenshot below), a new query will run based on which was clicked and load the results page with the new results.

<img class="mobile-image" src="/images/stockpile/details-results-routes.png" alt="Stockpile Details Results Routes Screen"/>

For instance, if the *Find Similar* link was clicked, you would see a different message displayed with the number of results at the top:

<img class="mobile-image" src="/images/stockpile/similar-results.png" alt="Stockpile Details Screen"/>

## Implement the UI 

1. Rename `~src/components/pages/Another.vue` to `Details.vue`. This page will encapsulate the functionality for the Details view.
2. In `Details.vue`, change the page name from **another** to **details** and add an event listener to call a function before the page animates:

		<f7-page name="details" @page:beforeanimation="onPageBeforeAnimation">

### Part 1: Navigation Bar 
The navigation bar needs to show the Details title and a star icon to use for favoriting an image. A Vue `v-if` directive is used to show the star filled when the image has already been favorited, otherwise it will be an empty star. It also needs a click event handler to be called to toggle the favorite status for a given image. 

1. Replace the current `<f7-navbar.../>` block with the following:

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

<img class="mobile-image" src="/images/stockpile/navbar2.png" alt="Stockpile Navbar"/>

### Part 2: Page Content
Continuing in `Details.vue`...

1. Remove the `<f7-block-title .../>` and the entire `<f7-block inner...> component`.
2. Add a `card` component to contain the details of the image selected:

		<f7-card>
		</f7-card>

2. Next add this header component into the card to hold the image and title. The image has a click handler to cause it to load in a photo browser and a style function to set the URL with a size:

		<f7-card-header>
		  <div class="img-container" :style="imgBackground()"
		    @click="loadInPhotoBrowser"
		  >
		    <div class="img-container-inner" :style="imgBackground(500)"></div>
		    <div class="caption">{{item.title}}</div>
		  </div>
		</f7-card-header>

3. Next add the card content: 

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
      
4. Complete the card with a footer: 

		<f7-card-footer>
	        <f7-link :href="item.comp_url" external>Download Comp</f7-link>
	        <f7-link :href="findMoreLink">Find Similar</f7-link>
	      </f7-card-footer>
      

5. Just after the card closing tag, add a photo browser component and bind the photos, lazy loading and toolbar values: 

		<f7-photo-browser
		  ref="pb"
		  type="page"
		  :photos="photos"
		  :lazyLoading="true"
		  backLinkText="Details"
		  :toolbar="false"
		></f7-photo-browser>


## Add JavaScript handling

1. In the top of the `<script>` tag, add an [eslint exception for the global store object](https://eslint.org/docs/rules/no-undef)

		/* global store */

2. Then replace the `data()` method with one returning the the global store object to provide access to it:

		data () {
		  return store;
		}

#### Computed properties
3. After the `data ()` object, add a new `computed` property block:

		computed: {
		}

6. In this new `computed` block, define `id` as a computed property:

		id () {
		  const { id } = this.$route.params;
		  return id;
		}
        
6. Add in a computed property for `item`:
        item () {
            // Fallback default for when images* and favorites* are reset in
		    //  the store
            if (this.imagesById && this.imagesById[this.id]) {
              this.stockItem = Object.assign(
                {},
                this.stockItem,
                this.imagesById[this.id]);
            }
            return this.stockItem;
        }
        
6. Add another computed property to return an array of photos for the Photo Browser component with just the one selected image in it:

		photos () {
		  return [
		    {
		      url: this.item.thumbnail_1000_url,
		      caption: this.item.title || ''
		    }
		  ];
		}

6. Lastly, add some computed properties to set the path to use for routing when a user clicks on the Category, Creator or Find Similar links:
		
		categoryLink () {
		  return `/results/category/60/${this.item.category.id}/details`;
		},
		creatorLink () {
		  return `/results/creator_id/60/${this.item.creator_id}/details`;
		},
        findMoreLink () {
		  return `/results/similar/60/${this.item.id}/details`;
		}

#### Methods
3. Define the `loadInPhotoBrowser ()` method that will be called when a card is clicked. It will use the [Framework7 Photo Browser](http://framework7.io/vue/photo-browser.html) component we defined to open the image in a new window and allow it to be zoomed, panned etc:

		loadInPhotoBrowser () {
		  this.$refs.pb.open();
		}

4. Define the `onPageBeforeAnimation` handler

		onPageBeforeAnimation () {
		  // When going 'back' from the photo browser, make sure we disable
		  //  exposition (hidden navbar, etc) if it was enabled
		  const { pb: photoBrowser } = this.$refs;
		  if (photoBrowser.f7PhotoBrowser.exposed) {
		    photoBrowser.disableExposition();
		  }
		}

6. Add the `imgBackground ()` method 

		imgBackground (size = 0) {
		  const url = size > 0 ? `thumbnail_${size}_url` : 'thumbnail_url';
		  if (this.item[url]) this[url] = this.item[url];
		  return `background-image: url(${this[url]})`;
		}

5. Add a function to toggle favorites, leave as a stub for now. 

		toggleFavorite () {}


4. Install `moment.js` to use for date formatting: 
			
		npm install moment --save

   then at the start of the `<script>` tag, add an import for it: 

	import moment from 'moment';

   Add computed properties for `creationDate`, using moment.js to format:

	creationDate () {
	  const created = moment(this.item.creation_date);
	  return created.format('MMMM Do YYYY');
		}


## Define Styles
After the `<script>` tag, add a `<style>` tag to style the image container and caption.

	<style scoped>
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
	</style>

## Page Routing Updates

In this step you will change the routing of the app to display  the _Details_ page instead of the _Another_ page.

1. Open `~src/routes.js` and replace the import for _Another_ with _Details_, for example:

	    import Details from './components/pages/Details';

2. Replace the route for `/about/another/` with:

		{
		  path: '/results/details/:id',
		  component: Details
		} 
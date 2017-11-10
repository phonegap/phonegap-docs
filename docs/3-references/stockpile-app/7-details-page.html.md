---
title: Lesson 7 - Details View
url: references/stockpile-app/7-details-page
layout: subpage
---
The **Details** view includes an image container and a card style UI component to present the specific details of the image selected. This view is shown when an image is selected from the **Results** view or the **Favorites** view.

<img class="mobile-image" src="/images/stockpile/android/details.png" alt="Stockpile Details Screen"/>

Some of the details displayed can also lead to subsequent queries to the Adobe Stock API when clicked. For instance, when a user clicks the *Category*, *Created by* or *Find Similar* links (outlined in red in the screenshot below), a new query will run based on which was clicked and load the results page with the new results.

<img class="mobile-image" src="/images/stockpile/details-results-routes.png" alt="Stockpile Details Results Routes Screen"/>

For instance, if the *Find Similar* link was clicked, you would see a different message displayed with the number of results at the top:

<img class="mobile-image" src="/images/stockpile/similar-results.png" alt="Stockpile Details Screen"/>

## Renaming & Routing Updates
1. Rename the existing `~src/components/pages/Another.vue` to `Details.vue`
    
        import Details from './components/pages/Details';

2. Next update the routing for this app to load the `Details` component instead of the `Another` component.
Open `~src/routes.js` and replace the import for _Another_ with _Details_ like the line below:

	    import Details from './components/pages/Details';

3. Then replace the route for the `Another` component that currently specifies `path: '/about/another/',` to point to the `Details` component with the following `path`:
   
	    {
		  path: '/results/details/:id',
		  component: Details
		},
        
   Similar to the Results route, the Details route also uses [dynamic route matching by pattern](http://framework7.io/vue/navigation-router.html) based on the `id` parameter of the image selected.

   <div class="alert--tip">For instance, example of a URL matching this Details route would be:  `http://localhost:8080/#!//results/details/60875206`</div>

## Implement the UI 
1. In `Details.vue`, change the page name from **another** to **details** and add an event listener to call the `onPageBeforeAnimation` function before the page animates:

		<f7-page name="details" @page:beforeanimation="onPageBeforeAnimation">

### Navigation Bar 
1. Replace the current `<f7-navbar.../>` block with the following:

        <f7-navbar back-link="Back" sliding>
          <f7-nav-center>
            Details
          </f7-nav-center>
        </f7-navbar>

<img class="mobile-image" src="/images/stockpile/navbar2.png" alt="Stockpile Navbar"/>

### Page Content
Continuing in `Details.vue`...

1. Remove the `<f7-block-title .../>` and the entire `<f7-block inner...> component`.
2. Add a `card` component to contain the details of the image selected:

		<f7-card>
		</f7-card>

2. Next add this header component inside the `<f7-card../>` element which contains a container `<div/>` (styled later) to hold the image itself and its title. The image also has a `click` handler that will load the image in a photo browser component, and a `style` function it's bound to for setting the thumbnail URL with the appropriate size:

		<f7-card-header>
		  <div class="img-container" :style="imgBackground()"
		    @click="loadInPhotoBrowser">
		    <div class="img-container-inner" :style="imgBackground(500)"></div>
		    <div class="caption">{{item.title}}</div>
		  </div>
		</f7-card-header>

3. Next add the card content just after the card header added above: 

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


## Add JavaScript Handling
Now locate the the `<script>` tag that holds the JavaScript `export` block since you will be working in that section for the following steps.

1. Rename this component by changing the `name: Another` to `name: Details`

		export default {
	        name: 'Details',
	        ...
	    }

1. In the top of the `<script>` tag, add an [eslint exception for the global store object](https://eslint.org/docs/rules/no-undef)

		/* global store */

2. Then replace the `data()` method with one returning the global store object to provide access to it:

		data () {
		  return store;
		},

#### Add Computed Properties
3. After the `data ()` object, insert a new `computed` property block:

		computed: {
		},

6. In this new `computed` block, define `id` as a computed property:

		computed: {
          id () {
            const { id } = this.$route.params;
            return id;
          }
		},
        
6. Add in a computed property for `item`:
        
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
        
6. Add another computed property to return an array of photos for the Photo Browser component with just the one selected image in it:

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

<!--5. Add an empty `isFavorite` computed property to avoid compiler errors. You will code more there later in the guide when adding support for favorites:

		computed: {
          ...,
         isFavorite () {}
		}
   -->     
6. Lastly, add the following computed properties to set the path to the current item data to use for routing when a user clicks on the Category, Creator or Find Similar links:
		
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

#### Add Methods
1. Insert a `methods` object after the `data ()` object and before the `computed` properties block:

        methods: {
        }

2. Define a method stub for `fetchResults ()`:

		methods: {
		  fetchResults () {}
		}
        
3. Define the `loadInPhotoBrowser ()` method. This method is called when a card is clicked and will use the [Framework7 Photo Browser](http://framework7.io/vue/photo-browser.html) component you defined in the UI to open the image in a new window and allow it to be zoomed, panned etc:

        methods: {
          ...,
          loadInPhotoBrowser () {
            this.$refs.pb.open();
          }
        }
        
4. Define the `onPageBeforeAnimation` handler to disable exposition if enabled:

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

6. Add the `imgBackground ()` method to determine the specific sized thumbnail url to use: 

		methods: {
          ...,
          imgBackground (size = 0) {
            const url = size > 0 ? `thumbnail_${size}_url` : 'thumbnail_url';
            if (this.item[url]) this[url] = this.item[url];
            return `background-image: url(${this[url]})`;
          }
        }
        
<!--5. Include a method for toggling favorites, even though the favoriting support has not been added yet. You will revisit this method later:

		toggleFavorite () {}

-->
4. Install [`moment.js`](https://momentjs.com/) to use for date formatting: 
			
		npm install moment --save

   then at the start of the `<script>` tag, add an import for it: 

	import moment from 'moment';

   Add a computed property to calculate the `creationDate` using moment.js to format:

	computed: {
      ...,
      creationDate () {
        const created = moment(this.item.creation_date);
        return created.format('MMMM Do YYYY');
      }
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


## Run it
<img class="mobile-image" src="/images/stockpile/7-details.png" alt="Stockpile Details Screen"/>

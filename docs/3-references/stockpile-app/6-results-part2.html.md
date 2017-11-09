---
title: Lesson 6 - Results View Part 2 
url: references/stockpile-app/6-results-part2
layout: subpage
---
In part two you will add support for the more advanced features of the Results page, including displaying the array of results, infinite scrolling, preloading and more. 

## Add UI Components

1. Open `~src/components/pages/Results.vue` and replace the `<f7-page />` opening tag with:

		<f7-page name="results" @page:reinit="onPageReinit"
		  infinite-scroll @infinite="onInfiniteScroll"
		  :infinite-scroll-preloader="false">

    The above block:

    - Defines a page event handler called `onPageReinit` to call when the `reinit` event fires
    - Adds properties needed for [infinite scroll](https://framework7.io/docs/infinite-scroll.html) ability to the Results view and an event handler named `onInfiniteScroll ()` to call.

2. Replace the `<f7-block inner />` with the following content block that will display the images in a grid:

		<f7-block v-if="results">
		  <div class="grid">
		    <div class="cell"
		      v-if="!images.length"
		      v-for="n in 60"
		      :key="n">
		      <div class="placeholder" />
		    </div>
		    <div class="cell"
		      v-for="image in images"
		      @click="() => onImageClick(image.id)"
		      :key="image.id">
		      <img
		        :src="image.thumbnail_url"
		     />
		    </div>
		  </div>
		</f7-block>


	The above block:

     - Only displays if the `results` variable value is true
     - Uses the [Framework7 Grid Layout](http://framework7.io/vue/grid.html) 
     - Uses [Vue v-for](https://vuejs.org/v2/guide/list.html) to create placeholders for 60 images (the pre-defined results limit set)
     - Uses [Vue v-for](https://vuejs.org/v2/guide/list.html) to loop through the `images` array to display 
     - Sets an event handler called `onImageClick` to be called when an image is clicked (passing in the id of the image clicked.
        
2. Just before the closing `</f7-page>` tag, add a block to be displayed when there are no results returned:

		<f7-block v-if="!results">
		  <p class="center">No results found.</p>
		  <p class="center">Go back and try a different search?</p>
		</f7-block>
	
	The [`v-if`](https://vuejs.org/v2/guide/conditional.html) directive is used to determine if this block should display or not based on the `results` variable value.

3. Just after the block above (and before the closing `<f7-page>`), define a [preloader component](https://framework7.io/docs/preloader.html) to be displayed while the infinite scroll results are loaded:

		<div class="infinite-scroll-preloader">
		  <f7-preloader :style="images.length ? '' : 'display: none; animation: none'" />
		</div>

## Add JavaScript Handling
In this section you will add the event handlers for the UI components added in the previous section. This includes the two event handlers set in the `<f7-page>` component for handling page reinitialization and infinite scrolling and the event handler for when a user clicks on an image itself.

1. Add a `methods` object to the default export with a stub for `fetchResults ()`:

		methods: {
		  fetchResults () {}
		}

	You will revisit this method shortly. 
	
2. Add an `onImageClick` method to the `methods` object to route to the **Details** page when an image is clicked:

		onImageClick (id) {
		  // route to the details page
		  const { mainView: { router } } = this.$f7;
		  router.loadPage(`/results/details/${id}`);
		}

    The code above gets access to the Framework7 router object to then load the `Details` page for the image id clicked. (The Details page is not yet created but will be in the next lesson).
    

3. Add infinite scroll handling

Add the `onInfiniteScroll()`  method into the `methods` object to load the next set of images based on the limit/offset. 

	onInfiniteScroll () {
	  const limit = parseInt(this.limit, 10); // better safe
	  const offset = parseInt(this.offset, 10); // ...than sorry
	  if (this.totalReturned === this.images.length) {
	    return;
	  }
	  this.fetchResults(this.q, limit, this.filter, offset);
	}

3. Add Page Reinit handling

Code the `onPageReinit()` to handle when the app returns from deep navigation and needs to display the correct results. It refreshes the Global data store object with the data from this view. 

In the `methods` object, add the following:

	onPageReinit () {
	  // load the data for this page back into the store
	  Object.assign(window.store, {
	    images: this.images,
	    imagesById: this.imagesById,
	    totalReturned: this.totalReturned
	  });
	}

This method uses the new [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method to refresh the global `store` with the values from this view. You could also use the new [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) instead if it's fully supported everywhere you want your app to run.

<!-- TODO Use the screenshot on multiple-results- to explain how it's replacing the main store object with that page each time as you go back thru the history -->

## Fetch Results Handling
Previously in this guide you created a `stockAPI.js` file with some functions used to format the query and fetch the data from the Adobe Stock API. That file contains the `fetchStockAPIJSON` function needed now.

1. While in `Results.vue`, scroll down to the default export block and add the import for `fetchStockAPIJSON`:

		import fetchStockAPIJSON from '../../utils/stockAPI';
	
2. Now go back into the `fetchResults` method stub created previously and update the signature with 4 new parameters and add the two constant variables for `columns` and `parameters` arrays shown below:

		fetchResults (q, limit, filter, offset = 0) {
		        const columns = [
		          'nb_results', 'id', 'title', 'thumbnail_url', 'thumbnail_500_url',
		          'thumbnail_1000_url', 'content_type', 'creation_date',
		          'creator_name', 'creator_id', 'category', 'description',
		          'content_type', 'keywords', 'comp_url'
		        ];
		        const parameters = [
		          { key: 'thumbnail_size', val: '160' },
		          { key: 'limit', val: limit },
		          { key: filter, val: q },
		          { key: 'offset', val: offset }
		        ];		        

	The `columns` and `parameters` are used in the next step as parameters to the imported `fetchStockAPIJSON` function to use for creating the [query string to the Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html).
	
3. Just below the ending `parameters` array added above, add this next chunk of code into the `fetchResults` method:
 
		        fetchStockAPIJSON({ columns, parameters })
		          .then(json => {
		            // remove preloader if no results returned
		            //  either from the end of the pagination or no results
		            if (json.nb_results === 0) {
		              this.$$('.initial-preloader').remove();
		              this.$$('.infinite-scroll-preloader').remove();
		            }
		            // set initial totalReturned
		            //  only if nb_results is > existing totalReturned
		            //  this is because sometimes nb_results is 0
		            if (json.nb_results >= this.totalReturned) {
		              this.totalReturned = json.nb_results;
		            }
		            // set results bool to true if we have results
		            //  and false if we do not
		            this.results = !!this.totalReturned;
		            // merge the two arrays adding in the new results
		            this.images = this.images.concat(json.files);
		            // reduce the images array into an object referenced by id...
		            const imagesById = this.images.reduce((a, b) => {
		              const c = a;
		              c[b.id] = b;
		              return c;
		            }, {});
		            // ...then merge with existing imagesById
		            this.imagesById = Object.assign({}, this.imagesById, imagesById);
		            // update the store
		            // merging new and existing data using Object.assign()
		            window.store = Object.assign(window.store, {
		              images: this.images,
		              imagesById: this.imagesById,
		              totalReturned: this.totalReturned
		            });
		            // set the new offset
		            this.offset = offset + limit; // not working currently...see: issue #4
		            // remove the preloader if we have all the results
		            if (json.files.length === 0 || this.totalReturned <= limit) {
		              this.$$('.infinite-scroll-preloader').remove();
		            }
		          }).catch(ex => {
		            console.log('fetching failed', ex);
		            this.$f7.addNotification({
		              title: 'Error',
		              message: 'Failed to fetch from Adobe Stock',
		              hold: 3000
		            });
		            this.$$('.infinite-scroll-preloader').remove();
		          });
		      },

<!-- TODO - Explain the above -->


## Style the Images Grid
After the `<script>` tag, add the CSS to style the images grid:

	<style scoped>
	  /* default for phones / portrait */
	  .cell .placeholder {
	    width: 100%;
	    padding-top: 100%;
	    background: #fcfcfc;
	  }
	  .cell img {
	    display: block;
	    width: 100%;
	  }
	  .grid {
	    background: #fff;
	    display: flex;
	    flex-wrap: wrap;
	    flex-direction: row;
	  }
	  .cell {
	    background: #fcfcfc;
	    box-sizing: border-box;
	    margin: 4px;
	    width: calc(33% - 8px);
	  }
	  /* tablets / landscape */
	  @media screen and (min-width: 960px) {
	    .cell {
	      width: calc(25% - 8px);
	    }
	  }
	  /* desktop */
	  @media screen and (min-width: 1200px) {
	    .cell {
	      width: calc(20% - 8px);
	    }
	  }
	  .initial-preloader {
	    text-align: center;
	  }
	  .center {
	    text-align: center;
	  }
	</style>


4. Add a [lifecycle hook](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) to call `fetchResults` run when the Results instance is [`mounted ()`](https://vuejs.org/v2/api/#mounted).

The new `mounted ()` lifecycle hook should be added just AFTER the `computed:` block, and will be called when instance has been mounted:

		computed: {		
		   // 	just for reference	
		},		
		mounted () {
		      const { params } = this.$route;
		      // set some initial defaults
		      params.offset = parseInt(params.offset, 10) || 0;
		      params.limit = parseInt(params.limit, 10) || 60;
		      params.images = [];
		      params.totalReturned = 0;
		      Object.assign(this, params);
		      this.fetchResults(this.q, this.limit, this.filter, this.offset);
		}
		
This code will set up some defaults for the parameters and replace the current `params` with the new values (using `Object.assign`) before calling the `fetchResults()`. The parameters 

## Run it
<!-- Explain what you see and what it did - replace this image not right now-->

<!-- TODO - explain with screenshots with code breakpoints or a video or something? -->
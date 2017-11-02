---
title: Lesson 6 - Images Grid 
url: references/stockpile-app/6-images-grid
layout: subpage
---

## Add UI Components

1. Open `~src/components/pages/Results.vue` and replace the `<f7-page />` opening tag with:

		<f7-page name="results" @page:reinit="onPageReinit"
		  infinite-scroll @infinite="onInfiniteScroll"
		  :infinite-scroll-preloader="false">

    The above block:

    - Sets a page event handler to call when the `reinit` event occurs.
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


2. Just before the closing `</f7-page>` tag, add a block to be displayed when there are no results returned:

		<f7-block v-if="!results">
		  <p class="center">No results found.</p>
		  <p class="center">Go back and try a different search?</p>
		</f7-block>

3. Just after the block above (and before the closing `<f7-page>`), define a [preloader component](https://framework7.io/docs/preloader.html) to be displayed while the infinite scroll results are loaded:

		<div class="infinite-scroll-preloader">
		  <f7-preloader :style="images.length ? '' : 'display: none; animation: none'" />
		</div>

## Add JavaScript Handling
In this section you will add the event handlers for the UI components added in the previous section. This includes the two event handlers set in the `<f7-page>` component for handling page reinitialization and infinite scrolling and the event handler for when a user clicks on an image itself.

1. Add an `onImageClick` method to the `methods` object to route to the **Details** page when an image is clicked:

		onImageClick (id) {
		  // route to the details page
		  const { mainView: { router } } = this.$f7;
		  router.loadPage(`/results/details/${id}`);
		}

    The code above gets access to the Framework7 router object to then load the `Details` page for the image id clicked. (The Details page is not yet created but will be in the next lesson.
    

2. Add infinite scroll handling

Code the `onInfiniteScroll()` function to load the next set of images based on the limit/offset. 

	onInfiniteScroll () {
	  const limit = parseInt(this.limit, 10); // better safe
	  const offset = parseInt(this.offset, 10); // ...than sorry
	  if (this.totalReturned === this.images.length) {
	    return;
	  }
	  this.fetchResults(this.q, limit, this.filter, offset);
	}

3. Page Reinit handling

Code the `onPageReinit()` to handle when the app returns from deep navigation and needs to display the correct results. It refreshes the store with the data from this view. 

In the  `methods` object, add the following function:

	onPageReinit () {
	  // load the data for this page back into the store
	  Object.assign(window.store, {
	    images: this.images,
	    imagesById: this.imagesById,
	    totalReturned: this.totalReturned
	  });
	}

## Style the Images Grid
After the `<script>` tag, add the CSS for the images grid:

<!-- TODO -->

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

---
title: Lesson 5 - Results Page
url: references/stockpile-app/5-results-page
layout: subpage
---
Now you will code the results view presented when the search results are returned. The results page has a navigation bar, title, and uses a grid layout to display the images returned. It also has a preloaded component and a UI block to handle when no results are returned. An example of the final Results page is shown below. 

<img class="mobile-image" src="/images/stockpile/search-results.png" alt="Stockpile Results Screen"/>

## Implement the UI 

1. Rename `~src/components/pages/About.vue` to `Results.vue`. This page will encapsulate the functionality for our Results view.

2. In `Results.vue`, change the page name from **about** to **results**:

		<f7-page name="results">

3. Replace the entire `<f7-navbar .../>` block with simply:

		 <f7-navbar title="Results" back-link="Back" sliding></f7-navbar>

4. Replace the `<f7-block-title>` contents with

		<f7-block-title v-if="results">{{ imagesReturned }}</f7-block-title>

### Add JavaScript Handling
1. In the default export `data ()` function, change the `title` variable to `Results`, add an `images` property to contain an array to use in the global store and a `results` variable to manage if results were returned with an initial value of `true`:

		data () {
		      return {
		        title: 'Results',
		        images: [],
		        results: true
		      };
		 },


3. Add a `methods` object to the default export with a stub for `fetchResults ()`:

		methods: {
		  fetchResults () {}
		}

2. In the default export after `data ()`, add a [computed property](https://vuejs.org/v2/guide/computed.html) called `imagesReturned ()`:

		computed: {		
			imagesReturned () {
			  // build the string to display for the number of results
			  const { q } = this;
			  const { filter } = this.$route.params;
			  let message = 'Loading results...';
			  if (!this.images.length) return message;
			  // wait for something to be returned
			  switch (filter) {
			    case 'similar':
			      message = `${this.totalReturned} similar results to ${q}`;
			      break;
			    case 'creator_id':
			      const [ img ] = this.images;
			      message = `${this.totalReturned} results for ${img.creator_name}`;
			      break;
			    default:
			      message = `${this.totalReturned} results for "${q}"`;
			  }
			  return message;
			}
		}

<!-- TODO ((explain this function)) -->

 
<!-- ADD THIS LATER WHEN WE NEED TO USE IT WITH THE RESULTS GRID? -->


## Update Routes

Update the routes to use the new Results page and the side menu to remove the `About` link.

1. Open `~src/routes.js` and replace the import for `About` with 

	    import Results from './components/pages/Results';

2. Next replace the route for `/about/` with:

		{
		  path: '/results/:filter/:limit/:q/:referrer',
		  component: Results
		},

3. Lastly, remove the whole `<f7-list-item>` side menu link for `About` in `_src/components/LeftPanel.vue`.


## Run it
<img class="mobile-image" src="/images/stockpile/results-lesson1.png" alt="Stockpile Results Lesson 1 Screen"/>

## Fetch Polyfill

- Add [whatwg-fetch](https://github.github.io/fetch/)

## Content Security Policy Updates

- Modify CSP

## Fetch Data from Stock API

- Update fetchResults() 
- call fetchResults() in a lifecycle hook (explain lifecycle hooks)

## Run it
<!--TODO - Use the Chrome devtools to look at response even though UI not there yet
- Look at Vue devtools too

<img class="mobile-image" src="/images/stockpile/results-lesson1.png" alt="Stockpile Results Lesson 2 Screen"/>
-->

---
title: Lesson 5 - Results View Part 1
url: references/stockpile-app/5-results-part1
layout: subpage
---
The results view is presented when search results are returned. It displays a title showing the number of results returned and a grid to display the images. It also includes infinite scrolling and a preloader component to display while the results are fetched. 

<img class="mobile-image" src="/images/stockpile/results-view.png" alt="Stockpile Results Screen"/>
<!--<img class="mobile-image" src="/images/stockpile/search-results.png" alt="Stockpile Results Screen"/>-->

The results view is a little more extensive to code since it's built dynamically based on which view a user is coming from. It's returned from the main Search page but it's also used to show the results from the details page when a user clicks the *Category*, *Created by* or *Find Similar* link on the image details, outlined in red in the screenshot below:

<img class="mobile-image" src="/images/stockpile/details-results-routes.png" alt="Stockpile Details Results Routes Screen"/>

## Implement the UI 

1. Rename `~src/components/pages/About.vue` to `Results.vue`. 

2. In `Results.vue`, change the page name from **about** to **results**:

		<f7-page name="results">

3. Replace the entire `<f7-navbar .../>` block with simply:

		 <f7-navbar title="Results" back-link="Back" sliding></f7-navbar>

4. Replace the `<f7-block-title>` contents with

		<f7-block-title v-if="results">{{ imagesReturned }}</f7-block-title>

5. Remove this list component completely: 

		<f7-list>
		    <f7-list-item link="/about/another/" title="Another Page"></f7-list-item>
		 </f7-list>

### Add JavaScript Handling
1. In the default export `data ()` function, add an `images` property to contain an array to use in the global store and a `results` variable to manage if results were returned:

		data () {
		      return {
		        images: [],
		        results: true
		      };
		 },


2. In the default export after `data ()`, add the `imagesReturned ()` [computed property](https://vuejs.org/v2/guide/computed.html) which was referenced in the UI section above and will be used to format a string to dynamically display the number of results returned. 

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

<div class="alert--info">Since this view is shown from both the main search and after clicking on various items from the details view, a different message is shown depending on the type of search performed (by keyword, category, similar etc). A `filter` value from the route parameters is checked to determine which message to display. This value is set to 'words' to indicate a search by keyword if this results page is shown from the main Search page (in the [`onSubmit` function](https://github.com/phonegap/phonegap-app-stockpile/blob/master/src/components/pages/Search.vue#L52)), but will be set to `similar`, `creator_id`, or `category` if resulting from a click off the Details view. Look at the [**Details.vue** component in the final project](https://github.com/phonegap/phonegap-app-stockpile/blob/master/src/components/pages/Details.vue#L128-L153) to see these filters being set.</div>


<!-- TODO - add a note about the spread operator to replace the Object.assign 

```this.imagesById = Object.assign({}, this.imagesById, imagesById);
```
becomes
```this.imagesById = {...this.imagesById, imagesById};```

Link to https://babeljs.io/docs/plugins/transform-object-rest-spread/

Use the screenshot on multiple-results- to explain how it's replacing the main store object with that page each time as you go back thru the history

-->

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

3. Lastly, remove the whole `<f7-list-item>` side menu link for `About` in `~src/components/LeftPanel.vue`.

<!-- TODO - THIS MOVE UNTIL RESULTS PAGE AVAILABLE -->

## Handling Search Form submission
Before moving on to building out more of the Results page, you could revisit the Search page to code some action into the `onSubmit` form handler to route to this Results page in progress. 

1. Open `Search.vue` and replace the stubbed out `onSubmit ()` method with the following:

		onSubmit () {
		  const { searchInput, searchForm } = this.$refs;
		  const { filter, limit, q } = this.$f7.formToJSON(searchForm);
		  const { router } = this.$f7.mainView;
		  const input = searchInput.$el.querySelector('input');

		  input.blur();

		  if (!q.trim()) {
		    this.$f7.alert('Please enter a search term', 'Search Error');
		    return;
		  }
		  router.loadPage(`/results/${filter || 'words'}/${limit}/${q}/search`);
		}

## Run it
<!-- Explain what you see and what it did - replace this image not right now-->

<img class="mobile-image" src="/images/stockpile/results-lesson1.png" alt="Stockpile Results Lesson 1 Screen"/>
<!--TODO - Use the Chrome devtools to look at response even though UI not there yet
- Look at Vue devtools too-->



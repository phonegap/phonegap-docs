---
title: Lesson 5 - Results View Part 1
url: references/stockpile-app/5-results-part1
layout: subpage
---
The **Results** view is presented when search results are returned. It displays a title showing the number of results returned and a grid to display the images. It also includes infinite scrolling and a preloader component to display while the results are fetched. 

<img class="mobile-image" src="/images/stockpile/android/results.png" alt="Stockpile Results Screen"/>

The results view is a little more extensive to code since it's built dynamically based on which view a user is coming from. It's returned from the main Search page but it's also used to show the results from the details page when a user clicks the *Category*, *Created by* or *Find Similar* link on the image details, outlined in red in the screenshot below:

<img class="mobile-image" src="/images/stockpile/details-results-routes.png" alt="Stockpile Details Results Routes Screen"/>

## Renaming & Routing Updates
1. Rename the existing `~src/components/pages/About.vue` to `Results.vue`. 
2. Update the routing for this app to load the `Results` component instead of the `About` component. 

   Open `~src/routes.js` and replace the import of `About` with `Results`, for example:

	    import Search from './components/pages/Search';
	    import Results from './components/pages/Results';
	    ...

   Next, replace the route for the `/about/` with the following `path` and change the component name to `Results`:
   
	    {
		  path: '/results/:filter/:limit/:q/:referrer',
		  component: Results
		},
        
   This path uses [dynamic route matching by pattern](http://framework7.io/vue/navigation-router.html), so when this pattern is found in a URL, it will load the `Results` component and match the 4 variables passed in dynamically for `filter`, `limit`, `q` and `referrer`. 
   
   <div class="alert--tip">An example of a matching URL with this pattern would be:  `http://localhost:8080/#!//results/words/60/cat/search`. When you complete part 2 of the results page lesson you will see it dynamically change in your browser URL field each time the results page is loaded.</div>

3. You will also need to update the side menu for this step to remove the About item completely, since this results page will be loaded dynamically based on search results and never from the side menu. 

    Open `~src/components/LeftPanel.vue` and remove the whole `<f7-list-item ../>` element for the `/about/` link:

	    <f7-list-item
	        link="/about/"
	        title="About"
	        link-view="#main-view"
	        link-reload
	        link-close-panel
	    />

## Implement the UI 
1. In `Results.vue`, change the page name from **about** to **results**:

		<f7-page name="results">

2. Replace the entire `<f7-navbar .../>` block with the following line which will bind the `back-link` title to a computed property that you will code below:

		 <f7-navbar sliding :back-link="backLink" title="Results"></f7-navbar>

3. Replace the `<f7-block-title>` contents with

		<f7-block-title v-if="results">{{ imagesReturned }}</f7-block-title>

4. Remove the `<f7-list/>` component completely: 

		<f7-list>
		    <f7-list-item link="/about/another/" title="Another Page"></f7-list-item>
        </f7-list>

### Add JavaScript Handling
Now locate the the `<script>` tag that holds the JavaScript `export` block since you will be working in that section for the following steps.

1. Rename this component by changing the `name: About` to `name: Results`

		export default {
	        name: 'Results',
	        ...
	    }

1. In the default export `data ()` function, add an `images` property to contain an array to use in the global store and a `results` variable to manage if results were returned:

		data () {
          return {
            images: [],
            results: true
          };
		 },


3. After the `data ()` object, insert a new `computed` property block:

		computed: {
		}

6. In this new `computed` block, define the `backLink` computed property to determine which title to use on the link based on the route:

		computed: {
          backLink () {
            // back link label for iOS
            const { referrer } = this.$route.params;
            return referrer === 'details' ? 'Details' : 'Search';
          }
        }

7. Next add an `imagesReturned ()` computed property for the `imagesReturned` that was referenced in the UI section above. It will be used to format a string to dynamically display the number of results returned. 

		computed: {	
            ...,
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

<div class="alert--info">Since this view is shown from both the main search page and links on the details view, a different message is shown depending on the type of search performed (by keyword, category, similar etc). A `filter` value from the route parameters is checked to determine which message to display. This value is set to 'words' to indicate a search by keyword if this results page is shown from the main Search page (in the [`onSubmit` function](https://github.com/phonegap/phonegap-app-stockpile/blob/master/src/components/pages/Search.vue#L52)), but will be set to `similar`, `creator_id`, or `category` if resulting from a click off the Details view. Look at the [**Details.vue** component in the final project](https://github.com/phonegap/phonegap-app-stockpile/blob/master/src/components/pages/Details.vue#L128-L153) to see these filters being set.</div>

## Handling Search Form Submission
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
    
    The `onSubmit` method gathers the form data, ensures there was a search term entered and passes the parameters into the router to load the results page. At this point the routing is all wired up to display the results view from the search view, but the Stock API has not yet been called to populate the `images` array and the UI hasn't been added yet to handle those results. You will work on adding those pieces in the next lesson. 

## Run it
Run the app again in dev mode, enter a search term, hit the FIND IMAGES button and verify you see the following:

<img class="mobile-image" src="/images/stockpile/6-results-part1.png" alt="Stockpile Results Part 1 Screen"/>

The results page now loads with the "Loading results..." message (since there are no results yet) but there's nothing more to show yet. Move on to part 2 to begin adding the rest of the functionality for this view.

<div class="alert--tip">Note that the message component is tied to the `results` variable, which is defaulted to `true`. You could set it to `false` to test how the `v-if` applies and no message displays.</div>

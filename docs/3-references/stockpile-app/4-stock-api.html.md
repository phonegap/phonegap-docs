---
title: Lesson 4 - Using the Adobe Stock API
url: references/stockpile-app/4-stock-api
layout: subpage
---

The Stockpile app uses the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/) to retrieve images based on search criteria. There are some setup and configuration steps you will need to do first though to enable your app to query the Adobe Stock database. This lesson will walk you through each of those steps. 

## Obtaining a Stock API key
The Adobe Stock API requires a developer key however to allow you to make API calls to it, so in this lesson you'll go through the setup steps for querying the Adobe Stock database from our app. 

<div class="alert--info">You will need an Adobe ID to use the Stock API. If you don't have one yet, you will have the option to create one in the steps below. </div>

1. Open a browser and navigate to the [Adobe IO Console](https://console.adobe.io/integrations)

2. Login with your Adobe ID (or create a new Adobe ID)

2. Click **"New Integration"**, then choose "Access an API"

3. Next choose **"Adobe Stock"** and **"OAuth Integration"** below that

4. Choose **"New integration"**

5. Give your integration a name like "Stockpile" and a Description like "A test Adobe Stock integration with a PhoneGap app"

6. Choose **"Web"** as the platform

7. The Default redirect URI part is not used by this app, so put in any URL (preferably your own). I have used 
"https://phonegap.com" and "https://phonegap\.com" for the Redirect URI pattern.

8. Prove you are not a robot, then click the Create integration button

9. Your integration has been created. Click **"Continue to integration details"** to get your API key

10. Your API key will be under **"API Key (Client ID)"** on the left. 


## Key Config.js
Now that you've obtained a key, you will need to have it available for use by the API calls. One way to do this is to create a configration file to store the properties. 

1. Create a new `utils` folder under `~src`
2. Create a file named `config.js` under `~src/utils/`
3. Paste in the following header data, to match the header data format the Adobe Stock API requires:

        export const apiHeaders = {
          'x-api-key': '*******************************', // replace with your api-key
          'X-Product': 'Stockpile/1.0.0'
        };

## Fetch Polyfill

You will be using the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in this app, and currently a polyfill is required for devices running Android 4.x and iOS < 10, so to ensure device compatibility, in this step you should add the [whatwg-fetch](https://github.github.io/fetch/) library: 
	
	npm install whatwg-fetch --save 

   then make it available for use by opening `main.js` and adding the following at the top of the file just under the `babel-polyfill` import:

	import 'whatwg-fetch';

## Content Security Policy Updates
You'll also need to update the Content Security Policy for the app to allow content to come from Adobe Stock API by including its URL (https://stock.adobe.io). 

  Open `index.html` and replace the current CSP with:

		<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com https://
	stock.adobe.io 'unsafe-eval' 'unsafe-inline' ws://*; style-src 'self' 'unsafe-inline'; media-src *; img-src * data:">

## Add JavaScript handling
To keep things more readable and maintainable for this app, it's better to separate the functions for interacting with the Stock API in a separate JavaScript file. 

1. Now in the `utils` folder you created above, create a new file named `stockAPI.js` and add the following content:

		/* global fetch */

		import { apiHeaders } from './config';

		const apiBase = 'https://stock.adobe.io/Rest/Media/1/Search/Files';

		// function to format an array of columns into the query string needed
		export function formatResultColumns (columns) {
		  if (columns.length < 1) return '';
		  return `result_columns[]=${columns.join('&result_columns[]=')}`;
		}

		// function to format an object containing parameters into the query string needed
		export function formatSearchParameters (parameters) {
		  return parameters
		    .map(param => `search_parameters[${param.key}]=${param.val}`)
		    .join('&');
		}

		// function to call the Adobe Stock API and return the results
		export default function fetchStockAPIJSON (options) {
          const { columns, parameters } = options;
          const resultColumns = formatResultColumns(columns);
          const searchParameters = formatSearchParameters(parameters);
          const apiURL = `${apiBase}?${resultColumns}&${searchParameters}`;
          const myInit = {
            method: 'GET',
            headers: new Headers(apiHeaders)
          };
          return new Promise((resolve, reject) => {
            fetch(apiURL, myInit)
              .then(response => response.json())
              .then((json) => {
                resolve(json);
              }).catch((ex) => {
                reject(ex);
              });
          });
		}
		
These functions format the query string to pass in to the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html). They take your config.js header (with API key) and format the parameters and search criteria into a query string, then fetch the results from the Adobe Stock API. The `fetchStockAPIJSON ()` is called from the **Search** view when the **Find Images** button is clicked.

## Adobe Stock API request/results
[The Adobe Stock Search API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html) has a number of parameters you can pass in depending on what you're trying to query. Take a look at this documentation for details on why certain parameters were used in this app.

---
title: Lesson 4 - Using the Adobe Stock API
url: references/stockpile-app/4-stock-api
layout: subpage
---

The Stockpile app uses the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/) to retrieve images based on search criteria. There are some setup and configuration steps you will need to do first though to enable your app to query the Adobe Stock database. This lesson will walk you through each of those steps.

## Obtaining a Stock API key
The Adobe Stock API requires a developer key to make API calls to it, so in this lesson you'll go through the setup steps for querying the Adobe Stock database from our app.

<div class="alert--tip">You will need an Adobe ID to use the Stock API. If you don't have one yet, you will have the option to create one in the steps below. </div>

1. Open a browser and navigate to the [Adobe IO Console](https://console.adobe.io/integrations)

  ![](/images/stockpile/stockapi/01-adobe-i0-console.png)

2. Login with your Adobe ID (or create a new Adobe ID)

  ![](/images/stockpile/stockapi/02-new-integrations.png)

2. Click **"New Integration"**, then choose "Access an API"

  ![](/images/stockpile/stockapi/03-access-an-api.png)

3. Next choose **"Adobe Stock"** and **"OAuth Integration"** below that

  ![](/images/stockpile/stockapi/04-adobe-stock-oauth.png)

4. Choose **"New integration"**

  ![](/images/stockpile/stockapi/05-create-new-integration.png)

5. Give your integration a name like "Stockpile" and a Description like "A test Adobe Stock integration with a PhoneGap app"

  ![](/images/stockpile/stockapi/06-create-new-integration-pt2.png)

6. Choose **Web** as the platform

7. The Default redirect URI part is not used by this app, so put in any URL (preferably your own) (ie: "https://phonegap.com" and "https://phonegap\.com" for the Redirect URI pattern).

8. Prove you are not a robot, then click the **Create integration** button

9. Your integration has been created. Click **Continue to integration details** to get your API key

  ![](/images/stockpile/stockapi/07-integration-completed.png)

10. Your API key will be under **API Key (Client ID)** on the left.

 ![](/images/stockpile/stockapi/08-api-key.png)

## Config.js
Now that you've obtained a key, you will need to have it available for use by the API calls. One way to do this is to create a configration file to store the properties.

1. Create a new `utils` folder within the `src` folder
2. Create a file named `config.js` under `~src/utils/`
3. Paste in the following header data to match the header data format the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html) requires, replacing the `x-api-key` parameter with your new API key:

        export const apiHeaders = {
          'x-api-key': '*******************************', // replace with your api-key
          'X-Product': 'Stockpile/1.0.0'
        };

## Fetch Polyfill
You will be using the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in this app, and currently a polyfill is required for devices running Android 4.x and iOS < 10, so to ensure device compatibility, in this step you should add the [whatwg-fetch](https://github.github.io/fetch/) library. Begin by installing it first:
	
	npm install whatwg-fetch --save 

   then import it for use by opening `main.js` and adding the following at the top, just below the `babel-polyfill` import:

	import 'whatwg-fetch';

## Content Security Policy Updates
You'll also need to update the Content Security Policy for the app to allow content to come from Adobe Stock API by including its URL (https://stock.adobe.io) in the meta tag.

  Open the `index.html` file and replace the `<meta>` tag with the current CSP to:

    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com https://stock.adobe.io 'unsafe-eval' 'unsafe-inline' ws://*; style-src 'self' 'unsafe-inline'; media-src *; img-src * data:">

## Add JavaScript handling
To keep things more readable and maintainable for this app, it's better to code the functions for interacting with the Stock API in a separate JavaScript file.

1. In the `utils` folder you created above, create a new file named `stockAPI.js` and add the following content:

		`/* global fetch */`

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
		
These functions format the query string to pass in to the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html). They take the `config.js` header (with the API key) and format the parameters and search criteria into a query string, then fetch the results from the Adobe Stock API. The `fetchStockAPIJSON ()` is called from the **Search** view when the **Find Images** button is clicked.

## Adobe Stock API request/results
[The Adobe Stock Search API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html) has a number of parameters you can pass in depending on what you're trying to query. Take a look at the documentation for details on why certain parameters were used in this app.

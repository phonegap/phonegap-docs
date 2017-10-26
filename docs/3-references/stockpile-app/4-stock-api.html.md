---
title: Lesson 4 - Using the Adobe Stock API
url: references/stockpile-app/4-stock-api
layout: subpage
---

The Stockpile app uses the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/) to retrieve images based on search criteria. The Adobe Stock API requires a developer key however to allow you to make API calls to it, so in this lesson we'll go through the steps to get set up for querying the Adobe Stock database from our app.

<div class="alert--info">You will need an Adobe ID to use the Stock API. If you don't have one yet, you will have the option to create one in the steps below. 
</div>

## Obtaining a Stock API key
1. Navigate your browser to the [Adobe IO Console](https://console.adobe.io/integrations)
2. Login with your Adobe ID (or create a new Adobe ID).
2. Click "New Integration", then choose "Access an API" --Continue
3. Next choose "Adobe Stock" and "OAuth Integration" below that -- Continue
4. Choose "New integration" -- Continue
5. Give your integration a name like "Stockpile" and a Description like "A test Adobe Stock integration with a PhoneGap app"
6. Choose Web as the platform
7. The Default redirect URI part is not used by this app, so put in any URL (preferably your own). I have used "https://phonegap.com" and "https://phonegap\.com" for the Redirect URI pattern.
8. Prove you are not a robot, then click the Create integration button
9. Your integration has been created. Click "Continue to integration details" to get your API key
10. Your API key will be under "API Key (Client ID)" on the left. You'll need to use that instead of the dummy key in src/utils/config.js

## Understanding the Stock API request/result format

## Add JavaScript handling

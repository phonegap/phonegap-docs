---
title: Lesson 8 - Favorites Page
url: references/stockpile-app/8-favorites-page
layout: subpage
---

## Add the JavaScript

- Create favorites.js

## Handle adding a favorite in Details.vue

- Add the star button to the navbar

```html
  <f7-nav-right>
    <f7-link icon-f7="star_filled" @click="toggleFavorite"
      v-if="isFavorite"
    />
    <f7-link icon-f7="star" @click="toggleFavorite" v-else />
  </f7-nav-right>
```

- Add computed properties and other JS to handle favorites on Details page

## Favorites Page

- Rename Services.vue to Favorites.vue
- Remove the whole `<div>` block contents from Favorites.vue
- Rename any reference of Services to Favorites
- Add the f7-navbar, f7-list components etc
- Add the JS handling code

## Update the Route

- Update routes.js to point to new Favorites page instead of Services
- Update LeftPanel.vue to change Services link to Favorites

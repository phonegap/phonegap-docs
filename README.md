# PhoneGap Documentation [![Travis Badge](https://travis-ci.org/phonegap/phonegap-docs.svg)](https://travis-ci.org/phonegap/phonegap-docs/)

> Available for your viewing pleasure at [docs.phonegap.com](http://docs.phonegap.com/).

## Installation

```bash
npm install
```

## Running Local Server

```bash
npm start
```

This will start a local server in development mode. The server will generate
all of the documentation to `/out` and watch for file changes. When a file is
changed, BrowserSync will regenerate the file and refresh your browser.

## Directory Structure

```
\
 phonegap-docs/
 |
 |__ assets/      # Assets that need to be rendered
 |   |
 |   |__ styles/  # Stylus files rendered to /out/styles/**/*.css
 |
 |__ docs/        # Markdown documents rendered to /out/**/*.html
 |
 |__ layouts/     # Layouts and view templates
 |
 |__ out/         # Outputted static website
 |
 |__ public/      # Static assets copied to /out/**/*
 |
 |__ docpad.json  # Configuration
```

## Deployment

### Production

Each commit to the `master` branch is deployed to http://docs.phonegap.com.

### Staging

Each commit to the `stage` branch is deployed to http://stage.docs.phonegap.com.

Commits to `master` do _not_ need to be staged. Staging is intended to test
work that may cause issues in production, in particle design focused changes.
For this reason, the staging branch is mutable. Feel free to delete it or force
push over its history.

## FAQ

### Generator error from the "next" article returning a null object.

You may see an error such as :

```bash
error: Something went wrong while rendering: /Users/mwbrooks/Development/lib/phonegap-docs/docs/tutorials/optimize/index.html.jade
The error follows:

TypeError: /Users/mwbrooks/Development/lib/phonegap-docs/layouts/tutorialspage.html.jade:21
    19|       .prev &nbsp;
    20|     -if(document.next)
  > 21|       - var next = getCollection("html").findOne({url:document.next}).toJSON();
    22|       a.page__navigation--next(href=next.url)!= "Next: "+next.title
    23|     -else
    24|       .prev &nbsp;

Cannot read property 'toJSON' of null
```

This is because you are linking directly to the HTML document instead of it's
clean URL directory path. Our generator uses the Clean URL plugin, which
transforms each `file.html` into `file/index.html`. The original `file.html`
continues to exist but will redirect to `file/index.html`.

When referencing a file, you should reference `path/to/file` instead of
`path/to/file.html`. Referencing the HTML document will generate the error above.

# be sure to lint by running npm lint which doesnt work

# this runs through circle-ci so go there if it doesnt work.  whats the link? dunno.

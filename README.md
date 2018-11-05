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

## Running markdownlint

Running markdownlint will return a list of syntax errors that should be fixed
before deployment.

```bash
npm run lint
```

## Tests

### Requirements

A running [ruby](https://www.ruby-lang.org/en/) environment is a must, along
with a working `gem` command. Ensure you have the `bundle` command available
by installing bundler, then also retrieve all test-running dependencies via
`bundle install`:

```bash
gem install bundler
bundle install
```

### Running Tests

The tests check the _generated_ documentation, so ensure you are either running
the local server or have manually generated the documentation via a `npm run
build` before running the tests!

```bash
npm run test
```

## Named Anchors

If you want to use in-page navigation you should use named anchors, and not the
`id` property of html elements.

```markdown
* [A link to a different place in the page](#different-place)

<a name="different-place" class="anchor"></a>
```

## Directory Structure

```sh
\
 phonegap-docs/
 |
 |__ assets/      # Assets that need to be rendered
 |   |
 |   |__ styles/  # Stylus files rendered to /out/styles/**/*.css
 |
 |__ docs/        # Markdown documents rendered to /out/**/*.html
 |
 |__ drafts/      # ???
 |
 |__ layouts/     # Layouts and view templates
 |
 |__ out/         # Outputted static website
 |
 |__ public/      # Static assets copied to /out/**/*
 |
 |__ scripts/     # ???
 |
 |__ spec/        # Tests?
 |
 |__ vendor/      # ???
 |
 |__ docpad.json  # Configuration
```

## Deployment

### Production

Each commit to the `master` branch is deployed to [docs.phonegap.com](http://docs.phonegap.com).

### Staging

Each commit to the `stage` branch is deployed to [stage.docs.phonegap.com](http://stage.docs.phonegap.com).

Commits to `master` do _not_ need to be staged. Staging is intended to test
work that may cause issues in production, in particular design focused changes.
For this reason, the `stage` branch is mutable. Feel free to delete it or force
push over its history.

## FAQ

### Generator error from the "next" article returning a null object.

You may see an error such as :

```bash
error: Something went wrong while rendering: /Users/mwbrooks/Development/lib/phonegap-docs/docs/tutorials/optimize/index.html.pug
The error follows:

TypeError: /Users/mwbrooks/Development/lib/phonegap-docs/layouts/tutorialspage.html.pug:21
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

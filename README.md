# PhoneGap Documentation

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
changed, LiveReload will regenerate the file and refresh your browser.

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

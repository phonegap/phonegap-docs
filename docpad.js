var path = require('path');



let version = require('./package.json').version;
console.log('generating as docVersion : ' + version);


module.exports = {
  "srcPath": ".",
  "documentsPaths": [
    "docs",
    "assets"
  ],
  "filesPaths": [
    "public"
  ],
  "layoutsPaths": [
    "layouts"
  ],
  "regenerateDelay": 0,
  "watchOptions": {
    "catchupDelay": 0
  },
  "templateData": {
    "docVersion":version,
    "githuburl": function(slug){
      var reposlug = (process.env.TRAVIS_REPO_SLUG)? process.env.TRAVIS_REPO_SLUG : "phonegap/phonegap-docs";
      var gitbranch = (process.env.TRAVIS_BRANCH)? process.env.TRAVIS_BRANCH : "master";
      gitbranch = (process.env.CI_BRANCH)? process.env.CI_BRANCH : gitbranch;
      return "https://github.com/"+ reposlug +"/blob/"+ gitbranch +"/docs/"+slug;
    }
  },
  "plugins": {
    "cleanurls": {
      "trailingSlashes": true,
      "static": true,
      getRedirectTemplate: function(url, title) {
        if(url != "/") {
          url = (url.lastIndexOf('/') == url.length - 1)? url : url + "/";
          url = (url.indexOf('/') == 0)? url: "/" + url;
        }
        let retTemplate =
`<!DOCTYPE html>
<html>
<head>
  <title>${title || 'Redirect'}</title>
  <meta http-equiv="REFRESH" content="0; url=${url}">
  <link rel="canonical" href="${url}"/>
</head>
<body>
  This page has moved. You will be automatically redirected to its new location.
  If you aren't forwarded to the new page, <a href="${url}">click here</a>.
  <script>document.location.href="${url}"</script>
</body>
</html>`;
        return retTemplate;
      }
    },
    "stylus": {
      "stylusLibraries": {
        "nib": false,
        "autoprefixer-stylus": true
      },
      "stylusOptions": {
        "compress": true,
        "include css": true
      }
    }
  },
  "environments": {
    "development": {
      "stylusOptions": {
        "compress": false
      }
    }
  },
  "ignorePaths": [
    /**
     * Ignore output directory to prevent watch triggering
     * when outPath is written. This happens because srcPath
     * is the rootPath instead of a subdirectory.
     */
    path.join(process.cwd(), "out")
  ],
  "collections": {
    /**
     * Set default layout for all markdown documents.
     */
    navItems: function() {
      return this.getCollection('html')
      .findAllLive({}, [{ fullPath:1 }]);
    },
    docs: function() {
      return this.getCollection('documents')
        .findAllLive({ extension: 'md' }, [{ filename: -1 }])
        .on('add', function(model) {
          model.setMetaDefaults({ 'layout': 'default' });
        });
    },
    gsDocs: function() {
      return this.getCollection('html')
          .findAllLive({ extension: 'md' })
    },
    getStartedDocs: function() {
      return this.getCollection('gsDocs')
          .findAllLive({url: {$startsWith:'getting-started/' }}, [{ relativeBase: 1 }])
    },
    referenceDocs: function() {
      return this.getCollection('gsDocs')
          .findAllLive({url: {$startsWith:'references/' }}, [{ relativeBase: 1 }])
    },
    tutorialDocs: function() {
        return this.getCollection('gsDocs')
            .findAllLive({url:{$startsWith:'tutorials/'}}, [{ relativeBase: 1 }])
    },
    pgbDocs: function() {
      let retVal = this.getCollection('gsDocs')
        .findAllLive({url:{$startsWith:'phonegap-build/'}}, [{ relativeBase: 1 }]);
      return retVal;
    }
  }
};

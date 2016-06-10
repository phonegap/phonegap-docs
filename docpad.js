var path = require('path');

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
    "githuburl": function(slug){
      var reposlug = (process.env.TRAVIS_REPO_SLUG)? process.env.TRAVIS_REPO_SLUG : "phonegap/phonegap-docs";
      var gitbranch = (process.env.TRAVIS_BRANCH)? process.env.TRAVIS_BRANCH : "master";
      gitbranch = (process.env.CI_BRANCH)? process.env.CI_BRANCH : "master";
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
        return "<!DOCTYPE html>\n<html>\n	<head>\n		<title>" + (title || 'Redirect') + "</title>\n		<meta http-equiv=\"REFRESH\" content=\"0; url=" + url + "\">\n		<link rel=\"canonical\" href=\"" + url + "\" />\n	</head>\n	<body>\n		This page has moved. You will be automatically redirected to its new location. If you aren't forwarded to the new page, <a href=\"" + url + "\">click here</a>.\n		<script>document.location.href = \"" + url + "\"</script>\n	</body>\n</html>";
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
    },
    "browsersync": {
      "open": true,
      "ghostMode": {
          "clicks": true,
          "location": true,
          "forms": true,
          "scroll": true
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
      return this.getCollection('gsDocs')
          .findAllLive({url:{$startsWith:'phonegap-build/'}}, [{ relativeBase: 1 }])
    }
  }
};

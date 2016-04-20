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
    }
  }
};

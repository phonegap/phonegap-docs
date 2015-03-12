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
    "stylus": {
      "stylusLibraries": {
        "nib": true
      },
      "styleusOptions": {
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
  "watchOptions": {
    /**
     * Improve livereload responsiveness on OS X.
     */
    "preferredMethods": ["watch", "watchFile"]
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
     * Added side-effect that markdown documents do not require
     * the .html.md convention, since the layout defines HTML output.
     */
    docs: function() {
      return this.getCollection('documents')
        .findAllLive({ extension: 'md' }, [{ filename: -1 }])
        .on('add', function(model) {
          model.setMetaDefaults({ 'layout': 'default' });
        });
    }
  }
};

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

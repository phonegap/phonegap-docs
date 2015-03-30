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
        "nib": false,
        "autoprefixer-stylus": true
      },
      "styleusOptions": {
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
    docs: function() {
      return this.getCollection('documents')
        .findAllLive({ extension: 'md' }, [{ filename: -1 }])
        .on('add', function(model) {
          model.setMetaDefaults({ 'layout': 'default' });
        });
    },

    /**
     * Update all `name.md` to `name.html.md`.
     * Question: Is there a better way to accomplish this?
     */
    md: function() {
      return this.getCollection('documents')
        .findAllLive({ extensions: ['md'] }, [{ filename: -1 }])
        .on('add', function(model) {
          model.set('filename', model.get('filename').replace('.md', '.html.md'));
          model.set('extensions', ['html', 'md']);
          model.set('outExtension', 'html');
          model.set('outPath', model.get('outPath').replace('.md', '.html.md'));
          model.set('outFilename', model.get('outFilename').replace('.md', '.html.md'));
          model.set('outContentType', 'text/html');
        });
    }
  }
};

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
      startGuides: function () {
          var startGuides = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/guides[\/\\]start/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return startGuides;
      },
      cliGuides: function () {
          var cliGuides = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/guides[\/\\]cli/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return cliGuides;
      },
      desktopGuides: function () {
          var desktopGuides = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/guides[\/\\]desktop/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return desktopGuides;
      },

      configTutes: function () {
          var configTutes = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/tutorials[\/\\]configure/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return configTutes;
      },
      devTutes: function () {
          var devTutes = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/tutorials[\/\\]develop/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return devTutes;
      },
      debugTutes: function () {
          var debugTutes = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/tutorials[\/\\]debug/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return debugTutes;
      },
      optTutes: function () {
          var optTutes = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/tutorials[\/\\]optimize/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return optTutes;
      },
      distribTutes: function () {
          var distribTutes = this.getCollection("html")
              .findAllLive({relativeOutDirPath:/tutorials[\/\\]distribute/, relativeBase:/^((?!index).)*$/},[{ filename: 1 }])
          return distribTutes;
      },
    /**
     * Set default layout for all markdown documents.
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

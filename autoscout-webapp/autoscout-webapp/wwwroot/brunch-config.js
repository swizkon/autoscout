exports.config = {
    // See http://brunch.io/#documentation for docs.
    files: {
      javascripts: {
        joinTo: "js/app.js"
      },
      stylesheets: {
        joinTo: "css/app.css",
        order: {
          after: ["src/css/app.css"] // concat app.css last
        }
      },
      templates: {
        joinTo: "js/app.js"
      }
    },
  
    conventions: {
      assets: /^(src\/assets)/
    },
    
  
    // Phoenix paths configuration
    paths: {
      // Dependencies and current project directories to watch
      watched: [
        "src",
        "web/static",
        "test/static"
      ]
    },
  
    // Configure your plugins
    plugins: {
      babel: {
        // Do not use ES6 compiler in vendor code
        ignore: [/src\/vendor/]
      }
    },
    modules: {
      autoRequire: {
        "js/app.js": ["src/js/app"]
      }
    },
    npm: {
      enabled: true
    }
  };
  
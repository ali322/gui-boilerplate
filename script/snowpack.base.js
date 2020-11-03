module.exports = {
  "extends": "@snowpack/app-scripts-react",
  "exclude": ["**/node_modules/**/*", "**/script/**/*", "**/main/**/*"],
  "mount": {
    "renderer": "/_dist_",
    "static": "/"
  },
  "plugins": [
    "@snowpack/plugin-sass"
  ],
  "devOptions": {
    "port": 8080,
    "open": "none"
  }
}

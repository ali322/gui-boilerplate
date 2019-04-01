# GUI Boilerplate

[![Build Status](https://travis-ci.org/ali322/gui-boilerplate.svg?branch=master)](https://travis-ci.org/ali322/gui-boilerplate)
[![Maintainability](https://api.codeclimate.com/v1/badges/e99864723feb8265a24b/maintainability)](https://codeclimate.com/github/ali322/gui-boilerplate/maintainability)

build gui application with electron + vue in typescript

Develop
===
1. clone to your local disk `git clone https://github.com/ali322/gui-boilerplate`
2. run `npm install`
3. run `npm run dll` to generate vendor dll files when first start
4. run `npm start` to start develop
5. run `npm run pack` to pack


Directory structure
===

```sh
script/
  |-- ...         # build and pack script
renderer/
  |-- asset/      #images,fonts and so on
  |-- page/
      |-- index/  #index scene's entry js and css
      |-- .../    #more your own scene's entry js and css,like index page
main/
  |-- index.js      # main electron process entry
  |-- index.dev.js  # main electron process entry in develop mode
  |-- ipc.js        # communication between main process and renderer process
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
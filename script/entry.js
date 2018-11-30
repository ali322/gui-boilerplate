const { resolve } = require('./util')
const { join } = require('path')
const fromPairs = require('lodash/fromPairs')

let mods = ['index']

module.exports = fromPairs(mods.map( mod => [mod, resolve(join('app', 'scene', mod, `${mod}.js`))]))
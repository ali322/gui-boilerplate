const { join } = require('path')
const fromPairs = require('lodash/fromPairs')
const { scenePath, scenes } = require('./base')

module.exports = fromPairs(scenes.map(scene => [scene, join(scenePath, scene, `${scene}.js`)]))
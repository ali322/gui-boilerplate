const { resolve } = require('./util')
const { pagePath } = require('./constant')
const { join } = require('path')
const fromPairs = require('lodash/fromPairs')

const entry = ['index', 'updater']

module.exports = fromPairs(
  entry.map(key => {
    return [
      key,
      [
        join(pagePath, key, 'index.tsx'),
        join(pagePath, key, 'index.less')
      ]
    ]
  })
)

const { join } = require('path')
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'
import { terser } from 'rollup-plugin-terser'

const resolve = (p) => {
  return join(__dirname, '..', p)
}

export default {
  input: resolve('main/index.ts'),
  output: {
    dir: 'dist/main',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    nodeExternals(),
    nodeResolve({
      preferBuiltins: false
    }),
    typescript({
      tsconfig: resolve('main/tsconfig.json')
    }),
    terser()
  ]
}
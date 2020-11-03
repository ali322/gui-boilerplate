module.exports = {
  extends: '@snowpack/app-scripts-react',
  exclude: ['**/node_modules/**/*', '**/script/**/*', '**/main/**/*'],
  mount: {
    renderer: '/_dist_',
    static: '/'
  },
  plugins: ['@snowpack/plugin-sass'],
  installOptions: {
    externalPackage: ['fs', 'path'],
    polyfillNode: true
    // rollup: {
    //   plugins: [require('rollup-plugin-node-polyfills')({
    //     path: true, fs: true
    //   })]
    // }
  },
  devOptions: {
    port: 8080,
    open: 'none'
  }
}

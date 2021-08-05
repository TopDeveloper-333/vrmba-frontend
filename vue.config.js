const path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [
    ],
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '~': path.join(__dirname, './src/js')
      }
    }  
  },

  lintOnSave: false
}

module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      css: {
        // Options du loader CSS
      }
    }
  }
};


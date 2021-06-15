const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
  assetPrefix: '/album/',
  basePath: '/album',
}
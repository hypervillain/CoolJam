const path = require('path')

const root = path.join(__dirname, '..')

module.exports = {
  root,

  kit: path.join(root, 'kit'),

  entry: path.join(root, 'kit', 'entry'),

  webpack: path.join(root, 'kit', 'webpack'),

  src: path.join(root, 'app'),

  static: path.join(root, 'static'),

  dist: path.join(root, 'dist'),

  public: path.join(root, 'dist', 'public'),
}

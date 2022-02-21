const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options) => {
  return {
    ...options,
    optimization: {
      minimize: true,

      minimizer: [
        new TerserPlugin({
          extractComments: true,
        }),
      ],
    },
  };
};

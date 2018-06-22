const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack'); // eslint-disable-line import/no-unresolved

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  actions.setWebpackConfig({
    output: {
      // Needed to compile multiline strings in Cesium
      sourcePrefix: '',
    },
    amd: {
      // Enable webpack-friendly use of require in Cesium
      toUrlUndefined: true,
    },
    node: {
      // Resolve node module use of fs
      fs: 'empty',
    },
    resolve: {
      alias: {
        // Cesium module name
        cesium$: path.resolve(__dirname, cesiumSource, 'Cesium'),
      },
    },

    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
      ]),

      new DefinePlugin({
        // Define relative base path in Cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify(''),
      }),
    ],

    module: {
      rules: [
        // Load glTF assets as files
        {
          test: /\.gl(tf|b)$/,
          use: loaders.url(),
        },
      ],

      // Avoid warnings from some third-party AMD-formatted modules
      // Source: https://github.com/AnalyticalGraphicsInc/cesium/issues/4876
      unknownContextCritical: false,
    },
  });

  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      module: {
        rules: [
          // Strip Cesium debug pragmas
          {
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, cesiumSource),
            use: [
              {
                loader: 'strip-pragma-loader',
                options: {
                  pragmas: {
                    debug: false,
                  },
                },
              },
            ],
          },
        ],
      },
    });
  }
};

/**
 * Default modules loader for image assets.
 */
export const models = {
  test: /\.(gltf)$/,
  loader: 'gltf-loader',
  exclude: /node_modules/,
  generator: {
    filename: 'assets/models/[contenthash][ext]',
  },
};

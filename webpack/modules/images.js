/**
 * Default modules loader for image assets.
 */
export const images = {
  test: /\.(bin|gif|ico|jpe?g|png|svg|webp)$/,
  type: 'asset/resource',
  generator: {
    filename: 'assets/images/[contenthash][ext]',
  },
};

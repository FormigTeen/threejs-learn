const path = require('path');

module.exports = {
    entry: './src/client/client.ts',
    module: {
        rules: [
            {
                test: /\.gltf$/,
                loader: 'gltf-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(bin|jpe?g|png)$/,
                loader: 'file-loader',
                options: { esModule: false },
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.glsl$/,
                use: 'raw-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
        publicPath: path.resolve(__dirname, '../../dist/client'),
    }
};

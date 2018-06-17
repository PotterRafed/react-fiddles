var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/github-usercards/main.jsx',
    output: {
        // Output the bundled file.
        path: __dirname + '/dist',
        // Use the name specified in the entry key as name for the bundle file.
        filename: 'react-bundle.js'
    },
    module: {
        rules: [
            {
                // Test for js or jsx files.
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "index.html",
            filename: "index.html"
        })
    ],
    // externals: {
    //     // Don't bundle the 'react' npm package with the component.
    //     'react': 'React'
    // },
};
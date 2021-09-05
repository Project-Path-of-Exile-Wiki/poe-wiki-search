const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry: {
        background: "./src/background/background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./build"),
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src",
                    globOptions: {
                        ignore: ["**/background", "**/*.spec.js"],
                    },
                },
                { from: "./LICENSE" },
                { from: "./privacy-policy.txt" },
            ],
        }),
    ],
}

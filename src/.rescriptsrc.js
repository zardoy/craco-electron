const modifyWebpackConfig = (webpackConfig) => {
    webpackConfig.target = "electron-renderer";
    return webpackConfig;
}

module.exports = [
    ["use-babel-config", {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }],
    modifyWebpackConfig
];
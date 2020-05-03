// 安装less less-loader
// yarn add less less-loader -D
// 安装compression-webpack-plugin 压缩js为gzip
// yarn add compression-webpack-plugin -D

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    return config;
}

const { override, overrideDevServer, addLessLoader, addPostcssPlugins, fixBabelImports } = require('customize-cra')

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const addCustom = () => config => {
    let plugins = []

    config.plugins = [...config.plugins, ...plugins]

    return config
}

// 打包配置
const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false

        // 添加js打包gzip配置
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.css$/,
                threshold: 1024
            }),
        )
    }

    return config
}

// 跨域配置
const devServerConfig = () => config => {
    return {
        ...config,
        // 服务开启gzip
        compress: true,
        proxy: {
            '/api': {
                target: 'xxx',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api',
                },
            }
        }
    }
}

module.exports = {
    webpack: override(
        addCustom(),
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
        }),
        addLessLoader(),
        // addPostcssPlugins([require('postcss-pxtorem')({ rootValue: 75, propList: ['*'], minPixelValue: 2, selectorBlackList: ['am-'] })]),
        addCustomize(),
    ),
    // devServer: overrideDevServer(devServerConfig())
}

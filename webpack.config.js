module.exports = {
    target: 'node',
    mode: 'production',
    entry: __dirname + "/src/index.js",
    output: {//输出目录
        path: __dirname + '/build',//打包后的js文件存放的地方
        filename: 'bundle.js'//打包后输出的js的文件名
    },
};
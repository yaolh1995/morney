const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icon')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icon 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')//删除fill的loader
      config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{
      plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  }
}
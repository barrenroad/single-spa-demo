module.exports = {
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd' 
      // umd 格式的作用：打包之后会将singleVue 作为全局变量挂载到window上，
      //会得到 window.singleVue.bootstrap/mount/unmount方法
    },
    devServer: {
      port: 10000
    }
  }

}
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

// single-spa-vue
// single-spa-react
// 子应用需要导出三个生命周期 bootstrap、mount、unmount:协议接入
// 我们需要主应用去加载子应用，将子应用打包成lib


const appOptions = {
  el: '#vue', // 挂载到主应用中的ID为vue的dom标签中
  router,
  render: h => h(App)
}

const { bootstrap, mount, unmount } = singleSpaVue({
  Vue,
  appOptions,
});

if (window.singleSpaNavigate) { // 判断是否为子应用加载方式
  __webpack_public_path__ = 'http://localhost:10000/'
}

if (!window.singleSpaNavigate) { // 非子应用加载，开发环境
  delete appOptions.el;
  new Vue(appOptions).$mount('#app')
}

export { bootstrap, mount, unmount };

// export const bootstrap= vueLifeCycle.bootstrap;
// export const mount = vueLifeCycle.mount;
// export const unmount = vueLifeCycle.unmount;


// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

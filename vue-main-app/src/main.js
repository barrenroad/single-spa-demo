import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { start, registerApplication } from 'single-spa'

Vue.config.productionTip = false;

const loadScript = async (src) => {
  return new Promise((resolve, reject) => {
    const scriptDom = document.createElement('script');
    scriptDom.src = src;
    scriptDom.onload = resolve;
    scriptDom.onerror = reject;
    document.body.appendChild(scriptDom);
  })
}


registerApplication(
  'myVueApp', 
  async () => { // 加载js资源 --> 如何在React SPA中加载js资源： 动态创建script标签加载 、在webpack中配置cdn：external
    console.log('模块加载了');
    // system.js
    // 先加载公共资源：加载顺序有要求
    await loadScript('http://localhost:10000/js/chunk-vendors.js'); // 这里一定要等待同步加载完毕，要不然singleVue可能没有挂载到window上
    await loadScript('http://localhost:10000/js/app.js');
    return window.singleVue; // 导出了三个钩子函数：bootstrap、mount、unmount
  },
  location => location.pathname.startsWith('/vue'),
  {},
);


start();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

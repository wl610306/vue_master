import Vue from 'vue'
import App from './App.vue'
//引入三方依赖
import 'lib-flexible/flexible'
//阻止显示生产模式的消息
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false
export const Bus = new Vue();
Vue.use(AsyncComputed);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

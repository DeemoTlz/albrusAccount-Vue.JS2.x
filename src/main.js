import Vue from 'vue';
import ElementUI from 'element-ui';
import vueCanvasNest from 'vue-canvas-nest';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.NESTCONFIG = {
  color: '238, 0, 238',
  count: 88,
  opacity: 0.8,
};

Vue.component('vueCanvasNest', vueCanvasNest);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

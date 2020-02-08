import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Youtube from './components/Youtube/index.vue'
import $ from 'jquery';  // materialize requires jquery for most functionality
import jQuery from 'jquery';
import Materialize from 'materialize-css';
import dotenv from 'dotenv'
dotenv.config()

// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;
window.Materialize = Materialize;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: 'youtube', component: Youtube }
];

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

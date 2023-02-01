import '@fontsource/source-sans-pro/latin.css';
import 'base-ui-components/dist/base-ui-components.css';
import './styles/index.css';
import VueRouter from "vue-router";

import Vue from 'vue';
import BaseUiComponents from 'base-ui-components';

import App from './App.vue'
import {routes} from "@/routes";

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.use(BaseUiComponents)

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: "history",
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

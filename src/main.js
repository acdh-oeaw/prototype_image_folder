import '@fontsource/source-sans-pro/latin.css';
import 'base-ui-components/dist/base-ui-components.css';
import './styles/index.css';

import Vue from 'vue';
import BaseUiComponents from 'base-ui-components';

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(BaseUiComponents)

new Vue({
  render: h => h(App),
}).$mount('#app')

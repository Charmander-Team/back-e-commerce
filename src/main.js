import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import moment from 'moment'
import router from './router/router'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

export default{
  // Ici création d'une nouvelle instance Vue pour utiliser l'EventBus
}

new Vue({
  vuetify,
  router,

  render: h => h(App),
}).$mount('#app')

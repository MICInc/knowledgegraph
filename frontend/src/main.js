import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'

Vue.config.productionTip = false;
export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)//,
  // mounted() {
  //   gapi.signin2.render('google-signin-button', {
  //     onsuccess: this.onSignIn
  //   })
  // },
  // methods: {
  //   onSignIn (user) {
  //     const profile = user.getBasicProfile()
  //   }
  // }
}).$mount('#app')

Vue.use(VueParticles)
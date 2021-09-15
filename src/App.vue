<template>
    <v-app>
      <div class="d-flex background-app">
        <side-menu></side-menu>
        <!-- <connexion ref="compCon"></connexion> -->
        <!-- <component :is="page"></component> -->
        <router-view></router-view>
      </div>
    </v-app>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import SideMenu from './components/SideMenu.vue';
// import Connexion from './components/features/Admin/Connexion/Connexion.vue';

Vue.prototype.$axios = axios

export default {
  name: 'App',
  user: null,
  components: {
    SideMenu,
    // Connexion
  },
  methods: {
    checkToken () {
      let checkTimestamp = null
      let timestampNow = null
      if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
        checkTimestamp = localStorage.getItem('token').split(':')
        timestampNow = Math.round(new Date().getTime() / 1000)
      }
      // check tout les 4 heures = 14400 secondes
      if(localStorage.getItem('token') && timestampNow - checkTimestamp[0]<= 14400){
        console.log("time",timestampNow - checkTimestamp[0])
        axios.post("https://api.pokeshop.tk/api/user/check/token", {
          token: localStorage.getItem('token')
        })
        .then(res => {
            this.user = res.data
            console.log("user", this.user)
            localStorage.setItem('token', this.user.token)
        })
        .catch(err => {
        console.log(err)
        })
      }
    },
    setTokenInLocalStorage(){
        let url_string = window.location.href
        console.log(decodeURIComponent(url_string))
        let decodedURL = decodeURIComponent(url_string)
        let urlTab = decodedURL.split("=")
        let tokenURL = urlTab[1]
        console.log(tokenURL)
        if(tokenURL !== undefined && tokenURL !== "undefined"){
          console.log(localStorage)
          if(!localStorage.getItem('token')){
            this.user = tokenURL
            console.log(this.user)
            localStorage.setItem('token', this.user)
          }
        }
      },
  },
  mounted(){
    this.setTokenInLocalStorage()
    this.checkToken()
  }
}

</script>

<style>
.background-app{
  height: 100%;
  background-color: #95afc0;
}
/* @media screen and (max-width: 630px){
  .background-app{
    
  }
} */
</style>
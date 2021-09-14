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
          checkTimestamp = localStorage.getItem('token').split(':')
          timestampNow = Math.round(new Date().getTime() / 1000)
        }
        // check tout les 4 heures = 14400 secondes
        if(localStorage.getItem('token') && timestampNow - checkTimestamp[0]<= 14400){
          console.log("time",timestampNow - checkTimestamp[0])
          console.log(localStorage.getItem('token'))
          axios.post("https://api.pokeshop.tk/api/user/check/token", {
            token: localStorage.getItem('token')
          })
          .then(
            (res => {
              // console.log("event user check token",res.data)
              // this.$set(this, "user", res)
              this.user = res.data
              console.log("user", this.user)
              localStorage.setItem('token', this.user.token)
              console.log(localStorage.getItem('token'))
            }
            )
          )
          .catch(err => {
          console.log(err)
        })        
        // }else{
        //   localStorage.removeItem('token')
        }
    },
    setTokenInLocalStorage(){
        let url_string = window.location.href
        let urlTab = url_string.split("=")
        let token = urlTab[1]
        console.log(token)
        localStorage.setItem("token", token)
      },
  },
  mounted(){
    this.checkToken()
    this.setTokenInLocalStorage()
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
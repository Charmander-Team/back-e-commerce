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
  mounted(){
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
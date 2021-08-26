<template>
    <v-app>
      <div class="d-flex background-app">
        <side-menu></side-menu>
        <!-- <component :is="page"></component> -->
        <router-view></router-view>
      </div>
    </v-app>
</template>

<script>
import SideMenu from './components/SideMenu.vue';

export default {
  name: 'App',
  components: {
    SideMenu
  },
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
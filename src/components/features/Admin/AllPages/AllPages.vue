<template>
  <div class="allPagesWrapper">
      <!-- {{pages}} -->
      <div class="allPagesContainer">
        <h1>All Pages</h1>
        <div class="pagesCont">
            <v-card 
            elevation="10"
            class="pageContainer"
            v-for="(page, index) in pages" :key="index">
                <v-img
                width="100%"
                height="auto"
                max-width="250"
                :src="page.image"
                ></v-img>
                <v-card class="mt-1 pa-2">
                    <v-card-title class="px-0 py-0 text-lg-body-4">
                        {{ page.title }}
                    </v-card-title>
                    <v-card-text class="px-0 py-0 grey--text text-lg-body-2">
                        <div class="text-lg-body-2">Navbar Title: {{ page.navbar_title }}</div>
                    </v-card-text>
                    <v-divider class="ma-3"></v-divider>
                    <v-card-text class="px-0 py-0 text-lg-custom">
                        <div class="text-lg-body-2">Page Color: {{ page.page_color }}</div>
                        <div class="text-lg-body-2">Text Color: {{ page.text_color }}</div>
                        <div class="text-lg-body-2">Content: {{ page.content }}</div>
                        <div class="grey--text text-lg-body-2">Display: {{ page.display }}</div>
                    </v-card-text>
                    <v-divider class="ma-3"></v-divider>
                    <v-card-text class="px-0 py-0">
                        <router-link :to="'/allpages/edit/id='+page.id">                        
                            <v-btn small dark color="deep-purple">
                                Edit
                            </v-btn>      
                        </router-link>
                
                        <v-btn class="ml-2" small dark color="error" @click="deletePageById(page.id, index)">
                            Delete
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-card>
        </div>
    </div>
  </div>
  
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios;
// import { eventBus } from '../../../../main';

export default {
    
data(){
  return {
    pages: []
  }
},
methods: {
    deletePageById(id, index){
        axios
        .delete(`https://api.pokeshop.tk/api/page/${id}`)
        .then(response => {
            this.pages.splice(index, 1).push(response.data)
        })
        console.log(id, "deleted")
    },
},
mounted(){
  axios
  .get(`https://api.pokeshop.tk/api/page/`)
  .then(response => (this.pages = response.data))
},
updated(){
  axios
  .get(`https://api.pokeshop.tk/api/page/`)
  .then(response => (this.pages = response.data))
}

}
</script>

<style>
.allPagesWrapper{
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: 100%;
}
.allPagesContainer{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2vh 20px;
    margin: 10vh 20px 5vh 0;
    border-radius: 10px;
    background-color: #ffd32a;
    width: 90%;
}
.pagesCont{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
} 
.pageContainer{
    margin: 10px;
    padding: 2px;
    background-color: #9b59b6 !important;
    width: 400px;
}
.text-lg-custom{
    font-size: 0.75rem !important;
    line-height: 2rem !important;
}

@media screen and (max-width: 935px) {
  .allPagesContainer{
    width: 100%;
  }
}

</style>
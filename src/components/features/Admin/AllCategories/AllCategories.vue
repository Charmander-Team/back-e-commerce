<template>
  <div class="allCategoriesWrapper">
      <div class="allCategoriesContainer">
        <h1>All Categories</h1>
        <!-- {{this.$route.query}} -->
        <div class="categoriesCont">
            <v-card 
            elevation="10"
            class="categoryContainer"
            v-for="(category, index) in categories" :key="index">
                <v-img
                width="100%"
                height="auto"
                max-width="250"
                :src="category.image"
                ></v-img>
                <v-card class="mt-1 pa-2">
                    <v-card-title class="px-0 py-0 text-lg-body-3 text-md-body-1">
                        {{ category.name }}
                    </v-card-title>
                    <v-divider class="ma-3"></v-divider>
                    <v-card-text class="px-0 py-0">
                        <router-link :to="'/allcategories/edit/id='+category.id">                        
                            <v-btn small dark color="deep-purple">
                                Edit
                            </v-btn>      
                        </router-link>
                
                        <v-btn class="ml-2" small dark color="error" @click="deleteCategoryById(category.id, index)">
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

export default {
    
data(){
  return {
    categories: []
  }
},
methods: {
  deleteCategoryById(id, index){
      axios
      .delete(`https://api.pokeshop.tk/api/category/${id}`)
      .then(response => {
          this.categories.splice(index, 1).push(response.data)
      })
      console.log(id, "deleted")
  },
},
mounted(){
    axios
    .get(`https://api.pokeshop.tk/api/category/`)
    .then(response => (this.categories = response.data))
}

}
</script>

<style>
.allCategoriesWrapper{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
}
.allCategoriesContainer{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2vh 20px;
    margin: 10vh 20px 5vh 0;
    border-radius: 10px;
    background-color: #ffd32a;
    width: 90%;
}
.categoriesCont{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
} 
.categoryContainer{
    margin: 10px;
    padding: 2px;
    background-color: #9b59b6 !important;
}
.text-lg-custom{
    font-size: 0.75rem !important;
    line-height: 2rem !important;
}

@media screen and (max-width: 935px) {
  .allCategoriesContainer{
    width: 100%;
  }
}

</style>
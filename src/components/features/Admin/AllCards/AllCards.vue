<template>
  <div class="allCardsWrapper">
      <div class="allCardsContainer">
        <h1>All Cards</h1>
        <div class="cardsCont">
            <v-card 
            elevation="10"
            class="cardContainer"
            v-for="(card, index) in cards" :key="index">
                <v-img
                width="100%"
                height="auto"
                max-width="250"
                :src="card.image"
                ></v-img>
                <v-card class="mt-1 pa-2">
                    <v-card-title class="px-0 py-0 text-md-body-1">
                        {{ card.name }}
                    </v-card-title>
                    <v-card-text class="px-0 py-0">
                        <div class="grey--text">Ref: {{ card.ref }}</div>
                        <div class="grey--text">Type: {{ card.energy_type }}</div>
                        <div class="d-flex">
                        <div class="grey--text">
                            Etat:
                        </div>
                        <v-rating
                            :value="card.condition"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                        ></v-rating>
                        </div>
                    </v-card-text>
                    <v-divider class="ma-3"></v-divider>
                    <v-card-text class="px-0 py-0">
                        <div class="black--text mb-1">
                        Prix: {{ card.price }} €
                        </div>
                        <router-link :to="'/allcards/edit/id='+card.id">                        
                            <v-btn small dark color="deep-purple">
                                Edit
                            </v-btn>      
                        </router-link>
                
                        <v-btn class="ml-2" small dark color="error" @click="deleteCardById(card.id, index)">
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
    cards: [],
  }
},
methods: {
    deleteCardById(id, index){
        axios
        .delete(`https://api.pokeshop.tk/api/product/${id}`)
        .then(response => {
            this.cards.splice(index, 1).push(response.data)
        })
        console.log(id, "deleted")
    },
},
mounted(){
    axios
    .get(`https://api.pokeshop.tk/api/product/`)
    .then(response => {
        this.cards = response.data

        for(let card of this.cards){
            card.condition = parseInt(card.condition)
        }
    })
}

}
</script>

<style>
.allCardsWrapper{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
}
.allCardsContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2vh 20px;
    margin: 10vh 20px 5vh 0;
    border-radius: 10px;
    background-color: #ffd32a;
    width: 90%;
}
.cardsCont{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
} 
.cardContainer{
    margin: 10px;
    padding: 2px;
    background-color: #9b59b6 !important;
}
.text-lg-custom{
    font-size: 0.75rem !important;
    line-height: 2rem !important;
}

@media screen and (max-width: 935px) {
  .allCardsContainer{
    width: 100%;
  }
}

</style>
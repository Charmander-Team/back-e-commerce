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
                    <v-card-title class="px-0 py-0 text-lg-body-3 text-md-body-1">
                        {{ card.name }}
                    </v-card-title>
                    <v-card-text class="px-0 py-0 text-lg-custom">
                        <div class="grey--text">Ref: {{ card.ref }}</div>
                        <div class="grey--text">Type: {{ card.energy_type }}</div>
                        <v-row align="center" class="mx-0">
                        <div class="grey--text">
                            Etat:
                        </div>
                        <v-rating
                            :value="card.niveau"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                        ></v-rating>
                        </v-row>
                    </v-card-text>
                    <v-divider class="ma-1"></v-divider>
                    <v-card-text class="px-0 py-0">
                        <div class="black--text mb-1">
                        Prix: {{ card.price }} €
                        </div>
                    </v-card-text>
                </v-card>
            </v-card>
        </div>
    </div>
    
    {{cards}}
    
  </div>
  
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios;

export default {

data(){
  return {
    cards: []
  }
},
mounted(){
  axios
  .get(`https://api.pokeshop.tk/api/product/`)
  .then(response => (this.cards = response.data))
},

}
</script>

<style>
.allCardsWrapper{
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
    width: 20%;
    margin: 10px;
    padding: 2px;
    background-color: #9b59b6 !important;
    
}

@media screen and (max-width: 935px) {
  .ordersContainer{
    width: 100%;
  }
}

</style>
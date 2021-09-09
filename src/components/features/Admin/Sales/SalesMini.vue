<template>
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
    max-height="300px"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="yellow"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        Sales
      </div>
      <div class="subheading font-weight-light grey--text">
        {{getTotalSales()}}
        € CA total
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">last registration 2 minutes ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios;

  export default {
    data: () => ({
      labels: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ],
      value: [
        200,
        300,
        410,
        250,
        450,
        460,
        500,
      ],
      orders_contents: [],
      cards: []
    }),
    mounted(){
      axios
      .get(`https://api.pokeshop.tk/api/order_content/`)
      .then(response => {
        this.orders_contents = response.data
        })

      axios
      .get(`https://api.pokeshop.tk/api/product/`)
      .then(response => (this.cards = response.data))
    },
    methods: {
      getTotalSales(){
        let amount = 0;
        for(let order_content of this.orders_contents){
          const product_id = order_content.product_id
          const qty = order_content.quantity
          for(let card of this.cards){
            if(card.id == product_id){
              const product_price = card.price
              let total_products_price = product_price * qty
              amount += total_products_price
              // console.log(amount)
            }
          }
        }
        return amount
      }
    }
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
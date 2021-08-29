<template>
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
    max-height="300px"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="red"
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
        {{getPaidOrders()}}
        Orders Paid
      </div>
      <div class="subheading font-weight-light grey--text">
          History of all orders
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
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        0,
        300,
        600,
        250,
        100,
        460,
        200,
        530,
      ],
      orders: []
    }),
    mounted(){
      axios
      .get(`https://api.pokeshop.tk/api/order/`)
      .then(response => (this.orders = response.data))
    },
    methods: {
      getPaidOrders(){
        let orders_paid = []
        for(let order of this.orders){
          
          if(order.paid){
            orders_paid.push(order)
          }
        }
        console.log(orders_paid)
        return orders_paid.length
      }
    },
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
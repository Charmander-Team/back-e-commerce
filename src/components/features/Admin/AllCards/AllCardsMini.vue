<template>
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
    max-height="300px"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="purple"
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
        Cards
      </div>
      <div class="subheading font-weight-light grey--text">
          There are {{cards.length}} availables cards
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
        200,
        300,
        100,
        400,
        200,
        600,
        100,
        300,
      ],
      cards: []
    }),
    mounted(){
      axios
      .get(`https://api.pokeshop.tk/api/product/`)
      .then(response => (this.cards = response.data))
    }
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
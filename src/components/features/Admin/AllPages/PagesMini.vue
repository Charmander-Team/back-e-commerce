<template>
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
    max-height="300px"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="blue"
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
        Pages
      </div>
      <div class="subheading font-weight-light grey--text">
         {{pages.length}} pages custom
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
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios

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
        500,
        400,
        300,
        200,
        150,
        600,
        500,
      ],
      pages: []
    }),
    mounted(){
        axios.get(`https://api.pokeshop.tk/api/page`).then(response => this.pages = response.data)
    }
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
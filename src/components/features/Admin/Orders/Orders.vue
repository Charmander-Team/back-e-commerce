<template>
  <div class="ordersWrapper">
    <div class="ordersContainer">
      <h1>All Orders</h1>
    <v-expansion-panels focusable popout>
      <v-expansion-panel
        v-for="order in orders" :key="order.id" class="order"
      >
        <v-expansion-panel-header class="d-flex justify-space-around">
          <p class="text-h6 mr-5 mb-0">Order {{order.id}}</p> 
          <div v-if="order.paid" class="d-flex justify-start align-center">
            <p class="text-subtitle-1 mr-5 mb-0">Paid</p>
            <v-icon color="teal">
              mdi-check
            </v-icon>
          </div>
          <div v-else class="d-flex justify-start align-center">
            <p class="text-subtitle-1 mr-5 mb-0">Not Paid</p>
            <v-icon color="error">
              mdi-alert-circle
            </v-icon>
          </div>
        </v-expansion-panel-header>
        
        <v-expansion-panel-content>
          <v-divider></v-divider>
          User Id: {{order.user_id}}
          <v-divider></v-divider>
          <div class="d-flex flex-column">
            <span> Date: {{order.createdAt | formatDate}} </span>
            <span> Last Update: {{order.updatedAt | formatDate}} </span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    orders: []
  }
},
mounted(){
  axios
  .get(`https://api.pokeshop.tk/api/order/`)
  .then(response => (this.orders = response.data))
},

}
</script>

<style>
.ordersWrapper{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 100%;
}
.ordersContainer{
  width: 80%;
  padding: 2vh 20px;
  margin: 10vh 20px 5vh 0;
  background-color: #ffd32a;
  border-radius: 10px;
}

@media screen and (max-width: 935px) {
  .ordersContainer{
    width: 100%;
  }
}

</style>
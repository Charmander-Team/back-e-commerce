<template>
  <div class="adminOrders">
    <h1>All Orders</h1>
    <v-expansion-panels class="ordersContainer">
      <v-expansion-panel
        v-for="order in orders" :key="order.id" class="order"
      >
        <v-expansion-panel-header class="d-flex justify-space-around">
          <span>Order {{order.id}}</span> 
          <div v-if="order.paid">
            <v-chip color="green">Paid</v-chip>
          </div>
          <div v-else>
            <v-chip color="red">Not Paid</v-chip>
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
  .get(`http://localhost:3000/api/order/`)
  .then(response => (this.orders = response.data))
},

}
</script>

<style>
.ordersContainer{
  max-width: 70% !important;
}
.adminOrders{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
</style>
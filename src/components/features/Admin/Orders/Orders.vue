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
          <div class="singleOrderContainer">

            <div class="sectionBorder orderContent">
              <div v-for="order_c in orders_content" :key="order_c.order_id">
                <div v-if="order.id == order_c.order_id">
                  <div v-for="product in cards" :key="product.id">
                    <div v-if="product.id == order_c.product_id">
                      <v-img
                        height="auto"
                        max-width="150"
                        :src="product.image"
                      ></v-img>
                      x{{order_c.quantity}}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div class="user sectionBorder">
              <v-img
                width="100%"
                height="auto"
                max-width="250"
                :src="order.user_object.image"
              ></v-img>
              <div class="userInfos">
                <p>{{order.user_object.lastname}} {{order.user_object.firstname}}</p>
                <p>{{order.user_object.mail}}</p>
                <p>User Id: {{order.user_id}}</p>
              </div>
            </div>
          </div>
          
          
          <v-divider></v-divider>
          <div class="orderDate">
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
    orders: [],
    orders_content: [],
    cards: []
  }
},
mounted(){
  axios
  .get(`https://api.pokeshop.tk/api/order/`)
  .then(response => (this.orders = response.data))

  axios
  .get(`https://api.pokeshop.tk/api/order_content/`)
  .then(response => (this.orders_content = response.data))

  axios
  .get(`https://api.pokeshop.tk/api/product/`)
  .then(response => (this.cards = response.data))
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
.orderContent{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 49%;
  height: 100%;
  padding: 20px 5px;
}
.user{
  display: flex;
  width: 49%;
  height: 100%;
  padding: 20px 5px;
}
.userInfos{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
}
.singleOrderContainer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 100%;
  margin: 20px 0 0 0;
}
.sectionBorder{
  border: solid 9px #dcdde1;
  border-radius: 10px;
}
.orderDate{
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 935px) {
  .ordersContainer{
    width: 100%;
  }
}
@media screen and (max-width: 1650px) {
  .user{
    flex-wrap: wrap;
  }
}

</style>
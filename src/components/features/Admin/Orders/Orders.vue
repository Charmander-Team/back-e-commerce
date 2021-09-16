<template>
  <div class="ordersWrapper">
    <div class="ordersContainer">
    <!-- {{orders}} -->
      <h1>All Orders</h1>
      <!-- ALL PANNEL -->
      <v-expansion-panels focusable popout>
        <v-expansion-panel
          v-for="(order) in orders"
          :key="order.id"
          class="order"
        >
          <v-expansion-panel-header class="d-flex justify-space-around" :class="order.status">
            <p class="text-h6 mr-5 mb-0">Order {{ order.id }}</p>
            <p class="text-h6 mr-5 mb-0">{{ order.status }}</p>
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
                <div v-for="order_c in orders_content" :key="order_c.id">
                  <div v-if="order.id == order_c.order_id">

                    <div v-for="product in cards" :key="product.id">
                      <div v-if="product.id == order_c.product_id" class="m-1">
                        <v-img
                          height="auto"
                          max-width="150"
                          :src="product.image"
                        ></v-img>
                        <div class="d-flex qtyContainer">
                          <p class="qty">x{{ order_c.quantity }}</p> 
                          <p class="qty">{{getOrderContentPrice(product.price, order_c.quantity)}}€</p> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="user sectionBorder">
                <v-img
                  height="auto"
                  max-width="150"
                  :src="order.user_object.image"
                ></v-img>
                <div class="userInfos">
                  <p>
                    {{ order.user_object.lastname }}
                    {{ order.user_object.firstname }}
                  </p>
                  <p>{{ order.user_object.mail }}</p>
                  <p>User Id: {{ order.user_id }}</p>
                </div>
              </div>
            </div>

            <v-divider></v-divider>
            <div class="bottomOrderContainer">
              <div class="orderDate">
                <span> Date: {{ order.createdAt | formatDate }} </span>
                <span> Last Update: {{ order.updatedAt | formatDate }} </span>
              </div>
              <div>
                <router-link :to="'/orders/edit/id='+order.id">                        
                  <v-btn small dark color="deep-purple">
                      Edit status
                  </v-btn>
                </router-link>
                <!-- <v-btn class="mx-2" small dark color="error" @click="deleteOrderById(order.id, index)">
                  Delete
                </v-btn> -->
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
Vue.prototype.$axios = axios;

export default {
  data() {
    return {
      selectedState: 'All',
      orders: [],

      orders_content: [],
      cards: [],
    };
  },
  mounted() {
    axios
      .get(`https://api.pokeshop.tk/api/order/`)
      .then((response) => {
        this.orders = response.data
        // console.log(this.orders)
        // for(let order in this.orders){
        //   if(order.status == "En cours"){
        //     order.status = "En-cours"
        //     console.log(order.status)
        //   }
        // }
        });
    axios
      .get(`https://api.pokeshop.tk/api/order_content/`)
      .then((response) => (this.orders_content = response.data));

    axios
      .get(`https://api.pokeshop.tk/api/product/`)
      .then((response) => (this.cards = response.data));
  },
  methods: {
    getOrderContentPrice(price, qty){
      return price * qty
    },
    deleteOrderById(id, index){
      axios
      .delete(`https://api.pokeshop.tk/api/order/${id}`)
      .then(response => {
          this.orders.splice(index, 1).push(response.data)
      })
      console.log(id, "deleted")
    },
  }
};
</script>

<style>
.ordersWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 100%;
}
.ordersContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  padding: 2vh 20px;
  margin: 10vh 20px 5vh 0;
  background-color: #ffd32a;
  border-radius: 10px;
}
.orderContent {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 49%;
  height: 100%;
  padding: 20px 5px;
}
.user {
  display: flex;
  width: 49%;
  height: 100%;
  padding: 20px 5px;
  margin: 10px;
}
.userInfos {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
}
.singleOrderContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 100%;
  margin: 20px 0 0 0;
}
.sectionBorder {
  border: solid 9px #dcdde1;
  border-radius: 10px;
}
.orderDate {
  display: flex;
  flex-direction: column;
}
.qtyContainer{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 25px;
  background-color: #dcdde1;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 20px;
  margin-top: 5px;
}
.qty{
  margin: 0 !important;
}
.bottomOrderContainer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Annulée{
  background-color: #fab1a0;
}
.Validée{
  background-color: #74b9ff;
}
.En-préparation{
  background-color: #fdcb6e;
}
.Expédiée{
  background-color: #7bed9f;
}
.Livrée{
  background-color: #2ed573;
}

@media screen and (max-width: 935px) {
  .ordersContainer {
    width: 100%;
  }
}
@media screen and (max-width: 1650px) {
  .user {
    flex-wrap: wrap;
  }
}
</style>

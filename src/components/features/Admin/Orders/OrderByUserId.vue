<template>
  <div class="ordersWrapper">
    <v-icon id="backArrow" color="white" large @click="backToAllUsers()"
      >mdi-arrow-left-bold</v-icon
    >
    <div class="ordersContainer">
    <!-- {{orders}} -->
      <h1>User {{$route.params.id }} Orders</h1>
      <v-expansion-panels focusable popout>
        <v-expansion-panel
          v-for="order in orders"
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

                <div v-for="orderContent in getOrderContentByOrderId(order.id)" :key="orderContent.id">
                    <!-- {{orderContent}} -->
                  <div v-for="card in getCardById(orderContent.product_id)" :key="card.id">
                    <!-- {{card}} -->
                    <v-img
                      height="auto"
                      max-width="150"
                      :src="card.image"
                    ></v-img>
                    x{{ orderContent.quantity }}
                  </div>
                </div>
              </div>
            </div>

            <v-divider></v-divider>
            <div class="bottomOrderContainer">
              <div class="orderDate">
                <span> Date: {{ order.createdAt | formatDate }} </span>
                <span> Last Update: {{ order.updatedAt | formatDate }} </span>
              </div>
              <router-link :to="'/orders/edit/id='+order.id">                        
                <v-btn small dark color="deep-purple">
                    Edit status
                </v-btn>      
              </router-link>
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
      orders: [],
      orders_content: [],
      cards: [],
    };
  },
  mounted() {
    axios
      .get(`https://api.pokeshop.tk/api/order/user/${this.$route.params.id}`)
      .then((response) => {
        this.orders = response.data
        console.log("ordersbyuser", this.orders)
        });
    axios
      .get(`https://api.pokeshop.tk/api/order_content/`)
      .then((response) => {
        this.orders_content = response.data
        console.log("orders_content", this.orders_content)
        });

    axios
      .get(`https://api.pokeshop.tk/api/product/`)
      .then((response) => {
        this.cards = response.data
        console.log("cards", this.cards)
        });

  },
  methods: {
    getOrderContentByOrderId(order_id){
      let tmp = []
      for(let order_content of this.orders_content){
        if(order_content.order_id == order_id){

          tmp.push(order_content)
        }
      }
      // console.log("tmp", tmp)
      return tmp
    },
    getCardById(product_id){
      let tmp = []
      for(let card of this.cards){
        if(card.id == product_id){

          tmp.push(card)
        }
      }
      console.log("tmp", tmp)
      return tmp
    },
    backToAllUsers() {
      this.$router.go(-1);
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
  width: 100%;
  height: 100%;
  padding: 20px 5px;
}
.user {
  display: flex;
  width: 49%;
  height: 100%;
  padding: 20px 5px;
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

<template>
  <div class="salesWrapper">
    <div class="salesContainer">
      <v-container class="vContainer">
        <v-row class="vRow">
          <v-col
            class="vCol"
          >
            <v-card
              class="pa-2 cardSales rounded-l-xl"
              outlined
            >
            {{getTotalSales()}}
            </v-card>
          </v-col>
          <v-col
            class="vCol"
          >
            <v-card
              class="pa-2 cardSales rounded-r-xl"
              outlined
            >
            Chiffres
            </v-card>
          </v-col>
        </v-row>
        <v-row class="vRow">
          <v-col class="vCol">
            <v-card
              class="pa-2 cardSales rounded-xl"
              outlined
              tile
            >
            Chiffres
            </v-card>
          </v-col>
        </v-row>
        <v-row class="vRow">
          <v-col
            class="vCol"
          >
            <v-card
              class="pa-2 cardSales rounded-l-xl"
              outlined
            >
            Chiffres
            </v-card>
          </v-col>
                    <v-col
            class="vCol"
          >
            <v-card
              class="pa-2 cardSales"
              outlined
            >
            {{this.orders_paid.length}}
            </v-card>
          </v-col>
                    <v-col
            class="vCol"
          >
            <v-card
              class="pa-2 cardSales rounded-r-xl"
              outlined
            >
            {{this.orders_notPaid.length}}
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data(){
      return {
        n: 0,
        orders: [],
        ordersByUser: [],
        orders_paid: [],
        orders_notPaid: [],
        orders_content: [],
        cards: [],
        users: [],
        bestBuyer: []
      }
    },

    beforeMount(){
      setTimeout(() => {
        this.getPaidSales()
      }, 500);
    },
    mounted(){
      axios
      .get(`https://api.pokeshop.tk/api/order`)
      .then(response => {
        this.orders = response.data
      })
      axios
      .get(`https://api.pokeshop.tk/api/product`)
      .then(response => {
        this.cards = response.data
      })
      axios
      .get(`https://api.pokeshop.tk/api/order_content`)
      .then(response => {
        this.orders_content = response.data
      })
      axios
      .get(`https://api.pokeshop.tk/api/user`)
      .then(response => {
        this.users = response.data
      })
      setTimeout(() => {
        for(let user of this.users){
          axios
          .get(`https://api.pokeshop.tk/api/order/user/${user.id}`)
          .then(response => {
            this.ordersByUser.push(response.data.concat(user.firstname))
          })
        }
      },500)
      
    },
    methods: {
      getTotalSales(){
        let amount = 0;
        for(let order_content of this.orders_content){
          const product_id = order_content.product_id
          const qty = order_content.quantity
          for(let card of this.cards){
            if(card.id == product_id){
              const product_price = card.price
              let total_products_price = product_price * qty
              amount += total_products_price
            }
          }
        }
        return amount
      },
      getUserWithMaxCommand(){

      },
      getPaidSales(){
        this.orders.forEach(order => {
          if (order.paid == false) {
            this.orders_notPaid.push(order)
          }else if(order.paid == true){
            this.orders_paid.push(order)
          }
        });
      }
    },
  }
</script>

<style>
.salesWrapper {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
}
.salesContainer {
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
.vContainer{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.vRow{
  height: 30%;
}
.vCol{
  height: 100%;
}
.cardSales{
  height: 100%;
  background-color: #e1b12c !important;
}
</style>
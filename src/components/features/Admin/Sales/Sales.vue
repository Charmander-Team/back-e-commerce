<template>
  <div class="salesWrapper">
    <div class="salesContainer">
      {{bestBuyer}}
      <v-container class="vContainer">
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
            v-for="n in 3"
            :key="n"
          >
            <v-card
              class="pa-2 cardSales rounded-t-xl"
              outlined
              tile
            >
            Chiffres
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
        orders_content: [],
        users: [],
        bestBuyer: []
      }
    },
    methods: {
    },
    mounted(){
      axios
      .get(`https://api.pokeshop.tk/api/order`)
      .then(response => {
        this.orders = response.data
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

      // setTimeout(() => {
      //   for(let user of this.users){
      //     axios
      //     .get(`https://api.pokeshop.tk/api/order/user/${user.id}`)
      //     .then(response => {
      //       console.log(response.data)
      //       this.bestBuyer.push(response.data)
      //     })
      //   }
      // },500)

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
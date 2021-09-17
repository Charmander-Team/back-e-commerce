<template>
  <div class="salesWrapper">
    <div class="salesContainer">
      <v-container class="vContainer">
        <v-row class="vRow">
          <v-col
            class="vCol"
          >
          <v-hover v-slot="{ hover }">
            <v-card
              class="cardSales totalTurnover rounded-l-xl d-flex flex-column justify-center align-start"
              outlined
              :elevation="hover ? 12 : 2"
            >
              <!-- Chiffre d'affaires  -->
              <p class="cardSubTitle">
                Total Turnover:
              </p>
              <p class="cardTitle">
                {{getTotalSales()}}€
              </p>
            </v-card>
          </v-hover>
            
          </v-col>
          <v-col
            class="vCol"
          >
          <v-hover v-slot="{ hover }">
            <v-card
              class="cardSales bCustomer rounded-r-xl d-flex flex-column justify-center align-end"
              outlined
              :elevation="hover ? 12 : 2"
            >
            <!-- Meilleur acheteur (le plus de commandes) -->
              <p class="cardSubTitle">
                Best Customer:
              </p>
              <p class="cardTitle">
                {{getBestUserInfos()}}
              </p>
              <p class="cardSubTitle">
                With:
              </p>
              <p class="cardTitle">
                {{maxLengthOrdersByUser - 2}} Orders 
              </p>
            
            </v-card>
          </v-hover>
            
          </v-col>
        </v-row>
        <v-row class="vRow">
          <v-col
          class="vCol">
          <v-hover v-slot="{ hover }">
            <v-card
              class="cardSales exCardSection rounded-xl d-flex justify-space-between"
              outlined
              :elevation="hover ? 12 : 2"
            >
            <!-- Carte la plus chère  -->
              <div class="cardSubTitle d-flex flex-column">
                <p>Most Expansive Card:</p>
                <p class="cardTitle">{{bestCard[0].name}}</p>
              </div>
              <v-img
                :src="bestCard[0].image"
                max-width="200"
                max-height="100%"
                ></v-img>
                <div class="d-flex align-end">
                  <p class="cardSubTitle">Price: </p>
                  <p class="cardTitle">
                    {{bestCard[0].price}}€
                  </p>
                </div>
            </v-card>
          </v-hover>
            
          </v-col>
        </v-row>
        <v-row class="vRow">
          <v-col
            class="vCol"
          >
          <v-hover v-slot="{ hover }">
            <v-card
              class="cardSales goodNews rounded-l-xl d-flex justify-start align-center"
              outlined
              :elevation="hover ? 12 : 2"
            >
            <!-- Total commandes payées -->
            <div class="cardSubTitle">
              <p>Total paid orders:</p>
              <p class="cardTitle">{{orders_paid.length}}</p>
            </div>
            </v-card>
          </v-hover>
            
          </v-col>
          <v-col
            class="vCol"
          >
            <v-hover v-slot="{ hover }">
              <v-card
              class="cardSales badNews rounded-r-xl d-flex justify-end align-center"
              outlined
              :elevation="hover ? 12 : 2"
            >
            <!-- Total commandes non payées -->
            <div class="cardSubTitle d-flex flex-column align-end">
              <p>Total not paid orders:</p>
              <p class="cardTitle">{{orders_notPaid.length}}</p>
            </div>
            </v-card>
            </v-hover>
            
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
        lengthArray: [],
        priceArray: [],
        maxCardPrice: 0,
        maxLengthOrdersByUser: 0,
        orders: [],
        ordersByUser: [],
        orders_paid: [],
        orders_notPaid: [],
        orders_content: [],
        cards: [],
        users: [],
        bestBuyer: [],
        bestCard: []
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
            this.ordersByUser.push(response.data.concat(user.firstname, user.lastname))
          })
        }
        for (let card of this.cards) {
          this.priceArray.push(card.price)
        }
      },500)

      setTimeout(() => {
        this.ordersByUser.forEach(order => {
          this.lengthArray.push(order.length)
        });
        this.maxCardPrice = Math.max(...this.priceArray)
        this.maxLengthOrdersByUser = Math.max(...this.lengthArray);
        this.bestBuyer = this.ordersByUser.filter(element => element.length === this.maxLengthOrdersByUser)
        this.bestCard = this.cards.filter(element => element.price === this.maxCardPrice);
      }, 700);
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
      getPaidSales(){
        this.orders.forEach(order => {
          if (order.paid == false) {
            this.orders_notPaid.push(order)
          }else if(order.paid == true){
            this.orders_paid.push(order)
          }
        });
      },
      getBestUserInfos(){
        return this.bestBuyer[0][this.maxLengthOrdersByUser - 1] +' '+ this.bestBuyer[0][this.maxLengthOrdersByUser - 2]
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
  /* background-color: #e1b12c !important; */
  font-size: 2rem;
  padding: 20px !important;
}
.cardSubTitle{
  font-weight: 300;
}
.cardTitle{
  font-weight: 900;
  line-height: 0;
  margin-bottom: 40px !important;
}
.badNews{
  background-color: #e55039 !important;
}
.goodNews{
  background-color: #6ab04c !important;
}
.exCardSection{
  background-color: #e1b12c !important;
}
.totalTurnover{
  background-color: #60a3bc !important;
}
.bCustomer{
  background-color: #a55eea !important;
}
</style>
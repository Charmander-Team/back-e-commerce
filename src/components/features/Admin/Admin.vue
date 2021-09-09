<template>
  <div class="dashboardWrapper">
    <div class="dashboardContainer">
      <v-container>
        <v-row class="rowClass">
          <v-col md="8" align-self="center" >
            <v-container>
              <v-row>
                <v-col md="6" class="">
                  <a href="/#/sales"><sales-mini/></a>
                </v-col>
                <v-col md="6" class="">
                  <a href="/#/allcards"><all-cards-mini/></a>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" class="">
                  <a href="/#/orders"><orders-mini/></a>
                </v-col>
                <v-col md="6" class="">
                  <a href="/#/stock"><stock-mini/></a>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" class="">
                  <a href="/#/allcategories"><all-categories-mini/></a>
                </v-col>
                <v-col md="6" class="">
                  <a href="/#/users"><users-mini/></a>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col md="4" class="colForm">
            <admin-product-form></admin-product-form>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
    
</template>

<script>
import AdminProductForm from './AdminProductForm';
import AllCategoriesMini from './AllCategories/AllCategoriesMini.vue';
import UsersMini from './Users/UsersMini.vue';
import StockMini from './Stock/StockMini.vue';
import AllCardsMini from './AllCards/AllCardsMini.vue';
import OrdersMini from './Orders/OrdersMini.vue';
import SalesMini from './Sales/SalesMini.vue';

export default {
  components: { 
    AdminProductForm,
    SalesMini,
    OrdersMini,
    AllCardsMini,
    UsersMini,
    StockMini,
    AllCategoriesMini
    }
}
</script>

<style lang="scss">
.components-mini{
    margin-top: 200px;
    margin-bottom: 200px;
}
.dashboardWrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: #95afc0;
}
.dashboardContainer{
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 80%;
  padding: 2vh 20px;
  margin: 10vh 20px 5vh 0;
  background-color: #ffd32a;
  border-radius: 10px;
}
.red{
  background-color: red;
  border: solid black 2px !important;
}
.yellow2{
  background-color: yellow;
  border: solid black 2px !important;
  height:100%;
}
.green{
  background-color: green;
  border: solid black 2px !important;
}
.pink{
  background-color: pink;
  border: solid black 2px !important;
}

@media screen and (max-width: 1400px) {
  .rowClass{
    flex-direction: column;
  }
  .colForm{
    min-width: 100%;
  }
}
@media screen and (max-width: 935px) {
  .dashboardContainer{
    width: 100%;
  }
}
</style>
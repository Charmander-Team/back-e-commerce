<template>
  <div class="allUsersWrapper">
    <div class="allUsersContainer">
      <h1>All Users</h1>
      <div class="usersCont">
        <v-card
          elevation="10"
          class="userContainer"
          v-for="(user, index) in users" :key="index"
        >
          <v-list-item three-line class="mb-5 mt-2">
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ user.mail }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ user.firstname }} {{ user.lastname }}
              </v-list-item-title>
            </v-list-item-content>

            <v-img
                width="100%"
                height="auto"
                max-width="75"
                :src="user.image"
                ></v-img>
          </v-list-item>

          <v-card-actions v-if="user.admin" class="adminColor">
            <router-link :to="'/users/edit/id='+user.id">                        
              <v-btn small dark color="deep-purple">
                  Edit
              </v-btn>      
              </router-link>
      
              <v-btn class="mx-2" small dark color="error" @click="deleteUserById(user.id, index)">
                  Delete
              </v-btn>

              <router-link :to="'/ordersbyuserid/user_id='+user.id">                        
              <v-btn small dark color="#ffd32a">
                  Orders
              </v-btn>      
              </router-link>
              <div class="adminTextBlock text-overline">
                <div class="adminText">ADMIN</div>
              </div>
          </v-card-actions>
          <v-card-actions v-else class="memberColor">
            <router-link :to="'/users/edit/id='+user.id">                        
              <v-btn small dark color="deep-purple">
                  Edit
              </v-btn>      
              </router-link>
      
              <v-btn class="mx-2" small dark color="error" @click="deleteUserById(user.id, index)">
                  Delete
              </v-btn>
              <router-link :to="'/ordersbyuserid/user_id='+user.id">                        
              <v-btn small dark color="#ffd32a">
                  Orders
              </v-btn>      
              </router-link>
          </v-card-actions>
        </v-card>
      </div>
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
    users: [],
  }
},
methods: {
  deleteUserById(id, index){
      axios
      .delete(`https://api.pokeshop.tk/api/user/${id}`)
      .then(response => {
          this.users.splice(index, 1).push(response.data)
      })
      console.log(id, "deleted")
  },
},
mounted(){
  axios
  .get(`https://api.pokeshop.tk/api/user/`)
  .then(response => {
      this.users = response.data
      console.log(this.users)
  })
}

}
</script>

<style>
.allUsersWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 100%;
}
.allUsersContainer {
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
.usersCont{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
} 
.userContainer{
  width: 45%;
  margin: 10px;
  border-radius: 10px !important;
}
.adminColor{
  background-color: #009432 !important;
}
.memberColor{
  background-color: #ced6e0 !important;
}
.adminTextBlock{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 900 !important;
  color: #6ab04c;
}
.adminText{
  font-size: 2rem !important;
}
</style>
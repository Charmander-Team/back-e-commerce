<template>
<div class="editCategoryWrapper">
  <div class="editCategoryContainer">
 <form class="d-flex flex-column">
   <v-card elevation="5" class="formContainer">
      <h4>Edit Category</h4>
    <hr class="w-100">
    <div class="form-group">
      <label>Name: </label>
      <input v-model="form.name" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Image URL:</label>
      <input v-model="form.image" type="text" class="form-control">
    </div>
    <ul v-if="errors.length">
      <li class="text-danger" v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <v-btn @click="submitForm" large color="yellow" elevation="4">Modify</v-btn>
   </v-card>
   
 </form>
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
      form: {
        image: '',
        name: '',
      },
      errors: [],
      }
    },
mounted(){
  axios
  .get(`https://api.pokeshop.tk/api/category/`+this.$route.params.id)
  .then(response => (this.form = response.data))
},
  methods: {
    submitForm(e) {
      e.preventDefault();
      if(this.formIsValid()){
      // POST request using axios
      axios.put("https://api.pokeshop.tk/api/category/"+this.$route.params.id, {
        image: this.form.image,
        name: this.form.name
      },
      {
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("Category sent", res.data)
      })
      .catch(err => {
        console.log(err)
      })
      this.$router.push({ path: '/allcategories'})
      }
    },
    getNow() {
      const today = new Date();
      const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.date = dateTime;
    },
    resetForm(){
      this.form = {
        image: '',
        name: ''
      }
    },
    formIsValid(){
      this.errors = [];
      if(!this.form.image){
        this.errors.push('Image required !');
      }
      if(!this.form.name){
        this.errors.push('Name required !');
      }
      return this.errors.length ? false : true;
    }
  }
}
</script>

<style scoped>
  form{
    width: 400px;
  }
  .editCategoryWrapper{
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: 100%;
  }
  .editCategoryContainer{
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
  h4{
    font-size: 2rem;
  }
  h3{
    font-size: 1.5rem;
  }
  .formContainer{
    padding: 25px 20px 20px 20px;
    background-color: #2ed573 !important;
    border-radius: 10px !important;
    color: white !important;
  }
  @media screen and (max-width: 935px){
    form{
      width: 300px;
    }
  }
</style>
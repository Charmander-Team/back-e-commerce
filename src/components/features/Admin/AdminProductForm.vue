<template>
 <form class="d-flex flex-column formContainer">
   <h4>Add new card</h4>
   <hr class="w-100">
   <div class="form-group">
     <label>Image Url:</label>
     <input v-model="form.img" type="text" class="form-control">
   </div>
   <div class="form-group">
     <label>Name:</label>
     <input v-model="form.nom" type="text" class="form-control">
   </div>
   <div class="form-group">
     <label>Category Id:</label>
     <input v-model.number="form.category_id" type="number" class="form-control" pattern="[0-5]{1}">
   </div>
   <div class="form-group">
     <label>Reference:</label>
     <input v-model="form.ref" type="text" class="form-control">
   </div>
   <div class="form-group">
     <label>Energy Type:</label>
     <input v-model="form.type" type="text" class="form-control">
   </div>
   <div class="form-group">
     <label>Description:</label>
     <input v-model="form.description" type="textarea" class="form-control">
   </div>
   <div class="form-group">
     <label>Stock:</label>
     <input v-model.number="form.stock" type="number" class="form-control">
   </div>
   <div class="form-group">
     <label>Price:</label>
     <input v-model.number="form.prix" type="number" class="form-control">
   </div>
   <!-- <div class="form-group">
     <label>Date:</label>
     <input v-model.number="form.date" type="number" class="form-control">
   </div> -->
   <div class="form-group">
     <label>Bid:</label>
     <input v-model.number="form.bid" type="number" class="form-control" pattern="[0-1]{1}">
   </div>
   <ul v-if="errors.length">
     <li class="text-danger" v-for="error in errors" :key="error">{{ error }}</li>
   </ul>
  <v-btn @click="submitForm" large color="yellow" elevation="4">Ajouter</v-btn>
 </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios;
import { eventBus } from '../../../main';

export default {
  data(){
    return {
      form: {
        img: '',
        nom: '',
        category_id: '',
        ref: '',
        type: '',
        description: '',
        stock: '',
        prix: '',
        // date: this.getNow(),
        bid: '',
      },
      errors: []
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      if(this.formIsValid()){
        // POST request using axios
        axios.post("https://api.pokeshop.tk/api/product", {
          image: this.form.img,
          name: this.form.nom,
          category_id: this.form.category_id,
          ref: this.form.ref,
          energy_type: this.form.type,
          description: this.form.description,
          stock: this.form.stock,
          price: this.form.prix,
          bid: this.form.bid
        },
        {
          headers:{
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log("Product sent", res.data)
        })
        .catch(err => {
          console.log(err)
        })
        this.resetForm();
      }
      
    },
    getNow() {
      const today = new Date();
      const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.date = dateTime;
    },
    trySubmit(e){
      e.preventDefault();
      if(this.formIsValid()){
        console.log(this.form);
        eventBus.addProduct({...this.form});
        this.resetForm();
        eventBus.changePage('User');
      }
    },
    resetForm(){
      this.form = {
        img: '',
        nom: '',
        category_id: '',
        ref: '',
        type: '',
        description: '',
        stock: '',
        prix: '',
        // date: this.getNow(),
        bid: '',
      }
    },
    formIsValid(){
      this.errors = [];
      if(!this.form.img){
        this.errors.push('Image required !');
      }
      if(!this.form.nom){
        this.errors.push('Name required !');
      }
      if(!this.form.category_id){
        this.errors.push('Category Id required !');
      }
      if(!this.form.ref){
        this.errors.push('Reference required !');
      }
      if(!this.form.type){
        this.errors.push('Type required !');
      }
      if(!this.form.description){
        this.errors.push('Description required !');
      }
      if(!this.form.stock){
        this.errors.push('Stock required !');
      }
      if(!this.form.prix){
        this.errors.push('Price required !');
      }
      // if(!this.form.date){
      //   this.errors.push('Date required !');
      // }
      if(this.form.bid < 0 || this.form.bid > 1){
        this.errors.push('Bid required !');
      }
      return this.errors.length ? false : true;
    }
  }
}
</script>

<style scoped>
  h4{
    font-size: 2rem;
  }
  h3{
    font-size: 1.5rem;
  }
  .formContainer{
    padding: 50px 30px;
    background-color: #1e90ff;
    border-radius: 10px;
    color: white;
  }
</style>
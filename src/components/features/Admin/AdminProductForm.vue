<template>
 <form class="d-flex flex-column">
   <v-card elevation="5" class="formContainer">
      <v-row> 
        <!-- <v-col md=10>
                <h4 v-if="condition === true">Add new card</h4>
                <h4 v-else-if="condition === false">Add new category</h4>
        </v-col>
        <v-col md=2>
                <v-icon v-if="condition === true" class="mr-2" color="white" large @click="changeForm()">mdi-arrow-right-bold</v-icon>
                <v-icon v-else-if="condition === false" class="mr-2" color="white" large @click="changeForm()">mdi-arrow-left-bold</v-icon>

        </v-col> -->
        <v-select name="selectForm" id="selectForm" v-model="selected" filled dense color="yellow" append-icon="mdi-plus" :items="selectOptions">
          <!-- <option disabled value="">--Please choose a form--</option>
          <option value="card">Add New Card </option>
          <option value="category">Add New Category</option>
          <option value="page">Add New Page</option> -->
        </v-select>
      </v-row> 
    <hr class="w-100">
    <div v-if="selected == 'Add New Card'" id="conditionnal-form-card">
    <div class="form-group">
      <label>Image Url:</label>
      <input v-model="form.card.img" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Name:</label>
      <input v-model="form.card.nom" type="text" class="form-control">
    </div>
    <div class="form-group d-flex flex-column">
      <!-- <label>Category Id:</label>
      <input v-model.number="form.category_id" type="number" class="form-control" pattern="[0-5]{1}"> -->

      <label for="category_id">Category Id:</label>

      <select name="category_id" id="category_id" v-model="form.card.category_id">
          <option value="">--Please choose a category--</option>
          <option value="1">Dresseurs</option>
          <option value="2">Pokémons</option>
          <option value="3">Energies</option>
      </select>
    </div>
    <!-- <div class="form-group">
      <label>Reference:</label>
      <input v-model="form.card.ref" type="text" class="form-control">
    </div> -->
    <div class="form-group d-flex flex-column">
      <label>Energy Type:</label>
      <!-- <input v-model="form.condition" type="text" class="form-control"> -->
      <select name="type" id="type" v-model="form.card.type">
          <option value="">--Please choose an energy type--</option>
          <option value="Normal">Normal</option>
          <option value="Fire">Fire</option>
          <option value="Grass">Grass</option>
          <option value="Water">Water</option>
          <option value="Lightning">Lightning</option>
          <option value="Psychic">Psychic</option>
          <option value="Fighting">Fighting</option>
          <option value="Darkness">Darkness</option>
          <option value="Metal">Metal</option>
          <option value="Fairy">Fairy</option>
      </select>
    </div>
    <div class="form-group">
      <label>Content: </label>
      <!-- <input v-model="form.content" type="textarea" class="form-control"> -->
      <v-textarea
          v-model="form.card.description"
          background-color="white"
          filled
          auto-grow
          rows="2"
          row-height="30"
        ></v-textarea>
    </div>
    <div class="form-group">
      <label>Stock:</label>
      <input v-model.number="form.card.stock" type="number" class="form-control">
    </div>
    <div class="form-group">
      <label>Price:</label>
      <input v-model.number="form.card.prix" type="number" class="form-control">
    </div>
    <div class="form-group d-flex flex-column">
      <label>Condition:</label>
      <!-- <input v-model="form.condition" type="text" class="form-control"> -->
      <select name="condition" id="condition" v-model="form.card.condition">
          <option value="">--Please choose a condition--</option>
          <option value="5">Mint</option>
          <option value="4">Excellent</option>
          <option value="3">Good</option>
          <option value="2">Played</option>
          <option value="1">Poor</option>
      </select>
    </div>
    <ul v-if="errors.length">
      <li class="text-danger" v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <v-btn @click="submitFormCard()" large color="yellow" elevation="4">Add</v-btn>
    </div>

    <div v-else-if="selected == 'Add New Category'" id="conditionnal-form-category">

    <div class="form-group">
      <label>Name: </label>
      <input v-model="form.category.name" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Image URL:</label>
      <input v-model="form.category.image" type="text" class="form-control">
    </div>
    <v-btn @click="submitFormCategory()" large color="yellow" elevation="4">Add</v-btn>
    </div>

    <div v-else-if="selected == 'Add New Page'" id="conditionnal-form-category">

    <div class="form-group">
      <label>Title: </label>
      <input v-model="form.page.title" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Navbar Title: </label>
      <input v-model="form.page.navbar_title" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Page Color: </label>
      <!-- <input v-model="form.page.page_color" type="text" class="form-control"> -->
      <v-color-picker
        v-model="form.page.page_color"
        dot-size="10"
        canvas-height="90"
        mode="hexa"
        hide-mode-switch
        hide-inputs
      ></v-color-picker>
    </div>
    <div class="form-group">
      <label>Text Color: </label>
      <!-- <input v-model="form.page.text_color" type="text" class="form-control"> -->
      <v-color-picker
        v-model="form.page.text_color"
        dot-size="10"
        canvas-height="90"
        mode="hexa"
        hide-mode-switch
        hide-inputs
      ></v-color-picker>
    </div>
    <div class="form-group">
      <label>Content: </label>
      <!-- <input v-model="form.content" type="textarea" class="form-control"> -->
      <v-textarea
          v-model="form.page.content"
          background-color="white"
          filled
          auto-grow
          rows="3"
          row-height="30"
        ></v-textarea>
    </div>
    
    <div class="form-group">
      <label>Image URL:</label>
      <input v-model="form.page.image" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Link: </label>
      <input v-model="form.page.link" type="text" class="form-control">
    </div>
    <div class="form-group d-flex flex-column">
      <label for="display">Display:</label>

      <select name="display" id="display" v-model="form.page.display">
          <option value="">--Please choose a value--</option>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
      </select>
    </div>
    <v-btn @click="submitFormPage()" large color="yellow" elevation="4">Add</v-btn>
    </div>
   </v-card>
   
 </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios;

export default {

  data(){
    return {
      
      selected: 'Add New Card',

      selectOptions:[
        "Add New Card", "Add New Category", "Add New Page"
      ],
      
      form: {
        card: {
          img: '',
          nom: '',
          category_id: '',
          // ref: '',
          type: '',
          description: '',
          stock: '',
          prix: '',
          // date: this.getNow(),
          condition: '',
        },
        category: {
          image: '',
          name: '',
        },
        page: {
          navbar_title: '',
          page_color: '',
          text_color: '',
          title: '',
          content: '',
          image: '',
          link: '',
          display: '',
        },
      },
      errors: [],
      }
    },
  methods: {
    submitFormCard() {
      // e.preventDefault();
      if(this.formCardIsValid()){
        // POST request using axios
        axios.post("https://api.pokeshop.tk/api/product", {
          image: this.form.card.img,
          name: this.form.card.nom,
          category_id: this.form.card.category_id,
          // ref: this.form.card.ref,
          energy_type: this.form.card.type,
          description: this.form.card.description,
          stock: this.form.card.stock,
          price: this.form.card.prix,
          condition: this.form.card.condition
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
    submitFormCategory() {
    // POST request using axios
    axios.post("https://api.pokeshop.tk/api/category", {
      image: this.form.category.image,
      name: this.form.category.name,
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
      this.resetForm();
      
    },
    submitFormPage() {
        // POST request using axios
        axios.post("https://api.pokeshop.tk/api/page", {
          navbar_title: this.form.page.navbar_title,
          page_color: this.form.page.page_color,
          text_color: this.form.page.text_color,
          title: this.form.page.title,
          content: this.form.page.content,
          image: this.form.page.image,
          link: this.form.page.link,
          display: this.form.page.display
        },
        {
          headers:{
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log("Page sent", res.data)
        })
        .catch(err => {
          console.log(err)
        })
        this.resetForm();
    },
    getNow() {
      const today = new Date();
      const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.date = dateTime;
    },
    resetForm(){
      this.form.card = {
        img: '',
        nom: '',
        category_id: '',
        // ref: '',
        type: '',
        description: '',
        stock: '',
        prix: '',
        condition: '',
      }
      this.form.category = {
        image: '',
        name: ''
      }
      this.form.page = {
        navbar_title: '',
        page_color: '',
        text_color: '',
        title: '',
        content: '',
        image: '',
        link: '',
        display: ''
      }
    },
    formCardIsValid(){
      this.errors = [];
      if(!this.form.card.img){
        this.errors.push('Image required !');
      }
      if(!this.form.card.nom){
        this.errors.push('Name required !');
      }
      if(!this.form.card.category_id){
        this.errors.push('Category Id required !');
      }
      // if(!this.form.card.ref){
      //   this.errors.push('Reference required !');
      // }
      if(!this.form.card.type){
        this.errors.push('Type required !');
      }
      if(!this.form.card.description){
        this.errors.push('Description required !');
      }
      if(!this.form.card.stock){
        this.errors.push('Stock required !');
      }
      if(!this.form.card.prix){
        this.errors.push('Price required !');
      }
      // if(!this.form.date){
      //   this.errors.push('Date required !');
      // }
      if(!this.form.card.condition){
        this.errors.push('Condition required !');
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
    padding: 25px 20px 20px 20px;
    background-color: #95afc0 !important;
    border-radius: 10px !important;
    color: white !important;
  }
  #category_id, #condition, #display, #type{
    background-color: white;
    padding: 7px;
    border-radius: 5px;
  }
  .v-input{
    font-size: 1.5rem !important;
  }
</style>
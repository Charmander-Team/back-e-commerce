<template>
<div class="editPageWrapper">
    <v-icon id="backArrow" color="white" large @click="back()"
      >mdi-arrow-left-bold</v-icon
    >
  <div class="editPageContainer">
 <form class="d-flex flex-column">
   <v-card elevation="5" class="formContainer">
      <h4>Edit Page</h4>
    <hr class="w-100">
    <div class="form-group">
      <label>Title: </label>
      <input v-model="form.title" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Navbar Title: </label>
      <input v-model="form.navbar_title" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Page Color: </label>
      <input v-model="form.page_color" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Text Color: </label>
      <input v-model="form.text_color" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Content: </label>
      <input v-model="form.content" type="textarea" class="form-control">
    </div>
    <div class="form-group">
      <label>Link: </label>
      <input v-model="form.link" type="text" class="form-control">
    </div>
    <div class="form-group d-flex flex-column">
      <label for="display">Display</label>
        <select
            name="display"
            id="display"
            v-model="form.display"
        >
            <option value="">--Please choose a value--</option>
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
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
import router from "../../../../router/router";
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios;

export default {
  data(){
    return {
      form: {
        image: '',
        title: '',
        navbar_title: '',
        page_color: '',
        text_color: '',
        content: '',
        link: '',
        display: ''
      },
      errors: [],
      }
    },
mounted(){
  axios
  .get(`https://api.pokeshop.tk/api/page/`+this.$route.params.id)
  .then(response => (this.form = response.data))
},
  methods: {
    submitForm(e) {
      e.preventDefault();
      if(this.formIsValid()){
      // POST request using axios
      axios.put("https://api.pokeshop.tk/api/page/"+this.$route.params.id, {
        image: this.form.image,
        title: this.form.title,
        navbar_title: this.form.navbar_title,
        page_color: this.form.page_color,
        text_color: this.form.text_color,
        content: this.form.content,
        link: this.form.link,
        display: this.form.display,
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
      this.$router.push({ path: '/allpages'})
      }
    },
    back() {
      router.go(-1);
    },
    resetForm(){
      this.form = {
        image: '',
        title: '',
        navbar_title: '',
        page_color: '',
        text_color: '',
        content: '',
        link: '',
        display: ''
      }
    },
    formIsValid(){
      this.errors = [];
      if(!this.form.title){
        this.errors.push('Title required !');
      }
      if(!this.form.navbar_title){
        this.errors.push('Navbar Title required !');
      }
      if(!this.form.text_color){
        this.errors.push('Text Color required !');
      }
      if(!this.form.content){
        this.errors.push('Content required !');
      }
      if(!this.form.link){
        this.errors.push('Link required !');
      }
      if(!this.form.display){
        this.errors.push('Display required !');
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
  .editPageWrapper{
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: 100%;
  }
  .editPageContainer{
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
  #display{
    background-color: white;
    padding: 7px;
    border-radius: 5px;
  }
  #backArrow{
    height: 85%;
  } 
  @media screen and (max-width: 935px){
    form{
      width: 300px;
    }
  }
</style>
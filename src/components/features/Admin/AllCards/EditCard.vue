<template>
  <div class="editCardWrapper">
    <v-icon id="backArrow" color="white" large @click="backToAllCards()"
      >mdi-arrow-left-bold</v-icon
    >
    <div class="editCardContainer">
      <form class="d-flex flex-column">
        <v-card elevation="5" class="formContainer">
          <h4>Edit Card</h4>
          <hr class="w-100" />
          <div class="form-group">
            <label>Image Url:</label>
            <input v-model="form.image" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Name:</label>
            <input v-model="form.name" type="text" class="form-control" />
          </div>
          <div class="form-group d-flex flex-column">
            <!-- <label>Category Id:</label>
      <input v-model.number="form.category_id" type="number" class="form-control" pattern="[0-5]{1}"> -->

            <label for="category_id">Category</label>

            <select
              name="category_id"
              id="category_id"
              v-model="form.category_id"
            >
              <option value="">--Please choose a category--</option>
              <option value="1">Dresseurs</option>
              <option value="2">Pokémons</option>
              <option value="3">Energies</option>
            </select>
          </div>
          <!-- <div class="form-group">
            <label>Reference:</label>
            <input v-model="form.ref" type="text" class="form-control" />
          </div> -->
          <div class="form-group">
            <label>Energy Type:</label>
            <input
              v-model="form.energy_type"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Content: </label>
            <!-- <input v-model="form.content" type="textarea" class="form-control"> -->
            <v-textarea
                v-model="form.description"
                background-color="white"
                filled
                auto-grow
                rows="2"
                row-height="30"
              ></v-textarea>
          </div>
          <div class="form-group">
            <label>Stock:</label>
            <input
              v-model.number="form.stock"
              type="number"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Price:</label>
            <input
              v-model.number="form.price"
              type="number"
              class="form-control"
            />
          </div>
          <!-- <div class="form-group">
      <label>Date:</label>
      <input v-model.number="form.date" type="number" class="form-control">
    </div> -->
          <div class="form-group d-flex flex-column">
            <label>Condition:</label>
            <!-- <input v-model="form.condition" type="text" class="form-control" /> -->

            <select name="condition" id="condition" v-model="form.condition">
                <option value="">--Please choose a condition--</option>
                <option value="5">Mint</option>
                <option value="4">Excellent</option>
                <option value="3">Good</option>
                <option value="2">Played</option>
                <option value="1">Poor</option>
            </select>
          </div>
          <ul v-if="errors.length">
            <li class="text-danger" v-for="error in errors" :key="error">
              {{ error }}
            </li>
          </ul>
          <v-btn @click="submitForm" large color="yellow" elevation="4"
            >Modify</v-btn
          >
        </v-card>
      </form>
    </div>
  </div>
</template>

<script>
import router from "../../../../router/router";
import Vue from "vue";
import axios from "axios";
Vue.prototype.$axios = axios;
// import { eventBus } from '../../../main';

export default {
  data() {
    return {
      form: {
        image: "",
        name: "",
        category_id: "",
        // ref: "",
        energy_type: "",
        description: "",
        stock: "",
        price: "",
        // date: this.getNow(),
        condition: "",
      },
      errors: [],
    };
  },
  mounted() {
    axios
      .get(`https://api.pokeshop.tk/api/product/` + this.$route.params.id)
      .then((response) => (this.form = response.data));
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      if (this.formIsValid()) {
        // POST request using axios
        axios
          .put(
            "https://api.pokeshop.tk/api/product/" + this.$route.params.id,
            {
              image: this.form.image,
              name: this.form.name,
              category_id: this.form.category_id,
              // ref: this.form.ref,
              energy_type: this.form.energy_type,
              description: this.form.description,
              stock: this.form.stock,
              price: this.form.price,
              condition: this.form.condition,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("Product modified", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 500)
      }
    },
    backToAllCards() {
      router.go(-1);
    },
    getNow() {
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.date = dateTime;
    },
    resetForm() {
      this.form = {
        image: "",
        nom: "",
        category_id: "",
        // ref: "",
        energy_type: "",
        description: "",
        stock: "",
        price: "",
        condition: "",
      };
    },
    formIsValid() {
      this.errors = [];
      if (!this.form.image) {
        this.errors.push("Image required !");
      }
      if (!this.form.name) {
        this.errors.push("Name required !");
      }
      if (!this.form.category_id) {
        this.errors.push("Category Id required !");
      }
      // if (!this.form.ref) {
      //   this.errors.push("Reference required !");
      // }
      if (!this.form.energy_type) {
        this.errors.push("Type required !");
      }
      if (!this.form.description) {
        this.errors.push("Description required !");
      }
      if (!this.form.stock) {
        this.errors.push("Stock required !");
      }
      if (!this.form.price) {
        this.errors.push("Price required !");
      }
      // if(!this.form.date){
      //   this.errors.push('Date required !');
      // }
      if (!this.form.condition) {
        this.errors.push("Condition required !");
      }
      return this.errors.length ? false : true;
    },
  },
};
</script>

<style scoped>
form {
  width: 400px;
}
.editCardWrapper {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
}
.editCardContainer {
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
h4 {
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
}
.formContainer {
  padding: 25px 20px 20px 20px;
  background-color: #2ed573 !important;
  border-radius: 10px !important;
  color: white !important;
}
#category_id {
  background-color: white;
  padding: 7px;
  border-radius: 5px;
}
#condition{
    background-color: white;
    padding: 7px;
    border-radius: 5px;
  }
#backArrow{
  height: 85%;
}
@media screen and (max-width: 935px) {
  form {
    width: 300px;
  }
}
</style>

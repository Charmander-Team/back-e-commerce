<template>
  <div class="editCardWrapper">
    <v-icon id="backArrow" color="white" large @click="backToAllCards()"
      >mdi-arrow-left-bold</v-icon
    >
    <div class="editCardContainer">
      <form class="d-flex flex-column">
        <v-card elevation="5" class="formContainer">
          <h4>Edit Order Status</h4>
          <hr class="w-100" />
          <div class="form-group d-flex flex-column">
            <label for="status">Status</label>
            <select
              name="status"
              id="status"
              v-model="form.status"
            >
              <option value="">--Please choose a status--</option>
              <option value="En-cours">En cours</option>
              <option value="Annulée">Annulée</option>
              <option value="Validée">Validée</option>
              <option value="En-préparation">En préparation</option>
              <option value="Expédiée">Expédiée</option>
              <option value="Livrée">Livrée</option>
            </select>
          </div>
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

export default {
  data() {
    return {
      form: {
        status: "",
      },
    };
  },
  mounted() {
    axios
      .get(`https://api.pokeshop.tk/api/order/` + this.$route.params.id)
      .then((response) => (this.form.status = response.data.status));
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
        // POST request using axios
        axios
          .put(
            "https://api.pokeshop.tk/api/order/" + this.$route.params.id,
            {
              status: this.form.status,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("Status Order modified", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 500)
    },
    backToAllCards() {
      router.go(-1);
    },
    resetForm() {
      this.form = {
        status: "",
      };
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
#status {
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

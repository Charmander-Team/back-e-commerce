<template>
  <div class="editUserWrapper">
    <v-icon id="backArrow" color="white" large @click="backToAllUsers()"
      >mdi-arrow-left-bold</v-icon
    >
    <div class="editUserContainer">
      <form class="d-flex flex-column">
        <v-card elevation="5" class="formContainer">
          <h4>Edit User</h4>
          <hr class="w-100" />
          <div class="form-group">
            <label>Image Url:</label>
            <input v-model="form.image" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Lastname:</label>
            <input v-model="form.lastname" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Firstname:</label>
            <input v-model="form.firstname" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="form.mail" type="email" class="form-control" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input v-model="form.password" type="text" class="form-control" />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="admin">Admin</label>
            <select
              name="admin"
              id="admin"
              v-model="form.admin"
            >
              <option value="">--Please choose a value--</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div class="form-group">
            <label>Token:</label>
            <input v-model="form.token" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Hash:</label>
            <input
              v-model="form.hash"
              type="text"
              class="form-control"
            />
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

export default {
  data() {
    return {
      form: {
        image: "",
        lastname: "",
        firstname: "",
        mail: "",
        password: "",
        admin: "",
        token: "",
        hash: ""
      },
      errors: [],
    };
  },
  mounted() {
    axios
      .get(`https://api.pokeshop.tk/api/user/` + this.$route.params.id)
      .then((response) => (this.form = response.data));
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      if (this.formIsValid()) {
        // POST request using axios
        axios
          .put(
            "https://api.pokeshop.tk/api/user/" + this.$route.params.id,
            {
              image: this.form.image,
              lastname: this.form.lastname,
              firstname: this.form.firstname,
              mail: this.form.mail,
              password: this.form.password,
              admin: this.form.admin,
              token: this.form.token,
              hash: this.form.hash,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("User modified", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 500)
      }
    },
    backToAllUsers() {
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
        lastname: "",
        firstname: "",
        mail: "",
        password: "",
        admin: "",
        token: "",
        hash: ""
      };
    },
    formIsValid() {
      this.errors = [];
      if (!this.form.image) {
        this.errors.push("Image required !");
      }
      if (!this.form.lastname) {
        this.errors.push("Lastname required !");
      }
      if (!this.form.firstname) {
        this.errors.push("Firstname required !");
      }
      if (!this.form.mail) {
        this.errors.push("Mail required !");
      }
    //   if (!this.form.password) {
    //     this.errors.push("Password required !");
    //   }
      if (!this.form.admin) {
        this.errors.push("Admin required !");
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
.editUserWrapper {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
}
.editUserContainer {
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
#admin {
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

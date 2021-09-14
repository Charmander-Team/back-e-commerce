<template>
<div class="connexionWrapper">
    <div class="connexionContainer">
      <v-form
        ref="form"
        class="d-flex flex-column connexionForm"
        v-model="valid"
        lazy-validation
        >
        <v-card elevation="5" class="formContainer">
          <h4>Connexion Form</h4>
          <v-text-field
          v-model="form.email"
          :rules="emailRules"
          label="E-mail"
          required
          dark
          ></v-text-field>

          <v-text-field
          v-model="form.password"
          label="Password"
          required
          dark
          ></v-text-field>

          <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
          >
          Connexion
          </v-btn>
        </v-card>
      </v-form>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import App from '../../../../App.vue'
Vue.prototype.$axios = axios

  export default {
    data: () => ({
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      form: {
        email: '',
        password: ''
      },
      // user: null
    }),

    methods: {
      // setTokenInLocalStorage(){
      //   let url_string = window.location.href
      //   let urlTab = url_string.split("=")
      //   let token = urlTab[1]
      //   console.log(token)
      //   localStorage.setItem("token", token)
      // },
      async validate () {
        if(this.$refs.form.validate()){
          axios.post("https://api.pokeshop.tk/api/user/check", {
          mail: this.form.email,
          mdp: this.form.password
        },
        {
          headers:{
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log("User checked", res.data)
          // this.user = res.data
          // console.log(this.user)
          App.user = res.data
          console.log(App.user)
          localStorage.setItem("token", App.user.token)
          this.$router.push('dashboard')
        })
        .catch(err => {
          console.log(err)
        })
        }
      }
    },
  }
</script>

<style scoped>
.connexionWrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: #95afc0;
}
.connexionContainer{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 80%;
  padding: 2vh 20px;
  margin: 10vh 20px 5vh 0;
  background-color: #ffd32a;
  border-radius: 10px;
}
.formContainer {
  padding: 25px 20px 20px 20px;
  background-color: #227093 !important;
  border-radius: 10px !important;
  color: white !important;
  width: 100%;
}
.connexionForm{
  width: 30%;
  height: 30%;
}
</style>
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
          :rules="pwRules"
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
      pwRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 4) || 'Password must be up than 4 characters',
      ],
      form: {
        email: '',
        password: ''
      },
      // user: null
    }),

    methods: {
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
          App.user = res.data
          console.log("User checked", App.user)
          if(App.user.admin === true){
            console.log("Access authorized")
            localStorage.setItem("token", App.user.token)
            this.$router.push('dashboard')
          }else{
            console.log("Héé non !")
          }
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
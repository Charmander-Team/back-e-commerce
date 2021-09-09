<template>

<div class="sideMenuWrapper">

  <v-card class="sideMenuContainer hidden-sm-and-down">
    <v-list shaped class="sideMenu">

      <!-- Sans routeur (avec un EventBus) -->
      <!-- <v-list-item class="nav-link" link @click="changePage(item.page)" height="45" v-for="(item,index) in items" :key="index" block tile small light>
        {{item.title}}
      </v-list-item> -->

      <!-- Avec vue-router -->
      <router-link :to="item.path" class="nav-link text-overline" link height="45" v-for="(item,index) in items" :key="index">
        <div class="text-menu">
          {{item.title}}
        </div> 
      </router-link>
    </v-list>
  </v-card>


  <v-app-bar-nav-icon class="hidden-md-and-up sideMenuContMobile" x-large @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

  <v-navigation-drawer
      v-model="drawer"
      fixed
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link :to="item.path" class="nav-link" link height="45" v-for="(item,index) in items" :key="index">
            {{item.title}}
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</div>

</template>

<script>

export default {
  data() {
    return {
      drawer: false,
      group: null,
      items: [
        { title: "Dashboard", page:"Admin", path: "/" },
        { title: "Cards", page:"AllCards", path: "/allcards" },
        { title: "Categories", page:"AllCategories", path: "/allcategories" },
        { title: "Pages", page:"AllPages", path: "/allpages" },
        { title: "Sales", page:"Sales", path: "/sales" },
        { title: "Orders", page:"Orders", path: "/orders" },
        { title: "Stock", page:"Stock", path: "/stock" },
        { title: "Users", page:"Users", path: "/users" },
      ],
    }
  },
  watch: {
    group() {
      this.drawer = false
    }
  },
  // Appel de la methode changePage de l'EventBus
  // methods: {
  //   changePage(page){
  //     eventBus.changePage(page);
  //   },
  //   created(){
  //     eventBus.$on('update:page', (page) => {
  //       this.page = page;
  //     })
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.sideMenuWrapper{
  padding: 20px;
  font-size: 1.4rem;
}
.sideMenuContainer{
  position: sticky;
  top: 10vh;
  left: 50px;
  border-radius: 10px;
  width: 256px;
}
.sideMenuContMobile{
  position: sticky;
  top: 10vh;
  left: 25px;
  width: 70px;
}
.sideMenu{
  background-color: #ffd32a !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}
.nav-link{
  margin: 7px;
}
.text-menu{
  color: #95afc0 !important;
  font-size: 1.4rem !important;
  line-height: 3rem;
}

@media screen and (max-width: 935px) {
  .sideMenuWrapper{
    padding: 0;
  }
}
</style>
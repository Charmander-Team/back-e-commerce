<template>

<div class="sideMenuWrapper">

  <v-card class="sideMenuContainer hidden-sm-and-down">
    <v-list shaped class="sideMenu">
      <v-list-item class="nav-link" link @click="changePage(item.page)" height="45" v-for="(item,index) in items" :key="index" block tile small light>
        {{item.title}}
      </v-list-item>
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
          <v-list-item class="nav-link" link @click="changePage(item.page)" height="45" v-for="(item,index) in items" :key="index" block tile small light>
            {{item.title}}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</div>

</template>

<script>

import {eventBus} from '../main';

export default {
  data() {
    return {
      drawer: false,
      group: null,
      page: eventBus.page,
      items: [
        { title: "Dashboard", page:"Admin" },
        { title: "Sales", page:"Sales" },
        { title: "Bid", page:"Bid" },
        { title: "Orders", page:"Orders" },
        { title: "Stock", page:"Stock" },
        { title: "Analytics", page:"Analytics" },
        { title: "Users", page:"Users" },
      ],
    }
  },
  watch: {
    group() {
      this.drawer = false
    }
  },
  methods: {
    changePage(page){
      eventBus.changePage(page);
    },
    created(){
      eventBus.$on('update:page', (page) => {
        this.page = page;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sideMenuWrapper{
  padding: 20px;
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
}

@media screen and (max-width: 935px) {
  .sideMenuWrapper{
    padding: 0;
  }
}
</style>
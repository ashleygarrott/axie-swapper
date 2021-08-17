<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import firebase from "firebase/app"
// import "firebase/database";

export default {
  name: 'App',

  data() {
    return {
      axies: []
    }
  },
  created() {
    // firebase.database().ref('/axies/').once('value').then((snapshot) => {
    //     var entries = snapshot.val()   //list of scholar -> axies

    //     for (const address in entries){
    //         var axies = entries[address]
    //         for (const axie_no in axies){
    //             this.axies.push(axies[axie_no])
    //         }
    //     }

    //     this.$store.commit("setAxies", this.axies)

    //     //API working

    //     });
  }
};
</script>

<style>
 .axie-card {
     border-style: solid;
     border-radius: 10px;
     border-color: lightgrey;
     border-width: 1px;
     margin-bottom: 10px
 }

 .primary-button {
     border-radius: 5px;
     border-style:solid;
     border-color:black;
     border-width:2px;
 }

 a {
    text-decoration: none;
 }
</style>
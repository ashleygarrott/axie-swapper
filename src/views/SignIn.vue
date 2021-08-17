<template>
    <div class="my-5 d-flex justify-content-center">
        <div style="border-style:solid;border-width:2px;border-radius:5px">
            <div class="mx-4 my-2" v-on:click="handleLogin()"> login </div>
        </div>
    </div>
</template>


<script>
import firebase from "firebase/app"
import "firebase/auth";

export default {
    name: "SignIn",
    data() {
        return {

        }
    },
    created(){

    },
    methods: {
        handleLogin(){
            window.console.log("handlelogin")
            var provider = new firebase.auth.GoogleAuthProvider();
             firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API

                this.$store.commit("setUser", result.user)
                this.$store.commit("setAccessToken", credential.accessToken)
                window.console.log(result.user)
                this.$router.push({name: "Home", params: {uid: result.user.uid}})
                // ...
            }).catch((error) => {
                // Handle Errors here.
                window.console.log(error.code);
                window.console.log(error.message);
                window.console.log(error.email);
                window.console.log(error.credential);
            });   
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <div class="mt-5">
        <v-snackbar
            v-model="snackbar"
            :timeout="2000"
            >
            Copied!

            <template v-slot:action="{ attrs }">
                <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
        <div class="fixed-top mt-4 mx-5" v-if="$store.getters.getUser.displayName">
            <div class="d-flex justify-content-end">

                <div class="d-flex justify-content-center primary-button mx-5" v-clipboard:copy="poolURL" v-on:click="snackbar = true">
                    <div class="mx-5">Copy link</div>
                </div>

                <div class="d-flex justify-content-center primary-button mx-5" v-on:click="$router.push({name: 'RequestAxie', params: {id: '1234', image: axie.image}})">
                    <div class="mx-5" v-on:click="$router.push({name: 'ManagePool'})">Manage Pool</div>
                </div>
                <div class="d-flex justify-content-center primary-button mx-5" v-on:click="$router.push({name: 'Matches'})">
                    <div class="mx-5" v-on:click="$router.push({name: 'ManagePool'})">Matches</div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-end fixed-top mt-4" v-if="!$store.getters.getUser.displayName">
            <div class="d-flex justify-content-end mx-5">
                <div class="d-flex justify-content-center primary-button" v-on:click="$router.push({name: 'RequestAxie', params: {id: '1234', image: axie.image}})">
                    <div class="mx-5" v-on:click="handleLogin()">Manager Sign In</div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <div class="d-flex justify-content-center primary-button mx-5" v-on:click="$router.push({name: 'RequestAxie', params: {id: '1234', image: axie.image}})">
                    <div class="mx-5" v-on:click="handleLogin()">Scholar Sign In</div>
                </div>
            </div>
        </div>



        <br><br>
        <!-- change this to grid system -->
        <div class="row">
            
                <div class="col-md-2 col-xs-6" v-for="(axie, index) in this.axies" :key="index">
                    
                        <div class="axie-card mx-2 "> 
                            <div class="d-flex justify-content-center mt-2">
                            <div class="mx-4 text-dark" style="font-size:12px">{{axie.name}}</div>
                            </div>
                            <a v-bind:href="'https://marketplace.axieinfinity.com/axie/' + axie.id">
                            <div class="d-flex justify-content-center">
                            <img v-bind:src="axie.image" style="width:200px">
                            </div>
                            </a>
                            <div class="d-flex justify-content-center mb-2">
                                <div class="d-flex justify-content-center primary-button" v-on:click="$router.push({name: 'RequestAxie', params: {id: axie.id, image: axie.image}})">
                                    <div class="mx-5">request axie</div>
                                </div>
                            </div>
                        </div>
                </div>
            
        </div>
    </div>
</template>
<script>

import res from "../constants/index.js";
// import PopUp from "../components/PopUp.vue"
import firebase from "firebase/app"
import "firebase/database";

export default{
    name: "Home",
    components: {
        // PopUp
    },
    data() {
        return {
            poolUR: "",
            snackbar: false,
            axies: [],
            res: res,
            test: {
                "owner_address": "0xc5f700ca10dd77b51669513cdca53a21cbac3bcd",
                "available_axies": {
                    "total": 5,
                    "results": [
                        {
                            "id": "4167969",
                            "name": "Axie #4167969",
                            "stage": 1,
                            "class": null,
                            "breedCount": 0,
                            "image": "https://storage.googleapis.com/axie-cdn/avatars/egg/reptile-reptile-egg-full-transparent.png",
                            "title": null,
                            "battleInfo": {
                                "banned": false,
                                "__typename": "AxieBattleInfo"
                            },
                            "auction": null,
                            "parts": [],
                            "__typename": "Axie"
                        },
                        {
                            "id": "4167952",
                            "name": "Axie #4167952",
                            "stage": 1,
                            "class": null,
                            "breedCount": 0,
                            "image": "https://storage.googleapis.com/axie-cdn/avatars/egg/reptile-reptile-egg-full-transparent.png",
                            "title": null,
                            "battleInfo": {
                                "banned": false,
                                "__typename": "AxieBattleInfo"
                            },
                            "auction": null,
                            "parts": [],
                            "__typename": "Axie"
                        },
                        {
                            "id": "4167925",
                            "name": "Axie #4167925",
                            "stage": 1,
                            "class": null,
                            "breedCount": 0,
                            "image": "https://storage.googleapis.com/axie-cdn/avatars/egg/reptile-reptile-egg-full-transparent.png",
                            "title": null,
                            "battleInfo": {
                                "banned": false,
                                "__typename": "AxieBattleInfo"
                            },
                            "auction": null,
                            "parts": [],
                            "__typename": "Axie"
                        },
                        {
                            "id": "4167913",
                            "name": "Axie #4167913",
                            "stage": 1,
                            "class": null,
                            "breedCount": 0,
                            "image": "https://storage.googleapis.com/axie-cdn/avatars/egg/reptile-reptile-egg-full-transparent.png",
                            "title": null,
                            "battleInfo": {
                                "banned": false,
                                "__typename": "AxieBattleInfo"
                            },
                            "auction": null,
                            "parts": [],
                            "__typename": "Axie"
                        },
                        {
                            "id": "3892421",
                            "name": "Axie #3892421",
                            "stage": 1,
                            "class": null,
                            "breedCount": 0,
                            "image": "https://storage.googleapis.com/axie-cdn/avatars/egg/reptile-reptile-egg-full-transparent.png",
                            "title": null,
                            "battleInfo": {
                                "banned": false,
                                "__typename": "AxieBattleInfo"
                            },
                            "auction": null,
                            "parts": [],
                            "__typename": "Axie"
                        }
                    ]
                }       
            }
        }
    },
    created(){
        // this.axios.get("https://jared.axieapi.xyz/_axiesPlease/0xc5f700ca10dd77b51669513cdca53a21cbac3bcd")
        // .then((response) => {
        //     window.console.log(response.data)
        // })
        // .catch((error) => {
        //     window.console.log(error)
        // })

        if (this.$route.params.uid == null){
            this.$router.push({name: "SignIn"})
        }

        this.$store.commit("setUid", this.$route.params.uid)
        this.poolURL = "https://axie-swapper.capricove.com/" + this.$store.getters.getUid
        firebase.database().ref(this.$route.params.uid + '/axies/').once('value').then((snapshot) => {
        var entries = snapshot.val()   //list of scholar -> axies

        for (const address in entries){
            var axies = entries[address]
            for (const axie_no in axies){
                this.axies.push(axies[axie_no])
            }
        }

        //API working

        });

        window.console.log(this.axies)

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

<style>


</style>
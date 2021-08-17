
<template>
    <!-- page to request axies. displays axies belonging to requester account. -->
    <div>
        <v-snackbar
            v-model="snackbar"
            :timeout="2000"
            >
            Request sent

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
        <v-dialog
            v-model="dialog"
            max-width="700"
            >
            <v-card class="p-2">
               <div class="d-flex justify-content-center">
                    <div class="mb-2" style="font-size:18px">Request this axie swap?</div>
               </div>

                <div class="d-flex justify-content-between">
                    <img v-bind:src="selectedAxie.image" style="width:200px" v-if="selectedAxie != null">
                    <img class="my-auto" src="/img/swap.jpg" style="width:50px;height:50px">
                    <img v-bind:src="$route.params.image" style="width:200px">
                </div>


                
                <div class="d-flex justify-content-center">
                    <div class="d-flex justify-content-center primary-button mx-4" >
                        <div class="my-3 mx-4" style="font-size:18px" v-on:click="handleYes()"><b>Request swap</b></div>
                    </div>
                </div>
                 
                
            </v-card>
        </v-dialog>


        <div class="d-flex justify-content-center">
            <div class="my-5">Scholar ID:</div>
        </div>
        <div class="d-flex justify-content-center">
            <div style="width:70%">
                <v-select
                :items="scholars"
                label="Solo field"
                solo
                v-model="scholarId"
                ></v-select>
            </div>
        </div>
        <br><br>

        <div class="d-flex justify-content-center">
            <div class="axie-card mx-2" style="width:200px"> 
                <div class="d-flex justify-content-center">
                    <div class="mx-4 text-dark">Axie #{{id}}</div>
                </div>
                <a v-bind:href="'https://marketplace.axieinfinity.com/axie/' + id">
                    <div class="d-flex justify-content-center">
                        <img v-bind:src="$route.params.image" style="width:200px">
                    </div>
                </a>
            </div>
        </div>

        <br><br>
        <div class="d-flex justify-content-center">
            <div class="my-4"><b>Select which axie you want to trade it with</b></div>
        </div>

        <div class="d-flex justify-content-center">
            <div v-for="(axie, index) in scholarAxies" :key="index">         
                <div class="axie-card mx-2"> 
                    <div class="mx-4 text-dark">Axie #{{axie.id}}</div>
                    <a v-bind:href="'https://marketplace.axieinfinity.com/axie/' + axie.id">
                        <div class="d-flex justify-content-center">
                            <img v-bind:src="axie.image" style="width:100px">
                        </div>
                    </a>
                    <div class="d-flex justify-content-center my-3">
                        <div class="d-flex justify-content-center primary-button" v-on:click="handleSelect(axie)">
                            <div class="mx-5">select </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// import database from '../firebase/index.js'
import firebase from "firebase/app"
import "firebase/database";

export default{
    name: "RequestAxie",
    data(){
        return {
            snackbar: false,
            scholars: [],
            dialog: false,
            id: null,
            selectedAxie: null,
            scholarId: null,
            axieTree: {},
            accounts: {}
        }
    },
    computed: {
        scholarAxies: function () {
            var ret = []
            var roninAddress = this.accounts[this.scholarId]
            var scholarAxies = this.axieTree[roninAddress] 
            for (const axieNo in scholarAxies){
                ret.push(scholarAxies[axieNo])
            }
            return ret
        }
    },
    created(){
        this.id = this.$route.params.id;
        // fetch scholar names

        firebase.database().ref(this.$store.getters.getUid + '/ronin_accounts/').once('value').then((snapshot) => {
            this.accounts = snapshot.val()   //list of scholar -> axies
            this.scholars = Object.keys(this.accounts)
            this.scholarId = this.scholars[0]
            window.console.log(this.scholars)
        });
        // fetch axies/owners
        firebase.database().ref(this.$store.getters.getUid + '/axies/').once('value').then((snapshot) => {
            this.axieTree = snapshot.val()   //list of scholar -> axies
            
        });


    },
    mounted(){
        window.console.log(this.scholarAxies)
    },
    methods: {
        handleSelect(axie) {
            this.selectedAxie = axie
            this.dialog = true
        },
        handleYes(){
            firebase.database().ref(this.$store.getters.getUid + "/swap-requests/" + this.scholarId).set({
                request: this.$route.params.id,
                offer: this.selectedAxie.id
            })
            window.console.log("handleYes")
            this.dialog = false
            this.snackbar = true
        },
        handleNo(){
            this.dialog = false
        }
    }
}
</script>

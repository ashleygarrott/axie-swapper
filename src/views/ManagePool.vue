<template>
    <div>
        <v-snackbar
            v-model="snackbar"
            :timeout="2000"
            >
            Added ronin account

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
        <div class="d-flex justify-content-center">
            <div>
                <div class="form-group">
                    <div class="d-flex justify-content-center">
                        <label for="exampleInputEmail1">Ronin address</label>
                    </div>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0x....../ronin:...." v-model="address">
                    <div class="d-flex justify-content-center">
                        <label for="exampleInputEmail1">Account name</label>
                    </div>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="account alias" v-model="accountName">
                    
                </div>
                <div class="d-flex justify-content-center my-3">
                    <div class="d-flex justify-content-center primary-button" v-on:click="handleAddToPool()">
                        <div class="mx-5">add to pool</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/database";

export default{
    name: "ManagePool",
    data() {
        return {
            address: "",
            accountName: "",
            snackbar: false
        }
    },
    created() {

    },
    methods: {
        handleAddToPool(){
            //save axies to database
            var addr
            if (this.address.substring(0,6) == "ronin:"){
                addr = "0x" + this.address.substring(6, this.address.length)    
            }

            this.axios.post("https://axie-proxy.secret-shop.buzz/_axiesPlease/" + addr)
            .then((response) => {
                window.console.log(response.data.available_axies.results)

                firebase.database().ref(this.$store.getters.getUser.uid + "/axies/" + addr).set(response.data.available_axies.results)
                firebase.database().ref(this.$store.getters.getUser.uid + "/ronin_accounts/" + this.accountName).set(addr)
                this.snackbar = true



            })


            

        }
    }
}
</script>

<style scoped>

</style>

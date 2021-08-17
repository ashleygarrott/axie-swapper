<template>
    <div>
        <div class="d-flex justify-content-center my-3">
            <div>Valid trades</div>
        </div>

        <div v-for="(trade, index) in validTrades" :key="index">
         <div class="d-flex justify-content-between trade-card mx-5 my-5 p-3">
             <div>
                 <div class="d-flex justify-content-center mb-3">
                    <div>{{trade.scholarId1}}</div>
                 </div>
                 <div class="d-flex justify-content-center">
                    <div>Axie #{{trade.axie1}}</div>
                 </div>
                 <div class="d-flex justify-content-center">
                    <img v-bind:src="getImage(trade.axie1, trade.scholarId1)" style="width:200px">
                 </div>
             </div>
             <div>
                 <div class="d-flex justify-content-center mb-3">
                    <div>{{trade.scholarId2}}</div>
                 </div>
                 <div class="d-flex justify-content-center">
                    <div>Axie #{{trade.axie2}}</div>
                 </div>
                 <div class="d-flex justify-content-center">
                    <img v-bind:src="getImage(trade.axie2, trade.scholarId2)" style="width:200px">   
                 </div> 
             </div>
            
            
         </div>
        </div>

    </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/database";

export default {
    name: "Matches",
    data() {
        return {
            swapRequests: {},
            axies: {},
            accounts: {}

        }
    },
    computed: {
        validTrades: function() {
            var trades = []
            for (const scholarId1 in this.swapRequests){
                var swapRequest1 = this.swapRequests[scholarId1]
                var offer = swapRequest1.offer
                var request = swapRequest1.request

                //search for valid trades

                for (const scholarId2 in this.swapRequests){
                    var swapRequest2 = this.swapRequests[scholarId2]
                    if (swapRequest2.offer == request && swapRequest2.request == offer){
                        trades.push({
                            scholarId1: scholarId1,
                            scholarId2: scholarId2,
                            axie1: swapRequest1.offer,
                            axie2: swapRequest2.offer, 
                        })
                    }

                }
            }

            //filter out doubles from ret
            var contras = []
            var ret = []

            for (var i=0;i<trades.length;i++){
                var trade = trades[i]

                //if not in contras, push to ret
                for (var j=0;j<contras.length;j++){
                    var contra = contras[j]
                    if (trade.scholarId1 == contra.scholarId1 || trade.scholarId2 == contra.scholarId2 || trade.axie1 == contra.axie1 || trade.axie2 == contra.axie2){
                        break;
                    } 

                    ret.push(trade)
                    contras.push({
                        scholarId1: trade.scholarId2,
                        scholarId2: trade.scholarId1,
                        axie1: trade.axie2,
                        axie2: trade.axie1
                    })
                }
                


                
            }

            return trades
        }
    },
    created(){
        firebase.database().ref(this.$store.getters.getUser.uid + '/swap-requests/').once('value').then((snapshot) => {
        this.swapRequests = snapshot.val()   
        });

        firebase.database().ref(this.$store.getters.getUser.uid + '/ronin_accounts/').once('value').then((snapshot) => {
        this.accounts = snapshot.val()   

        });

        firebase.database().ref(this.$store.getters.getUser.uid + '/axies/').once('value').then((snapshot) => {
        this.axies = snapshot.val() 
        });
        

        


    },
    methods: {
        getImage(axieId, scholarId){
            var roninAddress = this.accounts[scholarId]
            window.console.log(roninAddress)
            for (const axieNo in this.axies[roninAddress]){
                var axie = this.axies[roninAddress][axieNo]
                if (axie.id == axieId){
                    return axie.image
                }
            }
            return ""
        }
    }

}
</script>

<style scoped>
    .trade-card {
        border-style:solid;
        border-color:black;
        border-width:2px;
    }
</style>

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        axies: [],
        user: {},
        accessToken: "",
        uid: ""

    },
    getters: {

        getAxies: state => {
            return state.axies
        },
        getUser: state => {
            return state.user
        },
        getAccessToken: state => {
            return state.accessToken
        },
        getUid: state => {
            return state.uid
        }
    },
    mutations: {
        setAxies(state, payload){
            state.axies = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        setAccessToken(state, payload){
            state.accessToken = payload
        },
        setUid(state, payload){
            state.uid = payload
        }

        
    
    },
    actions: {
        // addTask(context, payload){
        //     context.commit('addTask', payload)
        // }
    },
    modules: {}
});
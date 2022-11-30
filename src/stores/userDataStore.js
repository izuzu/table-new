import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userDataStore = defineStore('user', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      userData: []   
    }
  },
  getters: {
    // automatically infers the return type as a number
    getUser(state) {
      return state
    },    
  },  
  actions: {
    addUser(item){
      this.userData = item;
    }
  }
})

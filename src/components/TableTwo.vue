
<style scoped>

.search-text-container{
  display: flex;
  margin-bottom: 5px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>

<template>
  <div>
    <span class="search-text-container" v-if="searchData.kw">
      Search results with &nbsp;<span v-if="searchData">{{ searchData.kw }}</span>  &nbsp; in  &nbsp;<span>{{ searchData.filter }}</span>
    </span>
    <table v-if="tableSearchData">
      <tr>
        <th v-for="(k, index) in Object.keys(tableSearchData[0])" :key="index">{{k}}</th>
      </tr>
      <tr  v-for="(data, id) in tableSearchData" :key="id">
        <td>{{data.id}}</td>
          <td>{{data.name}}</td>
          <td>{{data.username}}</td>
          <td>{{data.email}}</td>
          <td>{{data.address.street}}, {{data.address.suite}}, {{data.address.city}},  {{data.address.zipcode}} </td>
          <td>{{data.phone}}</td>
          <td>{{data.website}}</td>
          <td>{{data.company.name}}</td>
      </tr>
    </table>    
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
// import { bus } from '../main';
import { mapActions } from 'pinia'
import { userDataStore } from '@/stores/userDataStore'


export default defineComponent({
    name: 'TableTWo',
    props: {
      tableData: {
        type: Array,
        required: false,
      },
    }, 
    data() {
        return {
            testMsg: "t1",
            searchData: {},
            tableSearchData: null,
            tableKey: 0
        }
    },
    created (){
      this.tableSearchData = this.tableData
      this.emitter.on("search", (data) => {
        this.searchData = data;
        this.addUser(this.filterIt(this.tableData, this.searchData))
        this.renderTable()
      });      
    },
    methods:{
      ...mapActions(userDataStore, ['addUser']),
      renderTable(){
        const store = userDataStore()
        this.tableSearchData = store.userData;
      },
      filterIt(arr, searchData) {
        if(searchData.filter == 'company'){          
          return arr.filter(o => o.company.name.includes(searchData.kw));
        }else if(searchData.filter == 'address'){
          let newarr = JSON.parse(JSON.stringify(arr));
          for(let data of newarr){
            data.address = `${data.address.street} , ${data.address.suite}, ${data.address.city},  ${data.address.zipcode}`            
          }
          return newarr.filter(o => o.address.includes(searchData.kw));
        }
        else{
          return arr.filter(o => o[searchData.filter].includes(searchData.kw));
        }
      }      
    }   
})
</script>


<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.button-container {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
}

.button-container select{
  height: 22px;
}

.button-container button{
  height: 22px;
}
</style>

<template>
  <div>
    <h1>User Table</h1>
    <div v-if="tableData.length">
      <table>
        <tr>
          <th v-for="(k, index) in Object.keys(tableData[0])" :key="index">
            {{ k }}
          </th>
        </tr>
        <tr v-for="(data, id) in tableData" :key="id">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.username }}</td>
          <td>{{ data.email }}</td>
          <td>
            {{ data.address.street }}, {{ data.address.suite }},
            {{ data.address.city }}, {{ data.address.zipcode }}
          </td>
          <td>{{ data.phone }}</td>
          <td>{{ data.website }}</td>
          <td>{{ data.company.name }}</td>
        </tr>
      </table>
      <div class="button-container" style="margin: 10px">
        <label for="fname"> Search: </label>
        <input
          type="text"
          id="search"
          v-model="searchKw"
          @input="searchKeyword"
        />
        <select v-model="selectedFilter">
          <option v-for="(k, index) in Object.keys(tableData[0])" :key="index">
            {{ k }}
          </option>
        </select>
        <div class="btn-container">
          <button style="margin: 5px" @click="paginate('p')">Prev</button>
          <button style="margin: 5px" @click="paginate('n')">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { ref, defineComponent } from "vue";
// import { bus } from '../main'

export default defineComponent({
  name: "TableOne",
  props: {
    tableData: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      data: [],
      searchKw: null,
    };
  },
  created() {
    this.selectedFilter = "name";
  },
  methods: {
    paginate(e) {
      this.$emit("paginate", e);
    },
    searchKeyword() {
      this.emitter.emit("search", {
        filter: this.selectedFilter,
        kw: this.searchKw,
      });
    },
  },
});
</script>

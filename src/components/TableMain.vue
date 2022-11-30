
<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

<template>
  <div>
    <TableOne :tableData="td1" @paginate="changePage" />
    <TableTwo :tableData="tableData" />
  </div>
</template>

<script>
import axios from 'axios'
import { ref, defineComponent } from 'vue'
import TableOne from './TableOne.vue'
import TableTwo from './TableTwo.vue'

export default defineComponent({
  name: 'TableMain',
  components: {
    TableOne,
    TableTwo,
  },
  data() {
    return {
      tableData: null,
      td1: [],
      pageNumber: 0
    }
  },
  created() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        this.tableData = response.data
        this.td1 = this.paginate(this.tableData, 2, 1)
      })
      .catch((e) => {
        console.warn(e)
      })
  },
  methods: {
    changePage(e) {
      if(e == 'n' && this.pageNumber * 2 <= this.tableData.length) this.pageNumber++
      else if(e == 'p'  && this.pageNumber > 0) this.pageNumber--
      else console.warn("pagination error")

      this.td1 = this.paginate(this.tableData, 2, this.pageNumber).length != 0 ? this.paginate(this.tableData, 2, this.pageNumber) : this.td1
    },
    paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }    
  },
})
</script>

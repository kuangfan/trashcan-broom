<template>
  <div id="app">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="message" label="错误信息" width="400"></el-table-column>
      <el-table-column prop="source" label="来源" width="400"></el-table-column>
      <el-table-column prop="address" label="详情">
        <template slot-scope="scope">
          <el-button @click="getDetail(scope.row)" type="danger">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      tableData: [
      ]
    };
  },

  created () {
    this.getList()
  },

  methods: {
    async getList () {
      const { data } = await window.$.get('http://localhost:5555/sm/list')
      this.tableData = [...data]
    },
    async getDetail (detail) {
      const result = await window.$.get('http://localhost:5555/sm', detail)
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 50px;
}
</style>

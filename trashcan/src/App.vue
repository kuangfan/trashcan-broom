<template>
  <div id="app">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="错误信息" width="180"></el-table-column>
      <el-table-column prop="name" label="来源" width="180"></el-table-column>
      <el-table-column prop="address" label="详情"></el-table-column>
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

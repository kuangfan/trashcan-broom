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
    <el-dialog
      title="错误详情"
      :visible.sync="dialogVisible"
      width="60%"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <div id="code" v-if="!isNotDetail"></div>
      <div v-else>暂无详情</div>
    </el-dialog>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  name: "app",

  data() {
    return {
      tableData: [],
      dialogVisible: false,
      detail: {},
      isNotDetail: false
    };
  },

  created() {
    this.getList();
  },

  methods: {
    async getList() {
      const { data } = await window.$.get("http://localhost:5555/sm/list");
      this.tableData = [...data];
    },
    async getDetail(detail) {
      const { data } = await window.$.post("http://localhost:5555/sm/detail", detail);
      this.dialogVisible = true;
      this.detail = data;
      if (this.detail !== '') {
        this.isNotDetail = false
        this.$nextTick(() => {
          const editor = monaco.editor.create(document.getElementById("code"), {
            value: this.detail.content,
            language: "javascript"
          })
          editor.deltaDecorations(
            [],
            [
              {
                range: new monaco.Range(this.detail.line, 1, this.detail.line, this.detail.column),
                options: {
                  isWholeLine: true,
                  className: "myContentClass",
                  glyphMarginClassName: "myGlyphMarginClass"
                }
              }
            ]
          )
        })
      } else {
        this.isNotDetail = true
      }
    },
    handleClose(done) {
      this.detail = {};
      done();
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

#code {
  width: 100%;
  height: 500px;
  text-align: left;
}

.myGlyphMarginClass {
	background: red;
}
.myContentClass {
	background: lightblue;
}
</style>

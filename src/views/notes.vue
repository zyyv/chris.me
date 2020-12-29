<template>
  <div class="notes">
    <vueScroll class="radius4" ref="vs">
      <div class="body">
        <div class="breads pr flex flex-items-center pl20">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>所有笔记</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="pa newNoteBtn">
            <el-button icon="el-icon-edit" type="primary" plain size="mini">新建笔记</el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          height="calc(100% - 50px)"
          class="noteTable"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'children'}"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="address" label="更新时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </vueScroll>
  </div>
</template>

<script>
export default {
  name: 'notes',
  data () {
    return {
      breads: [],
      calendar: new Date(),
      tableData:
        [
          {
            id: 1,
            name: 'HTML',

            address: '2020.08.30'
          }, {
            id: 2,
            name: 'CSS',

            address: '2020.08.30'
          }, {
            id: 3,
            name: 'Vue',

            address: '2020.08.30',
            children: [{
              id: 31,
              name: 'Vue',

              address: '2020.08.30'
            }, {
              id: 32,
              name: 'Vue',

              address: '2020.08.30'
            }]
          }, {
            id: 4,
            name: 'React',

            address: '2020.08.30'
          }, {
            id: 5,
            name: 'HTML',

            address: '2020.08.30'
          }, {
            id: 6,
            name: 'CSS',

            address: '2020.08.30'
          }, {
            id: 7,
            name: 'Vue',

            address: '2020.08.30',
            children: [{
              id: 71,
              name: 'Vue',

              address: '2020.08.30'
            }, {
              id: 72,
              name: 'Vue',

              address: '2020.08.30'
            }]
          }, {
            id: 8,
            name: 'React',

            address: '2020.08.30'
          }, {
            id: 9,
            name: 'HTML',

            address: '2020.08.30'
          }, {
            id: 10,
            name: 'CSS',

            address: '2020.08.30'
          }, {
            id: 11,
            name: 'Vue',

            address: '2020.08.30',
            children: [{
              id: 111,
              name: 'Vue',

              address: '2020.08.30'
            }, {
              id: 112,
              name: 'Vue',

              address: '2020.08.30'
            }]
          }]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.notes {
  height: 100%;
  .body {
    padding: 55px;
  }
}
.breads {
  background: #fff;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted #eee;
  .newNoteBtn {
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
.noteTable {
  width: 100%;
}
</style>
